import { describe, test, beforeEach, expect, vi } from "vitest";

vi.mock("server-only", () => ({}));

// Capturar logs para verificar ausencia de PII/secretos
type LogEntry = { level: string; msg: string; meta?: Record<string, unknown> };
const logs: LogEntry[] = [];

vi.mock("../src/lib/log", () => ({
  log: {
    info: (msg: string, meta?: Record<string, unknown>) => logs.push({ level: "info", msg, meta }),
    warn: (msg: string, meta?: Record<string, unknown>) => logs.push({ level: "warn", msg, meta }),
    error: (msg: string, meta?: Record<string, unknown>) => logs.push({ level: "error", msg, meta }),
  },
}));

import {
  sendLeadNotificationWithDeps,
  type ResendLike,
  type EmailEnv,
} from "../src/lib/email/send-lead-emails";
import type { LeadPayload } from "../src/lib/leads/schema";

const LEAD_ID = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";

const payload: LeadPayload = {
  source: "contact_form",
  interest: "str-rentabilizar",
  name: "TEST UNIT SEND",
  email: "unit-send-test@anamorrison.com",
  whatsapp: "+15555550100",
  message: "unit test message",
  consent_communications: true,
  consent_marketing: false,
  consent_version: "v1.0",
} as LeadPayload;

// ─────────────────────────────────────────────────────────────────────────────
// Mock Supabase capturando updates a leads y inserts a lead_events
// ─────────────────────────────────────────────────────────────────────────────
type SupaCall = { table: string; op: string; args: unknown[] };
let supaCalls: SupaCall[] = [];

let supaUpdateError: { code?: string } | null = null;
let supaInsertError: { code?: string } | null = null;

