import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("server-only", () => ({}));

// Capture every Resend method call so tests can assert exact payloads.
type Call = { method: string; args: unknown[] };
const calls: Call[] = [];

let contactCreateBehavior: "ok_new" | "ok_existing" | "error_generic" = "ok_new";
let segmentAddBehavior: "ok" | "already_in" | "error" = "ok";
let segmentRemoveBehavior: "ok" | "not_in" | "error" = "ok";
let broadcastCreateBehavior: "ok" | "error" = "ok";

function makeResendMock() {
  return {
    contacts: {
      create: vi.fn(async (payload: unknown) => {
        calls.push({ method: "contacts.create", args: [payload] });
        if (contactCreateBehavior === "ok_new") {
          return { data: { id: "c-new-1" }, error: null };
        }
        if (contactCreateBehavior === "ok_existing") {
          return { data: null, error: { message: "Contact already exists" } };
        }
        return { data: null, error: { message: "Some other resend error" } };
      }),
      update: vi.fn(async (payload: unknown) => {
        calls.push({ method: "contacts.update", args: [payload] });
        return { data: null, error: null };
      }),
      segments: {
        add: vi.fn(async (payload: unknown) => {
          calls.push({ method: "contacts.segments.add", args: [payload] });
          if (segmentAddBehavior === "ok") return { data: { id: "s-mem-1" }, error: null };
          if (segmentAddBehavior === "already_in") return { data: null, error: { message: "Contact already in segment" } };
          return { data: null, error: { message: "Boom" } };
        }),
        remove: vi.fn(async (payload: unknown) => {
          calls.push({ method: "contacts.segments.remove", args: [payload] });
          if (segmentRemoveBehavior === "ok") return { data: {}, error: null };
          if (segmentRemoveBehavior === "not_in") return { data: null, error: { message: "Not in segment" } };
          return { data: null, error: { message: "Kaboom" } };
        }),
      },
    },
    broadcasts: {
      create: vi.fn(async (payload: unknown) => {
        calls.push({ method: "broadcasts.create", args: [payload] });
        if (broadcastCreateBehavior === "ok") return { data: { id: "b-1" }, error: null };
        return { data: null, error: { message: "broadcast rejected" } };
      }),
      send: vi.fn(async (id: string) => {
        calls.push({ method: "broadcasts.send", args: [id] });
        return { data: {}, error: null };
      }),
    },
  };
}

vi.mock("resend", () => {
  class Resend {
    contacts: ReturnType<typeof makeResendMock>["contacts"];
    broadcasts: ReturnType<typeof makeResendMock>["broadcasts"];
    constructor() {
      const m = makeResendMock();
      this.contacts = m.contacts;
      this.broadcasts = m.broadcasts;
    }
  }
  return { Resend };
});

// Reset all state before every test.
const OLD_ENV = { ...process.env };
beforeEach(() => {
  calls.length = 0;
  contactCreateBehavior = "ok_new";
  segmentAddBehavior = "ok";
  segmentRemoveBehavior = "ok";
  broadcastCreateBehavior = "ok";
  process.env = {
    ...OLD_ENV,
    RESEND_API_KEY: "re_test_key",
    RESEND_NEWSLETTER_SEGMENT_ID_ES: "seg_es_123",
    RESEND_NEWSLETTER_SEGMENT_ID_EN: "seg_en_456",
  };
  // Ensure any deprecated env vars are absent so nothing accidentally reads them.
  delete process.env.RESEND_NEWSLETTER_AUDIENCE_ID;
  delete process.env.RESEND_NEWSLETTER_AUDIENCE_ID_ES;
  delete process.env.RESEND_NEWSLETTER_AUDIENCE_ID_EN;
});
afterEach(() => {
  process.env = OLD_ENV;
  vi.clearAllMocks();
});

import { syncContactToResend, unsubscribeContactInResend } from "../src/lib/newsletter/resend-sync";
import { createAndOptionallySend } from "../src/lib/newsletter-agent/broadcast";

