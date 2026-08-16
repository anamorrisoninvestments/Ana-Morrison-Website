-- ============================================================================
-- Migration: 20260818_newsletter_editions
-- Purpose:   Persist autonomous weekly newsletter editions, stories, and runs
-- Author:    Claude Code para AnaMaria Morrison
-- Rollback:  supabase/migrations/20260818_newsletter_editions.down.sql
--
-- SAFETY
--   - CREATE-only. IF NOT EXISTS throughout.
--   - RLS enabled with zero policies for anon/authenticated. Service_role only.
--   - Does not touch existing tables (leads, consents, newsletter_subscribers).
-- ============================================================================

-- Story dedup registry. Rows survive across editions to prevent re-serving.
create table if not exists public.newsletter_story_seen (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  dedup_key             text not null,               -- normalized signature
  headline              text,
  source_urls           text[] not null default '{}',
  category              text,                        -- 'str' | 'tax_deed' | ...
  jurisdiction          text,
  published_at          timestamptz,
  first_used_edition_id uuid,
  first_used_at         timestamptz
);

create unique index if not exists newsletter_story_seen_dedup_key_idx
  on public.newsletter_story_seen (dedup_key);
create index if not exists newsletter_story_seen_category_idx
  on public.newsletter_story_seen (category);

-- Run log: every cron invocation, including failures.
create table if not exists public.newsletter_runs (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  mode                  text not null check (mode in ('preview_test','production_generate','autopilot')),
  triggered_by          text not null,               -- 'cron' | 'admin_preview' | 'manual'
  period_start          date,
  period_end            date,
  status                text not null default 'running'
                          check (status in ('running','completed','failed','skipped')),
  fail_reason           text,
  candidate_count       int,
  rejected_count        int,
  selected_count        int,
  model                 text,
  edition_id            uuid,
  raw_metadata          jsonb not null default '{}'::jsonb
);

create index if not exists newsletter_runs_created_at_idx
  on public.newsletter_runs (created_at desc);
create index if not exists newsletter_runs_status_idx
  on public.newsletter_runs (status);

-- Editions: one per weekly send. Bilingual, versioned, review-gated.
create table if not exists public.newsletter_editions (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  run_id                uuid,
  period_start          date not null,
  period_end            date not null,

  status                text not null default 'draft'
                          check (status in ('draft','compliance_failed','ready_for_review','approved','sent','send_failed','canceled')),
  compliance_result     text,                        -- 'pass' | 'warn' | 'fail' + notes

  subject_es            text,
  subject_en            text,
  content_es            text,                        -- rendered HTML/Markdown
  content_en            text,

  candidate_stories     jsonb not null default '[]'::jsonb,  -- structured
  selected_stories      jsonb not null default '[]'::jsonb,  -- ranked winners
  rejected_stories      jsonb not null default '[]'::jsonb,  -- with reason

  model                 text,
  input_tokens          int,
  output_tokens         int,
  metadata              jsonb not null default '{}'::jsonb,

  approved_at           timestamptz,
  approved_by           text,

  broadcast_id_es       text,
  broadcast_id_en       text,
  sent_at               timestamptz,
  recipients_es         int,
  recipients_en         int,
  send_error            text
);

create unique index if not exists newsletter_editions_period_idx
  on public.newsletter_editions (period_start, period_end);
create index if not exists newsletter_editions_status_idx
  on public.newsletter_editions (status);

-- Auto-touch updated_at
create or replace function public.p3_newsletter_editions_touch()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end; $$;

drop trigger if exists p3_newsletter_editions_touch on public.newsletter_editions;
create trigger p3_newsletter_editions_touch
  before update on public.newsletter_editions
  for each row execute function public.p3_newsletter_editions_touch();

drop trigger if exists p3_newsletter_runs_touch on public.newsletter_runs;
create trigger p3_newsletter_runs_touch
  before update on public.newsletter_runs
  for each row execute function public.p3_newsletter_editions_touch();

alter table public.newsletter_story_seen enable row level security;
alter table public.newsletter_runs       enable row level security;
alter table public.newsletter_editions   enable row level security;

comment on table public.newsletter_editions is
  'Weekly autonomous newsletter editions. Bilingual. Review-gated. RLS: service_role only.';
comment on table public.newsletter_story_seen is
  'Story dedup registry across editions. Prevents repeated coverage of the same news.';
comment on table public.newsletter_runs is
  'Every cron invocation of the newsletter agent, including failures.';
