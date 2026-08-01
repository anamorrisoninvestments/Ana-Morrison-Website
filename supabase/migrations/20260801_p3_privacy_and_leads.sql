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
  soft_deleted_at           timestamptz
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
  payload     jsonb not null default '{}'::jsonb
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
  user_agent_summary    text
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
  id             bigserial primary key,
  lead_id        uuid references public.leads(id) on delete cascade,
  magnet_slug    text not null,
  downloaded_at  timestamptz not null default now(),
  ip             inet,
  user_agent     text,
  download_token text
);

comment on table public.lead_magnets_downloads is
  'P3: registro de descargas de lead magnets. Poblada por endpoints de PR #8.';

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
  hit_count    int not null default 1
);

comment on table public.rate_limit_buckets is
  'P3: buckets de rate limiting por IP hash + endpoint + ventana temporal.';

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
