# Autonomous Weekly Newsletter Agent · operations guide

Complete architecture for the AnaMaría Morrison Weekly Real Estate Intelligence newsletter — an autonomous bilingual editorial agent that researches STR and Tax Deed developments each week, writes the edition, runs compliance, and (only when explicitly authorized) sends via Resend Broadcasts.

## Pipeline

```
Vercel Cron (weekly)
   └─► /api/cron/newsletter (CRON_SECRET auth, mode gated by env)
         └─► runNewsletterPipeline({ mode })
               ├─ Stage 1  runResearch      → OpenAI Responses API + web_search tool
               │                              → JSON-schema-validated candidates
               │                              → dedup vs. newsletter_story_seen
               ├─ Stage 2  runWriter        → OpenAI Responses API (structured output)
               │                              → selects 5-7 stories, writes ES + EN
               ├─ Stage 3  runCompliance    → forbidden-phrase scan, source-link check,
               │                              bilingual parity, Tax Deed disclaimer check,
               │                              public-name check
               ├─ Stage 4  persistEdition   → newsletter_editions row (draft/failed/ready)
               ├─ Stage 5  registerSelected → newsletter_story_seen (skip in preview_test)
               └─ Stage 6  broadcast        → autopilot only: Resend Broadcasts (create,
                                              and only send when NEWSLETTER_AUTO_SEND=true)
```

Every stage is FAIL-CLOSED. If research is insufficient, the writer returns malformed JSON, compliance flags a forbidden phrase, a story lacks a source link, bilingual parity is broken, or Resend rejects the broadcast — the pipeline stops and the edition status is `compliance_failed`, `failed`, or the run is marked `failed`. No empty/hallucinated newsletter is ever sent.

## Modes

| Mode | Cron env | Send? | Registers dedup? | Purpose |
|---|---|---|---|---|
| `preview_test` | via admin endpoint | never | no | Ana reviews samples without polluting the seen-stories registry |
| `production_generate` | `NEWSLETTER_AUTOMATION_ENABLED=true`, `NEWSLETTER_AUTO_SEND=false` | never | yes | Weekly generation runs, editions land as `ready_for_review` |
| `autopilot` | `NEWSLETTER_AUTOMATION_ENABLED=true`, `NEWSLETTER_AUTO_SEND=true` | yes | yes | Full autopilot |

Default deploy state: `NEWSLETTER_AUTOMATION_ENABLED` unset → cron returns `{ skipped: true, reason: "automation_disabled" }`.

## Files added

- `supabase/migrations/20260818_newsletter_editions.sql` (+ `.down.sql`) — `newsletter_editions`, `newsletter_runs`, `newsletter_story_seen` tables; RLS enabled, service-role only.
- `src/lib/newsletter-agent/types.ts` — pipeline TypeScript types.
- `src/lib/newsletter-agent/schemas.ts` — JSON schemas for structured OpenAI output.
- `src/lib/newsletter-agent/prompts.ts` — system prompts for research + writer.
- `src/lib/newsletter-agent/openai-client.ts` — thin wrapper over `openai` v6, extracts text, safe JSON parse.
- `src/lib/newsletter-agent/validate.ts` — dependency-free runtime validation, bilingual parity check, forbidden-phrase scanner, dedup-key normalizer.
- `src/lib/newsletter-agent/dedup.ts` — cross-edition dedup against `newsletter_story_seen`.
- `src/lib/newsletter-agent/pipeline.ts` — stage 1 (research), stage 2 (writer), stage 3 (compliance).
- `src/lib/newsletter-agent/persist.ts` — writes runs and editions to Supabase.
- `src/lib/newsletter-agent/broadcast.ts` — Resend Broadcast creation and send (autopilot only).
- `src/lib/newsletter-agent/orchestrator.ts` — end-to-end pipeline (`runNewsletterPipeline`).
- `src/lib/newsletter-agent/sample-data.ts` — deterministic bilingual fixture used by admin preview `mode=dry` and tests. Contains six real primary-source URLs (Airbnb newsroom, IRS federal tax liens page, Florida Bar, Booking Holdings IR, MuniCode, RealAuction).
- `src/app/api/cron/newsletter/route.ts` — weekly cron endpoint (CRON_SECRET auth).
- `src/app/api/admin/newsletter/preview/route.ts` — admin endpoint for on-demand preview (ADMIN_PREVIEW_SECRET or CRON_SECRET).
- `vercel.json` — cron schedule.
- `tests/newsletterAgent.test.ts` — 15 tests: candidate validation, dedup-key normalization, forbidden-phrase scanning, bilingual parity, compliance pass/fail.
- `tests/newsletterCron.test.ts` — 5 tests: authorization, `NEWSLETTER_AUTOMATION_ENABLED` gating, mode routing.

