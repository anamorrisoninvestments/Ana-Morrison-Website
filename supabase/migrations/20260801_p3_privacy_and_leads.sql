-- ============================================================================
-- Migration: 20260801_p3_privacy_and_leads
-- Purpose:   P3 · Base de captura de leads, consentimientos y eventos.
-- Author:    Claude Code para Ana Morrison
-- Rollback:  supabase/migrations/20260801_p3_privacy_and_leads.down.sql
--
-- SAFETY
--   - Solo hace CREATE. No modifica ni elimina tablas existentes.
--   - Idempotente (IF NOT EXISTS). Segura de correr múltiples veces.
--   - Función y trigger con nombres exclusivos (prefijo p3_leads_) para
--     evitar cualquier colisión con objetos existentes o futuros.
--   - RLS habilitado en las 4 tablas. Cero policies para anon/authenticated.
--
-- APLICACIÓN
--   Ver supabase/README.md para el procedimiento paso a paso.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1) TABLA: leads
--    Fuente de verdad para todo lead capturado desde el sitio.
--    Fuente de datos personales: name, email, whatsapp, payload, consent_ip.
-- ----------------------------------------------------------------------------
create table if not exists public.leads (
  id                        uuid primary key default gen_random_uuid(),
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now(),

  -- Origen y atribución
  source                    text not null,
  interest                  text,
  landing_url               text,
  referrer                  text,
  utm_source                text,
  utm_medium                text,
  utm_campaign              text,

  -- Contacto (PII)
  name                      text not null,
  email                     text not null,
  whatsapp                  text,
  company                   text,

  -- Datos segmentados por tipo de formulario
  payload                   jsonb not null default '{}'::jsonb,

  -- Consentimientos snapshot al submit
  consent_communications    boolean not null default false,
  consent_marketing         boolean not null default false,
  consent_version           text,
  consent_at                timestamptz,
  consent_ip                inet,

  -- Estado comercial
  status                    text not null default 'new',
  notes                     text,

  -- Integración HubSpot (opcional, activada en PR posterior)
  hubspot_contact_id        text,
  hubspot_sync_status       text not null default 'pending',
  hubspot_last_sync_at      timestamptz,
  hubspot_last_error        text,
  hubspot_sync_attempts     int  not null default 0,

  -- Estado del email transaccional
  email_confirmation_status text not null default 'pending',
  email_confirmation_error  text,

  -- Auditoría
  soft_deleted_at           timestamptz,

  -- Integridad: valores válidos garantizados a nivel DB
  constraint leads_source_ck check (
    source in (
      'contact_form',
      'lead_magnet_str',
      'lead_magnet_tax_deed',
      'calculator_str',
      'checklist_tax_deed',
      'sql_editor_test'
    )
  ),
  constraint leads_status_ck check (
    status in (
      'new', 'contacted', 'in_conversation',
      'proposal', 'negotiation', 'client', 'discarded'
    )
  ),
  constraint leads_hubspot_sync_status_ck check (
    hubspot_sync_status in (
      'pending', 'synced', 'failed', 'dead_letter', 'disabled'
    )
  ),
  constraint leads_email_confirmation_status_ck check (
    email_confirmation_status in (
      'pending', 'sent', 'failed', 'skipped'
    )
  ),
  constraint leads_email_format_ck check (
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  ),
  constraint leads_email_length_ck check (char_length(email) <= 254),
  constraint leads_name_length_ck  check (char_length(name)  between 1 and 120),
  constraint leads_whatsapp_length_ck check (whatsapp is null or char_length(whatsapp) <= 30),
  constraint leads_company_length_ck  check (company  is null or char_length(company)  <= 200),
  constraint leads_notes_length_ck    check (notes    is null or char_length(notes)    <= 5000),
  constraint leads_hubspot_attempts_ck check (hubspot_sync_attempts >= 0)
);

comment on table public.leads is
  'P3: leads capturados desde anamorrison.com. Fuente de verdad. HubSpot es espejo opcional.';

create index if not exists leads_source_idx     on public.leads (source);
create index if not exists leads_email_idx      on public.leads (email);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);
create index if not exists leads_hubspot_pending_idx
  on public.leads (hubspot_sync_status, hubspot_last_sync_at)
  where hubspot_sync_status in ('pending', 'failed');

