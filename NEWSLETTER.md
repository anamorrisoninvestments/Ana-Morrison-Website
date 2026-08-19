# Newsletter · operations guide

Complete flow for the anamorrison.com newsletter, from subscriber capture
to weekly Broadcasts, in Spanish and English.

## What was fixed

**Root cause of "no confirmation email" before this fix:** the previous
`/api/newsletter` endpoint tried to send two emails via Resend but did not
persist the subscriber anywhere. Silent failures (missing `RESEND_API_KEY`,
unverified sending domain, or transient Resend errors) meant the subscriber
was lost and never received the welcome email. There was also no dedup, so
resubmissions would attempt duplicate emails; no honeypot, so bots hit the
endpoint; no rate limit; and no unsubscribe mechanism.

## New architecture

1. **Supabase source of truth** — `public.newsletter_subscribers` table with
   unique index on `lower(email)`. Idempotent by email. RLS enabled,
   `service_role` only.
2. **Endpoint** `POST /api/newsletter` — validates, applies the same security
   patterns as `/api/leads` (rate limit, honeypot, timing check), upserts the
   subscriber, best-effort syncs to a Resend audience, and only sends the
   welcome email when it makes sense (new subscriber or resubscribe).
3. **Unsubscribe endpoint** `GET|POST /api/newsletter/unsubscribe?token=…` —
   sets `status='unsubscribed'` and syncs the change to Resend. The token is
   generated per subscriber and included as `List-Unsubscribe` header in the
   welcome email for one-click unsubscription in email clients.
4. **Welcome email** — bilingual (ES / EN based on the submitted `locale`),
   sent from the same address configured via `NEWSLETTER_FROM_EMAIL`
   (defaults to `noreply@anamorrison.com`). Never sent twice for the same
   subscriber unless they unsubscribe and resubscribe.

## Environment variables