describe("syncContactToResend · Segments model", () => {
  test("ES signup creates one global contact with ES segment membership", async () => {
    const r = await syncContactToResend({ email: "New@Example.com", name: "Ana", locale: "es" });
    expect(r.ok).toBe(true);
    if (r.ok && !("skipped" in r)) {
      expect(r.segmentId).toBe("seg_es_123");
      expect(r.contactId).toBe("c-new-1");
    }
    const create = calls.find((c) => c.method === "contacts.create");
    expect(create).toBeDefined();
    const payload = create!.args[0] as { email: string; segments: { id: string }[] };
    expect(payload.email).toBe("new@example.com");
    expect(payload.segments).toEqual([{ id: "seg_es_123" }]);
    // Best-effort remove from the OTHER segment (EN)
    const removeEN = calls.find((c) => c.method === "contacts.segments.remove");
    expect(removeEN).toBeDefined();
    expect((removeEN!.args[0] as { segmentId: string }).segmentId).toBe("seg_en_456");
  });

  test("EN signup creates one global contact with EN segment membership", async () => {
    const r = await syncContactToResend({ email: "hello@example.com", locale: "en" });
    expect(r.ok).toBe(true);
    if (r.ok && !("skipped" in r)) expect(r.segmentId).toBe("seg_en_456");
    const create = calls.find((c) => c.method === "contacts.create");
    const payload = create!.args[0] as { segments: { id: string }[] };
    expect(payload.segments).toEqual([{ id: "seg_en_456" }]);
    const removeES = calls.find((c) => c.method === "contacts.segments.remove");
    expect((removeES!.args[0] as { segmentId: string }).segmentId).toBe("seg_es_123");
  });

  test("duplicate signup does not create duplicate contact — falls back to segment add", async () => {
    contactCreateBehavior = "ok_existing";
    const r = await syncContactToResend({ email: "dupe@example.com", locale: "es" });
    expect(r.ok).toBe(true);
    // create was called and returned "already exists"
    expect(calls.filter((c) => c.method === "contacts.create").length).toBe(1);
    // segment.add was called as fallback
    const add = calls.find((c) => c.method === "contacts.segments.add");
    expect(add).toBeDefined();
    const addPayload = add!.args[0] as { email: string; segmentId: string };
    expect(addPayload.email).toBe("dupe@example.com");
    expect(addPayload.segmentId).toBe("seg_es_123");
  });

  test("existing subscriber already in segment does not error", async () => {
    contactCreateBehavior = "ok_existing";
    segmentAddBehavior = "already_in";
    const r = await syncContactToResend({ email: "member@example.com", locale: "en" });
    expect(r.ok).toBe(true);
  });

  test("locale is deterministic — no ES call when locale=en", async () => {
    await syncContactToResend({ email: "a@b.com", locale: "en" });
    const create = calls.find((c) => c.method === "contacts.create");
    const payload = create!.args[0] as { segments: { id: string }[] };
    expect(payload.segments[0].id).toBe("seg_en_456");
  });

  test("missing segment ID for the locale fails closed (returns skipped, not silent success)", async () => {
    delete process.env.RESEND_NEWSLETTER_SEGMENT_ID_ES;
    const r = await syncContactToResend({ email: "no-seg@example.com", locale: "es" });
    expect(r.ok).toBe(true);
    expect("skipped" in r && r.skipped).toBe(true);
    if ("skipped" in r && r.skipped) expect(r.reason).toBe("no_segment_configured");
    // No Resend calls attempted
    expect(calls.length).toBe(0);
  });

  test("Resend API error does not report false success", async () => {
    contactCreateBehavior = "error_generic";
    const r = await syncContactToResend({ email: "err@example.com", locale: "es" });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.error).toBe("Some other resend error");
      expect(r.segmentId).toBe("seg_es_123");
    }
  });

  test("no OpenAI/Resend key → returns skipped:no_api_key (does not throw)", async () => {
    delete process.env.RESEND_API_KEY;
    const r = await syncContactToResend({ email: "x@y.com", locale: "es" });
    expect(r.ok).toBe(true);
    expect("skipped" in r && r.skipped).toBe(true);
    if ("skipped" in r && r.skipped) expect(r.reason).toBe("no_api_key");
  });
});

