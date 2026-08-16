-- ============================================================================
-- Migration: 20260817_newsletter_subscribers
-- Purpose:   Newsletter subscription persistence (idempotent by email)
-- Author:    Claude Code para AnaMaria Morrison
-- Rollback:  supabase/migrations/20260817_newsletter_subscribers.down.sql
--
-- SAFETY
--   - CREATE-only. No modifica ni elimina tablas existentes.
--   - Idempotente (IF NOT EXISTS).
--   - RLS habilitado, sin policies para anon/authenticated: solo service role.
--   - No toca tabla `leads` (mantiene aislado el pipeline de contactos).
-- ============================================================================

create table if not exists public.newsletter_subscribers (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),

  -- Contacto (unique por email normalizado)
  email                 text not null,
  email_lower           text generated always as (lower(email)) stored,
  name                  text,

  -- Contexto del alta
  locale                text not null default 'es' check (locale in ('es', 'en')),
  source                text not null default 'newsletter_form',
  lead_magnet           text,
  landing_url           text,
  referrer              text,

  -- Consent + evidencia mínima
  consent_marketing     boolean not null default true,
  consent_version       text,
  ip_hash               text,

  -- Estado
  status                text not null default 'active' check (status in ('active','unsubscribed','bounced','complained')),
  welcome_sent_at       timestamptz,
  welcome_email_status  text,
  unsubscribed_at       timestamptz,
  unsubscribe_token     text unique default encode(gen_random_bytes(24), 'hex'),

  -- Sincronización con Resend
  resend_contact_id     text,
  resend_audience_id    text,
  resend_synced_at      timestamptz,
  resend_last_error     text
);

create unique index if not exists newsletter_subscribers_email_lower_idx
  on public.newsletter_subscribers (email_lower);

create index if not exists newsletter_subscribers_status_locale_idx
  on public.newsletter_subscribers (status, locale);

create index if not exists newsletter_subscribers_unsubscribe_token_idx
  on public.newsletter_subscribers (unsubscribe_token);

-- Auto-update updated_at
create or replace function public.p3_newsletter_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists p3_newsletter_touch_updated_at on public.newsletter_subscribers;
create trigger p3_newsletter_touch_updated_at
  before update on public.newsletter_subscribers
  for each row execute function public.p3_newsletter_touch_updated_at();

-- RLS: solo service_role puede acceder. Cero policies para anon/authenticated.
alter table public.newsletter_subscribers enable row level security;

comment on table public.newsletter_subscribers is
  'Newsletter list. Idempotent by lower(email). Synced to Resend Contacts. RLS: service_role only.';
