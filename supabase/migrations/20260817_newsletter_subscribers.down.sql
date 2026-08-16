-- Rollback for 20260817_newsletter_subscribers
drop trigger if exists p3_newsletter_touch_updated_at on public.newsletter_subscribers;
drop function if exists public.p3_newsletter_touch_updated_at();
drop index if exists public.newsletter_subscribers_email_lower_idx;
drop index if exists public.newsletter_subscribers_status_locale_idx;
drop index if exists public.newsletter_subscribers_unsubscribe_token_idx;
drop table if exists public.newsletter_subscribers;