function makeMockSupabase() {
  return {
    from(table: string) {
      const record = (op: string, args: unknown[]) => supaCalls.push({ table, op, args });
      const builder = {
        _pending: "unknown" as string,
        update(row: unknown) {
          record("update", [row]);
          builder._pending = "update";
          return builder;
        },
        insert(row: unknown) {
          record("insert", [row]);
          builder._pending = "insert";
          return builder;
        },
        eq() {
          return builder;
        },
        then(resolve: (v: unknown) => unknown) {
          if (builder._pending === "update") {
            return Promise.resolve(resolve({ error: supaUpdateError ?? null }));
          }
          if (builder._pending === "insert") {
            return Promise.resolve(resolve({ error: supaInsertError ?? null }));
          }
          return Promise.resolve(resolve({ error: null }));
        },
      };
      return builder;
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers Resend
// ─────────────────────────────────────────────────────────────────────────────
function resendOk(id = "resend-id-123"): () => ResendLike {
  return () => ({
    emails: {
      send: vi.fn(async () => ({ data: { id }, error: null })),
    },
  });
}

function resendError(name = "validation_error"): () => ResendLike {
  return () => ({
    emails: {
      send: vi.fn(async () => ({ data: null, error: { name, message: "boom" } })),
    },
  });
}

function resendThrows(name = "NetworkError"): () => ResendLike {
  return () => ({
    emails: {
      send: vi.fn(async () => {
        const e = new Error("network down");
        e.name = name;
        throw e;
      }),
    },
  });
}

const fullEnv: EmailEnv = {
  RESEND_API_KEY: "test-api-key-should-not-appear-in-logs",
  RESEND_FROM_EMAIL: "Ana Morrison <noreply@anamorrison.com>",
  CONTACT_NOTIFICATION_EMAIL: "internal@anamorrison.com",
};

// Verifica que ningún log contenga PII o secretos.
function assertNoPiiOrSecretsInLogs() {
  const banned = [
    payload.email,
    payload.name,
    payload.whatsapp!,
    fullEnv.RESEND_API_KEY!,
    fullEnv.RESEND_FROM_EMAIL!,
    fullEnv.CONTACT_NOTIFICATION_EMAIL!,
    "network down", // stack / mensajes de error del SDK
  ];
  for (const entry of logs) {
    const serialized = JSON.stringify(entry);
    for (const b of banned) {
      expect(serialized, `log ${entry.msg} contiene "${b}"`).not.toContain(b);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
describe("sendLeadNotificationWithDeps", () => {
  beforeEach(() => {
    logs.length = 0;
    supaCalls = [];
    supaUpdateError = null;
    supaInsertError = null;
  });

  test("sent · Resend acepta el correo, status=sent, log leadEmail.sent", async () => {
    const result = await sendLeadNotificationWithDeps({
      leadId: LEAD_ID,
      payload,
      env: fullEnv,
      resendFactory: resendOk("resend-abc-123"),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      supabase: makeMockSupabase() as any,
    });

    expect(result.status).toBe("sent");
    if (result.status !== "sent") return;
    expect(result.resendEmailId).toBe("resend-abc-123");

    // Actualizó email_confirmation_status='sent' en leads
    const updates = supaCalls.filter((c) => c.table === "leads" && c.op === "update");
    expect(updates.length).toBe(1);
    expect((updates[0].args[0] as { email_confirmation_status: string }).email_confirmation_status).toBe("sent");

    // Registró evento email_sent
    const events = supaCalls.filter((c) => c.table === "lead_events" && c.op === "insert");
    expect(events.length).toBe(1);
    expect((events[0].args[0] as { type: string }).type).toBe("email_sent");

    // Log leadEmail.sent con leadId y resendEmailId
    const sentLog = logs.find((l) => l.msg === "leadEmail.sent");
    expect(sentLog).toBeDefined();
    expect(sentLog!.meta?.leadId).toBe(LEAD_ID);
    expect(sentLog!.meta?.resendEmailId).toBe("resend-abc-123");

    assertNoPiiOrSecretsInLogs();
  });

  test("failed · Resend devuelve error, lead permanece, status=failed, log leadEmail.failed", async () => {
    const result = await sendLeadNotificationWithDeps({
      leadId: LEAD_ID,
      payload,
      env: fullEnv,
      resendFactory: resendError("validation_error"),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      supabase: makeMockSupabase() as any,
    });

    expect(result.status).toBe("failed");

    // lead se conserva (no hay DELETE)
    const deletes = supaCalls.filter((c) => c.table === "leads" && c.op === "delete");
    expect(deletes.length).toBe(0);

    // Status actualizado a 'failed'
    const updates = supaCalls.filter((c) => c.table === "leads" && c.op === "update");
    expect(updates.length).toBe(1);
    expect((updates[0].args[0] as { email_confirmation_status: string }).email_confirmation_status).toBe("failed");

    // Evento email_failed
    const events = supaCalls.filter((c) => c.table === "lead_events" && c.op === "insert");
    expect(events.length).toBe(1);
    expect((events[0].args[0] as { type: string }).type).toBe("email_failed");

    // Log leadEmail.failed solo con errorName + leadId
    const failedLog = logs.find((l) => l.msg === "leadEmail.failed");
    expect(failedLog).toBeDefined();
    expect(failedLog!.meta?.leadId).toBe(LEAD_ID);
    expect(failedLog!.meta?.errorName).toBe("validation_error");

    assertNoPiiOrSecretsInLogs();
  });

  test("failed · Resend throws (excepción de red), captura sin lanzar, status=failed", async () => {
    const result = await sendLeadNotificationWithDeps({
      leadId: LEAD_ID,
      payload,
      env: fullEnv,
      resendFactory: resendThrows("NetworkError"),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      supabase: makeMockSupabase() as any,
    });

    expect(result.status).toBe("failed");

    const updates = supaCalls.filter((c) => c.table === "leads" && c.op === "update");
    expect((updates[0].args[0] as { email_confirmation_status: string }).email_confirmation_status).toBe("failed");

    const failedLog = logs.find((l) => l.msg === "leadEmail.failed");
    expect(failedLog!.meta?.errorName).toBe("NetworkError");

    assertNoPiiOrSecretsInLogs();
  });

  test("skipped · sin RESEND_API_KEY, status=skipped, log leadEmail.skipped, sin llamar a Resend", async () => {
    const noKeyEnv: EmailEnv = { ...fullEnv, RESEND_API_KEY: undefined };
    const factory = resendOk();

    const result = await sendLeadNotificationWithDeps({
      leadId: LEAD_ID,
      payload,
      env: noKeyEnv,
      resendFactory: factory,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      supabase: makeMockSupabase() as any,
    });

    expect(result.status).toBe("skipped");
    if (result.status !== "skipped") return;
    expect(result.reason).toBe("no_api_key");

    // Status actualizado a 'skipped'
    const updates = supaCalls.filter((c) => c.table === "leads" && c.op === "update");
    expect((updates[0].args[0] as { email_confirmation_status: string }).email_confirmation_status).toBe("skipped");

    // Log leadEmail.skipped
    const skipLog = logs.find((l) => l.msg === "leadEmail.skipped");
    expect(skipLog).toBeDefined();
    expect(skipLog!.meta?.leadId).toBe(LEAD_ID);
    expect(skipLog!.meta?.reason).toBe("no_api_key");

    // El log NO debe contener el string vacío como api key ni la real
    for (const entry of logs) {
      expect(JSON.stringify(entry)).not.toContain("test-api-key");
    }
  });

  test("skipped · sin RESEND_FROM_EMAIL, status=skipped, sin llamar a Resend", async () => {
    const noFromEnv: EmailEnv = { ...fullEnv, RESEND_FROM_EMAIL: undefined };

    const result = await sendLeadNotificationWithDeps({
      leadId: LEAD_ID,
      payload,
      env: noFromEnv,
      resendFactory: resendOk(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      supabase: makeMockSupabase() as any,
    });

    expect(result.status).toBe("skipped");
    if (result.status !== "skipped") return;
    expect(result.reason).toBe("no_from_email");

    const updates = supaCalls.filter((c) => c.table === "leads" && c.op === "update");
    expect((updates[0].args[0] as { email_confirmation_status: string }).email_confirmation_status).toBe("skipped");
  });

  test("lead nunca se pierde: fallo de Resend no dispara DELETE ni modifica campos ajenos", async () => {
    await sendLeadNotificationWithDeps({
      leadId: LEAD_ID,
      payload,
      env: fullEnv,
      resendFactory: resendError(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      supabase: makeMockSupabase() as any,
    });

    // Ningún DELETE
    expect(supaCalls.filter((c) => c.op === "delete").length).toBe(0);

    // El único UPDATE es sobre email_confirmation_status/error, no toca name/email/etc.
    const updates = supaCalls.filter((c) => c.table === "leads" && c.op === "update");
    for (const u of updates) {
      const row = u.args[0] as Record<string, unknown>;
      expect(Object.keys(row).sort()).toEqual(
        ["email_confirmation_error", "email_confirmation_status"].sort(),
      );
    }
  });
});
