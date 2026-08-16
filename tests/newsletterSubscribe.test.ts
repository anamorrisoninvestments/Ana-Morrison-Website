import { describe, test, beforeEach, expect, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { subscribeNewsletterWithClient } from "../src/lib/newsletter/subscribe";

type Call = { table: string; op: string; args: unknown[] };
let calls: Call[] = [];

type State = {
  existing: null | { id: string; status: string; welcome_sent_at: string | null; unsubscribe_token: string | null; locale: string };
  insertReturns: { id: string; unsubscribe_token: string } | null;
  insertError: { code?: string; message?: string } | null;
  updateError: { code?: string; message?: string } | null;
  selectError: { code?: string; message?: string } | null;
};
let state: State;

function makeClient() {
  return {
    from(table: string) {
      const rec = (op: string, args: unknown[]) => calls.push({ table, op, args });
      const b: Record<string, unknown> & { _pending?: string } = {};

      b.select = () => b;
      b.eq = () => b;
      b.insert = (row: unknown) => { rec("insert", [row]); b._pending = "insert"; return b; };
      b.update = (patch: unknown) => { rec("update", [patch]); b._pending = "update"; return b; };
      b.single = () => b;

      b.maybeSingle = async () => {
        rec("select", []);
        if (state.selectError) return { data: null, error: state.selectError };
        return { data: state.existing, error: null };
      };

      // Terminal awaitable — returns based on last op
      (b as { then: (r: (v: { data: unknown; error: unknown }) => unknown) => Promise<unknown> }).then = (resolve) => {
        if (b._pending === "insert") {
          return Promise.resolve({ data: state.insertReturns, error: state.insertError }).then(resolve);
        }
        if (b._pending === "update") {
          return Promise.resolve({ data: null, error: state.updateError }).then(resolve);
        }
        return Promise.resolve({ data: null, error: null }).then(resolve);
      };
      return b;
    },
  } as unknown as import("@supabase/supabase-js").SupabaseClient;
}

beforeEach(() => {
  calls = [];
  state = {
    existing: null,
    insertReturns: { id: "sub-new-1", unsubscribe_token: "tok-new-1" },
    insertError: null,
    updateError: null,
    selectError: null,
  };
});

describe("subscribeNewsletterWithClient", () => {
  test("new email inserts and returns welcomeShouldSend=true, created=true", async () => {
    const r = await subscribeNewsletterWithClient(makeClient(), {
      email: "New@Example.COM",
      name: "Ana",
      locale: "es",
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.created).toBe(true);
      expect(r.alreadySubscribed).toBe(false);
      expect(r.resubscribed).toBe(false);
      expect(r.welcomeShouldSend).toBe(true);
      expect(r.email).toBe("new@example.com");
      expect(r.locale).toBe("es");
      expect(r.unsubscribeToken).toBe("tok-new-1");
      expect(r.storage).toBe("supabase");
    }
    const insertCall = calls.find((c) => c.op === "insert" && c.table === "newsletter_subscribers");
    expect(insertCall).toBeDefined();
    const row = (insertCall!.args[0] as Record<string, unknown>);
    expect(row.email).toBe("new@example.com");
    expect(row.locale).toBe("es");
    expect(row.consent_marketing).toBe(true);
  });

  test("already active subscriber → alreadySubscribed=true, welcomeShouldSend=false (idempotent)", async () => {
    state.existing = { id: "sub-existing-1", status: "active", welcome_sent_at: "2026-01-01T00:00:00Z", unsubscribe_token: "tok-1", locale: "es" };
    const r = await subscribeNewsletterWithClient(makeClient(), {
      email: "already@example.com",
      locale: "es",
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.created).toBe(false);
      expect(r.alreadySubscribed).toBe(true);
      expect(r.resubscribed).toBe(false);
      expect(r.welcomeShouldSend).toBe(false);
    }
    expect(calls.find((c) => c.op === "insert")).toBeUndefined();
    expect(calls.find((c) => c.op === "update")).toBeDefined();
  });

  test("resubscribing previously unsubscribed user reactivates and welcomeShouldSend=true", async () => {
    state.existing = { id: "sub-unsub-1", status: "unsubscribed", welcome_sent_at: "2026-01-01T00:00:00Z", unsubscribe_token: "tok-2", locale: "en" };
    const r = await subscribeNewsletterWithClient(makeClient(), {
      email: "returning@example.com",
      locale: "en",
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.resubscribed).toBe(true);
      expect(r.alreadySubscribed).toBe(false);
      expect(r.welcomeShouldSend).toBe(true);
    }
    const updateCall = calls.find((c) => c.op === "update");
    expect(updateCall).toBeDefined();
    const patch = updateCall!.args[0] as Record<string, unknown>;
    expect(patch.status).toBe("active");
    expect(patch.unsubscribed_at).toBeNull();
  });

  test("no Supabase client → email-only fallback (never blocks the user)", async () => {
    const r = await subscribeNewsletterWithClient(null, { email: "fallback@example.com", locale: "es" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.storage).toBe("email-only-fallback");
      expect(r.welcomeShouldSend).toBe(true);
    }
  });

  test("locale defaults handled: 'en' input persists as 'en'", async () => {
    await subscribeNewsletterWithClient(makeClient(), { email: "e@example.com", locale: "en" });
    const insertCall = calls.find((c) => c.op === "insert")!;
    const row = insertCall.args[0] as Record<string, unknown>;
    expect(row.locale).toBe("en");
  });

  test("insert failure returns { ok: false, error: internal_error }", async () => {
    state.insertReturns = null;
    state.insertError = { code: "23505", message: "conflict" };
    const r = await subscribeNewsletterWithClient(makeClient(), { email: "fail@example.com", locale: "es" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe("internal_error");
  });
});
