import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("@/lib/newsletter-agent/orchestrator", () => ({
  runNewsletterPipeline: vi.fn(async () => ({ ok: true, editionId: "e1", status: "ready_for_review", runId: "r1", draft: { selected: [], candidates: [], rejected: [], subject_es: "", subject_en: "", content_es: "", content_en: "", metadata: { period_start: "", period_end: "" } }, compliance: { ok: true, status: "pass", findings: [] } })),
}));

import { GET as cronGET } from "../src/app/api/cron/newsletter/route";
import { runNewsletterPipeline } from "@/lib/newsletter-agent/orchestrator";

function makeReq(headers: Record<string, string>): Request {
  return new Request("https://x.example/api/cron/newsletter", { headers });
}

const OLD_ENV = { ...process.env };
beforeEach(() => {
  process.env = { ...OLD_ENV };
  vi.clearAllMocks();
});
afterEach(() => {
  process.env = OLD_ENV;
});

describe("cron/newsletter authorization", () => {
  test("rejects when CRON_SECRET missing", async () => {
    delete process.env.CRON_SECRET;
    const res = await cronGET(makeReq({}) as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(401);
  });

  test("rejects when Authorization header does not match", async () => {
    process.env.CRON_SECRET = "s3cret";
    const res = await cronGET(makeReq({ authorization: "Bearer wrong" }) as unknown as import("next/server").NextRequest);
    expect(res.status).toBe(401);
  });

  test("returns skipped when NEWSLETTER_AUTOMATION_ENABLED is not 'true'", async () => {
    process.env.CRON_SECRET = "s3cret";
    delete process.env.NEWSLETTER_AUTOMATION_ENABLED;
    const res = await cronGET(makeReq({ authorization: "Bearer s3cret" }) as unknown as import("next/server").NextRequest);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.skipped).toBe(true);
    expect(json.reason).toBe("automation_disabled");
    expect((runNewsletterPipeline as unknown as { mock: { calls: unknown[] } }).mock.calls.length).toBe(0);
  });

  test("runs pipeline in production_generate when authorized and enabled without auto-send", async () => {
    process.env.CRON_SECRET = "s3cret";
    process.env.NEWSLETTER_AUTOMATION_ENABLED = "true";
    delete process.env.NEWSLETTER_AUTO_SEND;
    const res = await cronGET(makeReq({ authorization: "Bearer s3cret" }) as unknown as import("next/server").NextRequest);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.mode).toBe("production_generate");
    const call = (runNewsletterPipeline as unknown as { mock: { calls: unknown[][] } }).mock.calls[0]?.[0] as { mode: string };
    expect(call.mode).toBe("production_generate");
  });

  test("runs pipeline in autopilot when NEWSLETTER_AUTO_SEND=true", async () => {
    process.env.CRON_SECRET = "s3cret";
    process.env.NEWSLETTER_AUTOMATION_ENABLED = "true";
    process.env.NEWSLETTER_AUTO_SEND = "true";
    const res = await cronGET(makeReq({ authorization: "Bearer s3cret" }) as unknown as import("next/server").NextRequest);
    const json = await res.json();
    expect(json.mode).toBe("autopilot");
    const call = (runNewsletterPipeline as unknown as { mock: { calls: unknown[][] } }).mock.calls[0]?.[0] as { mode: string };
    expect(call.mode).toBe("autopilot");
  });
});