-- ----------------------------------------------------------------------------
-- Función y trigger exclusivos de esta migración.
-- Nombre prefijado con p3_leads_ para evitar colisiones.
-- ----------------------------------------------------------------------------
create or replace function public.p3_leads_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function public.p3_leads_set_updated_at() is
  'P3 migration: mantiene leads.updated_at sincronizado. Uso exclusivo del trigger p3_leads_updated_at_trigger. No usar en otras tablas.';

drop trigger if exists p3_leads_updated_at_trigger on public.leads;
create trigger p3_leads_updated_at_trigger
  before update on public.leads
  for each row
  execute function public.p3_leads_set_updated_at();

-- ----------------------------------------------------------------------------
-- 2) TABLA: lead_events
--    Historial inmutable de eventos por lead.
-- ----------------------------------------------------------------------------
create table if not exists public.lead_events (
  id          bigserial primary key,
  lead_id     uuid not null references public.leads(id) on delete cascade,
  created_at  timestamptz not null default now(),
  type        text not null,
  payload     jsonb not null default '{}'::jsonb,

  constraint lead_events_type_ck check (
    type in (
      'form_submitted',
      'email_sent',
      'email_failed',
      'email_skipped',
      'email_opened',
      'email_clicked',
      'hubspot_synced',
      'hubspot_failed',
      'stage_changed',
      'note_added',
      'privacy_request'
    )
  )
);

comment on table public.lead_events is
  'P3: historial inmutable de eventos por lead (form_submitted, email_sent, hubspot_synced, etc.).';

create index if not exists lead_events_lead_idx on public.lead_events (lead_id, created_at desc);
create index if not exists lead_events_type_idx on public.lead_events (type, created_at desc);

-- ----------------------------------------------------------------------------
-- 3) TABLA: consents
--    Registro APPEND-ONLY de eventos de consentimiento como evidencia.
--    Minimización de datos:
--      - ip_hash: SHA-256(ip + CONSENT_IP_HASH_SALT) truncado a 12 chars.
--      - user_agent_summary: solo browser family + OS family.
-- ----------------------------------------------------------------------------
create table if not exists public.consents (
  id                    bigserial primary key,
  created_at            timestamptz not null default now(),

  session_id            text,
  user_email            text,
  lead_id               uuid references public.leads(id) on delete set null,

  action                text not null,
  consent_type          text not null,
  consent_version       text not null,
  categories            jsonb,

  page_url              text,
  source                text,
  ip_hash               text,
  user_agent_summary    text,

  constraint consents_action_ck check (
    action in ('accepted', 'rejected', 'updated', 'withdrawn')
  ),
  constraint consents_type_ck check (
    consent_type in ('cookies', 'communications', 'terms', 'marketing')
  ),
  constraint consents_source_ck check (
    source is null or source in (
      'banner_initial',
      'preferences_modal',
      'form_submit',
      'withdrawal_link',
      'admin_override'
    )
  ),
  constraint consents_ip_hash_len_ck check (
    ip_hash is null or char_length(ip_hash) between 8 and 64
  ),
  constraint consents_ua_summary_len_ck check (
    user_agent_summary is null or char_length(user_agent_summary) <= 60
  ),
  constraint consents_categories_shape_ck check (
    categories is null
    or (
      jsonb_typeof(categories) = 'object'
      and jsonb_typeof(categories -> 'necessary') = 'boolean'
      and (categories -> 'analytics' is null or jsonb_typeof(categories -> 'analytics') = 'boolean')
      and (categories -> 'marketing' is null or jsonb_typeof(categories -> 'marketing') = 'boolean')
    )
  ),
  constraint consents_version_len_ck check (char_length(consent_version) between 1 and 20)
);

comment on table public.consents is
  'P3: registro APPEND-ONLY de consentimientos. Cada acción (accept/reject/update/withdraw) genera nueva fila. Datos minimizados: sin IP en claro ni user agent completo.';
comment on column public.consents.action is
  'Acción del usuario: accepted, rejected, updated, withdrawn';
comment on column public.consents.ip_hash is
  'SHA-256(ip + CONSENT_IP_HASH_SALT), truncado a 12 chars. Permite detectar patrones abusivos sin conservar IP en claro. Salt en env var.';