## Environment variables

| Variable | Required for | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | Live research/writer runs | Server-side only. Never exposed to the browser. |
| `NEWSLETTER_OPENAI_MODEL` | Optional | Model override; defaults to `gpt-5.1`. |
| `CRON_SECRET` | Cron auth | Required for the cron endpoint and admin fallback. |
| `ADMIN_PREVIEW_SECRET` | Admin endpoint auth | Optional. Falls back to `CRON_SECRET` if unset. |
| `NEWSLETTER_AUTOMATION_ENABLED` | Cron enable/disable | Set to `true` to allow the cron to run past the gate. |
| `NEWSLETTER_AUTO_SEND` | Autopilot enable | Set to `true` to auto-send via Resend. Only set after Ana authorizes. |
| `RESEND_API_KEY` | Broadcasts | Same key already used for transactional email. |
| `RESEND_NEWSLETTER_SEGMENT_ID_ES` / `_EN` | Broadcasts | Segment IDs (Ana already created `AnaMaría Weekly · ES` and `AnaMaría Weekly · EN` manually in the Resend dashboard). Under the current Resend Contacts + Segments model, Broadcasts target Segments, not the deprecated Audience primitive. |
| `NEWSLETTER_FROM_EMAIL` | Broadcasts | Sending address. Defaults to `noreply@anamorrison.com`. |
| `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Persistence | Required for editions/runs/dedup. |

## Cron schedule

`vercel.json`:

```json
{ "crons": [ { "path": "/api/cron/newsletter", "schedule": "0 13 * * 2" } ] }
```

Vercel Cron expressions are UTC. `0 13 * * 2` = **Tuesday 13:00 UTC**, which is:

- **09:00 America/New_York** during EDT (roughly March–November).
- **08:00 America/New_York** during EST (roughly November–March).

For a weekly newsletter, that one-hour DST shift is acceptable. If Ana ever needs to guarantee an exact Eastern local hour, we can add a second cron for the alternate offset and gate the winner in code.

Hobby plans on Vercel do not guarantee sub-minute cron precision. Acceptable for a weekly publication.

## Security

- **Cron endpoint** rejects everything without `Authorization: Bearer <CRON_SECRET>`. Fails closed if `CRON_SECRET` is unset.
- **Admin preview endpoint** rejects everything without `Authorization: Bearer <ADMIN_PREVIEW_SECRET>` (or `CRON_SECRET` as fallback).
- **OPENAI_API_KEY** is read server-side only via `getOpenAI()`; never bundled to client.
- **RESEND_API_KEY** likewise.
- Supabase writes go through the service-role client; RLS on the new tables has zero anon policies.
- No new tables or code paths interact with `leads`, `consents`, `lead_events`, or the existing `newsletter_subscribers` idempotency/consent flow.

## Failure behavior

The pipeline **will not send** if any of these happen:

| Failure | Where caught | Effect |
|---|---|---|
| `OPENAI_API_KEY` missing at runtime | `runResearch` / `runWriter` | Run marked `failed`, reason `no_openai_key` |
| OpenAI throws | pipeline stages | Run marked `failed`, reason `openai_exception:…` |
| Model returns invalid JSON | `safeJson` + validation | Run marked `failed`, reason `research_json_invalid` or `writer_json_invalid` |
| < 4 valid candidates | Stage 1 | Run marked `failed`, reason `insufficient_candidates` |
| < 4 non-duplicate candidates | Stage 1 dedup | Run marked `failed`, reason `insufficient_fresh_candidates` |
| Writer selects < 3 stories | Stage 2 | Run marked `failed`, reason `selected_below_minimum` |
| Forbidden phrase, missing source link, missing Tax Deed disclaimer, broken parity | Stage 3 compliance | Edition status `compliance_failed`; not sent |
| Supabase persist fails | Stage 4 | Run marked `failed`, reason `edition_persist_failed` |
| Resend broadcast create/send fails | Stage 6 (autopilot only) | Edition remains `approved` but not `sent`; error recorded in `send_error` |

## Sample edition (from admin preview `mode=dry`)

The admin preview endpoint returns a real bilingual edition with 6 selected stories, all with primary sources. Excerpt below; complete text is in `src/lib/newsletter-agent/sample-data.ts` and is what `POST /api/admin/newsletter/preview?mode=dry` returns.

**Subject EN:** `AnaMaría Morrison · Weekly briefing · STR regulation + Tax Deed rules`
**Subject ES:** `AnaMaría Morrison · Inteligencia semanal · Regulación STR + reglas Tax Deed`

## Preview QA steps (manual, before Production activation)

Prereq: `OPENAI_API_KEY`, `CRON_SECRET`, `ADMIN_PREVIEW_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY` all set in the **Preview** environment scope. Apply migration `20260818_newsletter_editions.sql` in Supabase.

1. **Dry preview** — no OpenAI, no dedup registration, no send. Verifies the pipeline plumbing end-to-end.
   ```
   curl -X POST "$PREVIEW_URL/api/admin/newsletter/preview?mode=dry" \
     -H "Authorization: Bearer $ADMIN_PREVIEW_SECRET"
   ```
   Expect `ok: true`, compliance `pass`, six selected stories, bilingual content, edition persisted with status `ready_for_review`.

2. **Live preview** — real OpenAI + web_search call. Consumes tokens.
   ```
   curl -X POST "$PREVIEW_URL/api/admin/newsletter/preview?mode=live" \
     -H "Authorization: Bearer $ADMIN_PREVIEW_SECRET"
   ```
   Expect a fresh JSON payload with real candidates and a real bilingual edition. Nothing is sent to subscribers.

3. **Cron gating** — automation still disabled.
   ```
   curl "$PREVIEW_URL/api/cron/newsletter" -H "Authorization: Bearer $CRON_SECRET"
   ```
   Expect `{ ok: true, skipped: true, reason: "automation_disabled" }`.

4. **Enable production_generate** in Preview only. Set `NEWSLETTER_AUTOMATION_ENABLED=true` in the Preview env scope (leave `NEWSLETTER_AUTO_SEND` unset). Re-run step 3. Expect `mode: "production_generate"`, edition persisted, no send.

5. **Inspect** `newsletter_editions` and `newsletter_runs` in Supabase Preview. Confirm compliance status, subject lines, and content are what Ana wants.

6. **Simulate autopilot in Preview** — only after Ana approves the sample. Set `NEWSLETTER_AUTO_SEND=true` in the Preview env scope. Re-run step 3. Expect `mode: "autopilot"`, `broadcastIds` populated. The Broadcast will be created in Resend and **sent to the Preview audience** — so ensure the Preview audience contains only test recipients.

## Production activation (only after Ana explicitly authorizes)

1. Apply migration `20260818_newsletter_editions.sql` in the Production Supabase project.
2. Set in **Production** env scope:
   - `OPENAI_API_KEY`
   - `CRON_SECRET` (fresh value, not the Preview one)
   - `ADMIN_PREVIEW_SECRET`
   - `RESEND_NEWSLETTER_SEGMENT_ID_ES`, `RESEND_NEWSLETTER_SEGMENT_ID_EN`
3. Merge PR to `main`.
4. Set `NEWSLETTER_AUTOMATION_ENABLED=true` in Production. Verify next Tuesday's cron persists a `ready_for_review` edition. Ana reviews it.
5. Once satisfied, set `NEWSLETTER_AUTO_SEND=true`. The following Tuesday, autopilot sends the edition via Resend Broadcasts to the ES + EN audiences.

At any point the kill switch is: unset `NEWSLETTER_AUTOMATION_ENABLED` (or set to `false`) in Production. The cron endpoint will resume returning `{ skipped: true }` immediately.

## Nothing existing was broken

- `/api/leads`, `saveLead`, `sendLeadNotification`, ContactForm, ConsentBanner, analytics — untouched.
- The idempotent `/api/newsletter` signup flow shipped previously — untouched.
- Existing Resend transactional emails — untouched.
- Existing `newsletter_subscribers` table — untouched.
- `NEXT_PUBLIC_I18N_ENABLED=false` in Production — untouched.
- No client-side exposure of `OPENAI_API_KEY` or `RESEND_API_KEY`.
