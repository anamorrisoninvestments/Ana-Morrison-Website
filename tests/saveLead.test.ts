import { describe, test, beforeEach, expect, vi } from "vitest";

// Silenciar server-only en Node
vi.mock("server-only", () => ({}));

import { saveLeadWithClient } from "../src/lib/leads/save";
import type { LeadPayload } from "../src/lib/leads/schema";

type Call = { table: string; op: string; args: unknown[] };
let calls: Call[] = [];

type State = {
  existingLeadId: string | null;
  insertLeadReturnsId: string;
  insertLeadError: { code?: string } | null;
  insertEventError: { code?: string } | null;
  deleteError: { code?: string } | null;
};

let state: State;

/**
 * Cliente Supabase mockeado. Solo implementa las operaciones que save.ts usa.
 */
function makeMockClient() {
  return {
    from(table: string) {
      const record = (op: string, args: unknown[]) => calls.push({ table, op, args });

      // Builder chainable — cada método devuelve el builder salvo los terminales
      const builder = {
        _pending: "unknown" as string,

        select() { return builder; },
        eq() { return builder; },
        gte() { return builder; },
        limit() { return builder; },
        single() { return builder; },

        async maybeSingle() {
          if (table === "leads") {
            record("dedup_query", []);
            return { data: state.existingLeadId ? { id: state.existingLeadId } : null, error: null };
          }
          return { data: null, error: null };
        },

        insert(row: unknown) {
          record("insert", [row]);
          if (table === "leads") builder._pending = "insert-lead";
          else if (table === "lead_events") builder._pending = "insert-event";
          return builder;
        },

        delete() {
          builder._pending = "delete";
          return builder;
        },

        // Esta es la magia: hace al builder awaitable
        then(resolve: (v: unknown) => unknown) {
          if (table === "leads" && builder._pending === "insert-lead") {
            if (state.insertLeadError) {
              return Promise.resolve(resolve({ data: null, error: state.insertLeadError }));
            }
            return Promise.resolve(
              resolve({ data: { id: state.insertLeadReturnsId }, error: null }),
            );
          }
          if (table === "lead_events" && builder._pending === "insert-event") {
            return Promise.resolve(
              resolve({ data: null, error: state.insertEventError ?? null }),
            );
          }
          if (table === "leads" && builder._pending === "delete") {
            record("delete_executed", []);
            return Promise.resolve(resolve({ data: null, error: state.deleteError ?? null }));
          }
          return Promise.resolve(resolve({ data: null, error: null }));
        },
      };
      return builder;
    },
  };
}

const basePayload: LeadPayload = {
  source: "contact_form",
  interest: "str-rentabilizar",
  name: "TEST UNIT",
  email: "unit-test@anamorrison.com",
  message: "unit test message",
  consent_communications: true,
  consent_marketing: false,
  consent_version: "v1.0",
} as LeadPayload;

describe("saveLeadWithClient", () => {
  beforeEach(() => {
    calls = [];
    state = {
      existingLeadId: null,
      insertLeadReturnsId: "00000000-0000-0000-0000-000000000001",
      insertLeadError: null,
      insertEventError: null,
      deleteError: null,
    };
  });

  test("lead válido crea 1 lead y exactamente 1 lead_event form_submitted", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await saveLeadWithClient(makeMockClient() as any, basePayload);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.storage).toBe("supabase");
    expect(result.deduped).toBe(false);
    expect(result.id).toBe("00000000-0000-0000-0000-000000000001");

    const leadInserts = calls.filter((c) => c.table === "leads" && c.op === "insert");
    const eventInserts = calls.filter((c) => c.table === "lead_events" && c.op === "insert");

    expect(leadInserts.length).toBe(1);
    expect(eventInserts.length).toBe(1);

    const eventRow = eventInserts[0].args[0] as {
      lead_id: string;
      type: string;
      payload: { source: string; interest: string; dedup: boolean };
    };
    expect(eventRow.lead_id).toBe(result.id);
    expect(eventRow.type).toBe("form_submitted");
    expect(eventRow.payload.dedup).toBe(false);
    expect(eventRow.payload.source).toBe("contact_form");

    // Payload NO debe contener PII
    const payloadKeys = Object.keys(eventRow.payload);
    expect(payloadKeys).not.toContain("name");
    expect(payloadKeys).not.toContain("email");
    expect(payloadKeys).not.toContain("whatsapp");
    expect(payloadKeys).not.toContain("company");
    expect(payloadKeys).not.toContain("message");
  });

  test("doble envío dentro de la ventana dedup no crea lead ni evento nuevo", async () => {
    state.existingLeadId = "existing-lead-uuid";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await saveLeadWithClient(makeMockClient() as any, basePayload);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.id).toBe("existing-lead-uuid");
    expect(result.deduped).toBe(true);

    const leadInserts = calls.filter((c) => c.table === "leads" && c.op === "insert");
    const eventInserts = calls.filter((c) => c.table === "lead_events" && c.op === "insert");

    expect(leadInserts.length).toBe(0);
    expect(eventInserts.length).toBe(0);
  });

  test("si falla el insert del event, se ejecuta DELETE compensatorio y responde error", async () => {
    state.insertEventError = { code: "42P01" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await saveLeadWithClient(makeMockClient() as any, basePayload);

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toBe("internal_error");

    const leadInserts = calls.filter((c) => c.table === "leads" && c.op === "insert");
    const eventInserts = calls.filter((c) => c.table === "lead_events" && c.op === "insert");
    const deleteCalls = calls.filter((c) => c.table === "leads" && c.op === "delete_executed");

    expect(leadInserts.length).toBe(1);
    expect(eventInserts.length).toBe(1);
    expect(deleteCalls.length).toBe(1);
  });

  test("si el insert del lead falla, no se intenta insertar el event", async () => {
    state.insertLeadError = { code: "23505" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await saveLeadWithClient(makeMockClient() as any, basePayload);

    expect(result.ok).toBe(false);
    const eventInserts = calls.filter((c) => c.table === "lead_events" && c.op === "insert");
    expect(eventInserts.length).toBe(0);
  });

  test("si el cliente es null (env sin configurar), devuelve error sin lanzar", async () => {
    const result = await saveLeadWithClient(null, basePayload);
    expect(result.ok).toBe(false);
    expect(calls.length).toBe(0);
  });
});