describe("unsubscribeContactInResend · segment-scoped only", () => {
  test("removes contact from the correct locale segment (does NOT touch global unsubscribed)", async () => {
    const r = await unsubscribeContactInResend({ email: "leaver@example.com", locale: "es" });
    expect(r.ok).toBe(true);
    const rem = calls.find((c) => c.method === "contacts.segments.remove");
    expect(rem).toBeDefined();
    const payload = rem!.args[0] as { email: string; segmentId: string };
    expect(payload.email).toBe("leaver@example.com");
    expect(payload.segmentId).toBe("seg_es_123");
    // Critically: NO contacts.update call was made (would set global unsubscribed=true).
    expect(calls.find((c) => c.method === "contacts.update")).toBeUndefined();
  });

  test("EN unsubscribe removes from EN segment only", async () => {
    const r = await unsubscribeContactInResend({ email: "en@example.com", locale: "en" });
    expect(r.ok).toBe(true);
    const rem = calls.find((c) => c.method === "contacts.segments.remove");
    expect((rem!.args[0] as { segmentId: string }).segmentId).toBe("seg_en_456");
  });

  test("'not in segment' error treated as idempotent success", async () => {
    segmentRemoveBehavior = "not_in";
    const r = await unsubscribeContactInResend({ email: "never@example.com", locale: "es" });
    expect(r.ok).toBe(true);
  });

  test("real error surfaces as failure", async () => {
    segmentRemoveBehavior = "error";
    const r = await unsubscribeContactInResend({ email: "err@example.com", locale: "es" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe("Kaboom");
  });

  test("no segment configured for that locale → no-op success (nothing to remove from)", async () => {
    delete process.env.RESEND_NEWSLETTER_SEGMENT_ID_EN;
    const r = await unsubscribeContactInResend({ email: "no@seg.com", locale: "en" });
    expect(r.ok).toBe(true);
    expect(calls.length).toBe(0);
  });
});

describe("Broadcast targeting · Segments only", () => {
  test("Spanish broadcast targets ES Segment ID (never audienceId)", async () => {
    const r = await createAndOptionallySend({
      editionId: "ed-1",
      subjectES: "asunto es",
      subjectEN: "subject en",
      contentES: "<p>es</p>",
      contentEN: "<p>en</p>",
      segmentIdES: "seg_es_123",
      segmentIdEN: "seg_en_456",
      fromEmail: "noreply@anamorrison.com",
      fromName: "AnaMaría Morrison",
      autoSend: false,
    });
    expect(r.ok).toBe(true);
    expect(r.broadcastIdES).toBe("b-1");
    expect(r.broadcastIdEN).toBe("b-1");
    const brES = calls.filter((c) => c.method === "broadcasts.create")[0];
    const brEN = calls.filter((c) => c.method === "broadcasts.create")[1];
    const pES = brES.args[0] as { segmentId: string; audienceId?: string };
    const pEN = brEN.args[0] as { segmentId: string; audienceId?: string };
    expect(pES.segmentId).toBe("seg_es_123");
    expect(pEN.segmentId).toBe("seg_en_456");
    // No deprecated audienceId payload
    expect(pES.audienceId).toBeUndefined();
    expect(pEN.audienceId).toBeUndefined();
  });

  test("English broadcast targets EN Segment ID", async () => {
    await createAndOptionallySend({
      editionId: "ed-2",
      subjectES: "es", subjectEN: "en",
      contentES: "<p>es</p>", contentEN: "<p>en</p>",
      segmentIdES: null,
      segmentIdEN: "seg_en_456",
      fromEmail: "noreply@anamorrison.com",
      fromName: "AnaMaría Morrison",
      autoSend: false,
    });
    const brCalls = calls.filter((c) => c.method === "broadcasts.create");
    expect(brCalls.length).toBe(1);
    const p = brCalls[0].args[0] as { segmentId: string };
    expect(p.segmentId).toBe("seg_en_456");
  });

  test("autoSend=false does not call broadcasts.send", async () => {
    await createAndOptionallySend({
      editionId: "ed-3",
      subjectES: "es", subjectEN: "en",
      contentES: "<p>es</p>", contentEN: "<p>en</p>",
      segmentIdES: "seg_es_123", segmentIdEN: "seg_en_456",
      fromEmail: "noreply@anamorrison.com",
      fromName: "AnaMaría Morrison",
      autoSend: false,
    });
    expect(calls.find((c) => c.method === "broadcasts.send")).toBeUndefined();
  });

  test("broadcast create failure returns { ok: false }, not silent success", async () => {
    broadcastCreateBehavior = "error";
    const r = await createAndOptionallySend({
      editionId: "ed-4",
      subjectES: "es", subjectEN: "en",
      contentES: "<p>es</p>", contentEN: "<p>en</p>",
      segmentIdES: "seg_es_123", segmentIdEN: "seg_en_456",
      fromEmail: "noreply@anamorrison.com",
      fromName: "AnaMaría Morrison",
      autoSend: false,
    });
    expect(r.ok).toBe(false);
    expect(r.sent).toBe(false);
  });

  test("missing API key returns { ok: false, error: no_api_key } (fail-closed)", async () => {
    delete process.env.RESEND_API_KEY;
    const r = await createAndOptionallySend({
      editionId: "ed-5",
      subjectES: "es", subjectEN: "en",
      contentES: "<p>es</p>", contentEN: "<p>en</p>",
      segmentIdES: "seg_es_123", segmentIdEN: "seg_en_456",
      fromEmail: "noreply@anamorrison.com",
      fromName: "AnaMaría Morrison",
      autoSend: true,
    });
    expect(r.ok).toBe(false);
    expect(r.error).toBe("no_api_key");
    expect(r.sent).toBe(false);
  });
});