comment on column public.consents.user_agent_summary is
  'Resumen de UA: browser family + OS family (ej. "Chrome/macOS"). Descarta versión y fingerprint.';

create index if not exists consents_session_idx on public.consents (session_id, created_at desc);
create index if not exists consents_email_idx   on public.consents (user_email, created_at desc);
create index if not exists consents_type_idx    on public.consents (consent_type, created_at desc);
create index if not exists consents_lead_idx    on public.consents (lead_id) where lead_id is not null;

-- ----------------------------------------------------------------------------
-- 4) TABLA: lead_magnets_downloads
--    Registro de descargas. Creada en PR #2, poblada en PR #8.
-- ----------------------------------------------------------------------------
create table if not exists public.lead_magnets_downloads (
  id                 bigserial primary key,
  lead_id            uuid references public.leads(id) on delete cascade,
  magnet_slug        text not null,
  downloaded_at      timestamptz not null default now(),
  ip_hash            text,
  user_agent_summary text,
  download_token     text,

  constraint magnets_slug_ck check (
    magnet_slug in ('str-potencial', 'tax-deed-7-filtros')
  ),
  constraint magnets_ip_hash_len_ck check (
    ip_hash is null or char_length(ip_hash) between 8 and 64
  ),
  constraint magnets_ua_summary_len_ck check (
    user_agent_summary is null or char_length(user_agent_summary) <= 60
  )
);

comment on table public.lead_magnets_downloads is
  'P3: registro de descargas de lead magnets. Poblada por endpoints de PR #8. Datos minimizados: ip_hash y user_agent_summary, sin PII en claro ni fingerprints.';
comment on column public.lead_magnets_downloads.ip_hash is
  'SHA-256(ip + CONSENT_IP_HASH_SALT) truncado a 12 chars. Sin IP en claro.';
comment on column public.lead_magnets_downloads.user_agent_summary is
  'Resumen de UA: browser family + OS family. Sin versión ni device fingerprint.';

create index if not exists magnets_lead_idx on public.lead_magnets_downloads (lead_id, downloaded_at desc);
create index if not exists magnets_slug_idx on public.lead_magnets_downloads (magnet_slug, downloaded_at desc);

-- ----------------------------------------------------------------------------
-- 5) TABLA: rate_limit_buckets
--    Contadores de rate limiting por IP hash. Uso: /api/leads y /api/consent/log.
--    TTL manual: filas con window_end antiguo se pueden purgar periódicamente.
-- ----------------------------------------------------------------------------
create table if not exists public.rate_limit_buckets (
  id           bigserial primary key,
  ip_hash      text not null,
  endpoint     text not null,
  window_start timestamptz not null,
  window_end   timestamptz not null,
  hit_count    int not null default 1,

  constraint rl_endpoint_ck check (
    endpoint in ('/api/leads', '/api/consent/log')
  ),
  constraint rl_ip_hash_len_ck check (
    char_length(ip_hash) between 8 and 64
  ),
  constraint rl_hit_count_ck check (hit_count >= 0),
  constraint rl_window_order_ck check (window_end > window_start)
);

comment on table public.rate_limit_buckets is
  'P3: buckets de rate limiting por IP hash + endpoint + ventana temporal. Solo IP hash, sin IP en claro.';

create index if not exists rl_lookup_idx
  on public.rate_limit_buckets (ip_hash, endpoint, window_end desc);
create index if not exists rl_cleanup_idx
  on public.rate_limit_buckets (window_end);

-- ============================================================================
-- ROW LEVEL SECURITY
-- Estricto: anon y authenticated NO tienen acceso. Solo service_role opera.
-- ============================================================================

alter table public.leads                   enable row level security;
alter table public.lead_events             enable row level security;
alter table public.consents                enable row level security;
alter table public.lead_magnets_downloads  enable row level security;
alter table public.rate_limit_buckets      enable row level security;

-- CERO policies para anon/authenticated → acceso denegado por defecto.
-- service_role bypassa RLS (comportamiento nativo de Supabase) → único
-- rol capaz de escribir/leer. Todo pasa forzosamente por endpoints del
-- servidor que usan SUPABASE_SERVICE_ROLE_KEY.

-- ============================================================================
-- FIN DE MIGRACIÓN
-- ============================================================================