Set the following in Vercel per environment. Nothing here is committed.

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes for real delivery | Server-side Resend key. If unset or `re_placeholder`, welcome emails are skipped and the subscription still persists. |
| `NEWSLETTER_FROM_EMAIL` | Optional | Sending address for the welcome. Defaults to `noreply@anamorrison.com`. Must be a verified sending identity in Resend. |
| `RESEND_NEWSLETTER_SEGMENT_ID_ES` | Required for sync | Segment ID of `AnaMaría Weekly · ES` (already created by Ana in the Resend dashboard). Under the current Resend Contacts + Segments model, Contacts are global and Segment membership determines who receives which Broadcast. |
| `RESEND_NEWSLETTER_SEGMENT_ID_EN` | Required for sync | Segment ID of `AnaMaría Weekly · EN` (already created by Ana in the Resend dashboard). |
| `NEXT_PUBLIC_SITE_URL` | Optional | Used to build the unsubscribe URL. Falls back to `CLIENT.siteUrl`. |
| `NEXT_PUBLIC_CONSENT_VERSION` | Optional | Recorded on each subscription. Defaults to `v1.0`. |
| `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Yes | Required for persistence. Without them the endpoint falls back to email-only mode and returns success without storing anything. |
| `CONSENT_IP_HASH_SALT` | Yes for rate-limit tracking | Used to compute `ip_hash` for rate limiting and consent evidence. |

**Ana's one manual step for Preview activation:** the two Segments already
exist in Resend as `AnaMaría Weekly · ES` and `AnaMaría Weekly · EN`. Copy
their IDs from the Resend dashboard into `RESEND_NEWSLETTER_SEGMENT_ID_ES`
and `RESEND_NEWSLETTER_SEGMENT_ID_EN` in the **Preview** environment scope,
and redeploy. The site works without them (sync is best-effort skip), but
Contacts appear in the correct Segment only when the IDs are set.

## Applying the Supabase migration

The migration file lives at
`supabase/migrations/20260817_newsletter_subscribers.sql`.

Apply it once in each Supabase project (Preview + Production, per Ana's
choice) via the Supabase SQL editor or CLI. The migration is `IF NOT EXISTS`
throughout, so re-running it is safe.

Rollback: `supabase/migrations/20260817_newsletter_subscribers.down.sql`.

## Sending a weekly newsletter with Resend Broadcasts

Do not build a custom bulk-mail engine. Use Resend Broadcasts directly.

1. Log in to Resend at <https://resend.com>.
2. Navigate to **Segments**. You will see `AnaMaría Weekly · ES` and
   `AnaMaría Weekly · EN`.
3. Click **Broadcasts → New Broadcast**.
4. **From:** `AnaMaría Morrison <noreply@anamorrison.com>` (or another
   verified sending address on the domain).
5. **Segment:** pick `AnaMaría Weekly · ES` for the Spanish broadcast,
   `AnaMaría Weekly · EN` for the English broadcast. Send as two separate
   broadcasts if you want parallel bilingual delivery.
6. **Subject line:** write in the target language.
7. **Content:** paste the email content (HTML or the Resend editor).
   Include a visible unsubscribe link — Resend appends the standard
   `List-Unsubscribe` header automatically for broadcasts.
8. **Send a test** to yourself first. Verify rendering in Gmail, Outlook,
   Apple Mail.
9. **Schedule** or **Send now**. Broadcasts are asynchronous.
10. **Review results** in the Broadcasts dashboard: opens, clicks, bounces,
    complaints, unsubscribes.

## Handling unsubscribes

Unsubscribes flow both directions:

- **From the welcome email** — the `List-Unsubscribe` header points to
  `/api/newsletter/unsubscribe?token=…`. Gmail's one-click unsubscribe uses
  the POST variant automatically. This updates the Supabase row and syncs
  the change to Resend.
- **From a Resend broadcast** — recipients use Resend's built-in
  unsubscribe link, which flips the Contact to unsubscribed inside the
  audience. A future reconciliation job (not yet built) can pull those
  changes back into Supabase; today the Supabase row will show the last
  status this endpoint knew about.

## Resend Automations

Resend supports Automations for evergreen sequences. The current
architecture is **compatible** with Automations because subscribers are
added to a specific audience on signup:

- Create an Automation in Resend triggered on "Contact added to audience".
- Design the sequence (day 0 welcome, day 3 educational email, day 7
  practical guide, etc.).
- Point the trigger at the ES audience for a Spanish sequence and the EN
  audience for an English sequence.

Because our own endpoint already sends the day-0 welcome, either:

- Suppress the day-0 email in the Automation and let our welcome handle it.
- Or remove our welcome (set `RESEND_API_KEY` empty for that surface) and
  let Automations own the entire lifecycle.

Do not run both a day-0 Automation email and our welcome — they will send
twice.

## Testing checklist

Automated tests (see `tests/newsletterSubscribe.test.ts`):

- New subscriber inserted with correct locale
- Duplicate subscription returns `alreadySubscribed=true` (no duplicate insert)
- Resubscribe after unsubscribe reactivates and triggers a new welcome
- Missing Supabase → email-only fallback path
- Locale defaults handled
- Insert failure returns explicit error

Preview manual QA:

1. Submit the footer form on `/` (ES). Confirm banner shows "¡Bienvenida!
   Revisa tu email." Check inbox for the ES welcome email.
2. Submit the same email again. Confirm the banner shows "Ya estás
   suscrita." No second welcome email arrives.
3. Submit the footer form on `/en`. Confirm banner shows "Welcome! Check
   your inbox." Check inbox for the EN welcome email.
4. Click the unsubscribe link in a welcome email. Confirm the success page
   loads and the Supabase row shows `status='unsubscribed'`.
5. Submit the newsletter form again with the same address. Confirm
   `resubscribed=true` and a fresh welcome arrives.
6. Submit with an invalid email. Confirm a validation error is returned.
7. Submit repeatedly from the same IP. Confirm the 4th submission within a
   minute is rate-limited (429).
8. Fill the hidden `hp_website` field via devtools. Confirm the server
   returns a silent 200 with no email sent.

## Nothing was changed in existing systems

- `/api/leads`, `saveLead`, `sendLeadNotification`, ContactForm, consent
  banner, analytics, RLS on `leads` — untouched.
- Existing Resend transactional emails (lead notifications) — untouched.
- The new `newsletter_subscribers` table is fully isolated from `leads`.
- `RESEND_API_KEY` is only read server-side; never exposed to the client.
