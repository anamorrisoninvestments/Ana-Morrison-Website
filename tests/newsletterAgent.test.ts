import { describe, test, expect, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { validateCandidate, validateBilingualParity, scanForbiddenPhrases, normalizeDedupKey } from "../src/lib/newsletter-agent/validate";
import { runCompliance } from "../src/lib/newsletter-agent/pipeline";
import { SAMPLE_CANDIDATES, SAMPLE_DRAFT } from "../src/lib/newsletter-agent/sample-data";

describe("validateCandidate", () => {
  test("accepts a well-formed candidate", () => {
    const r = validateCandidate(SAMPLE_CANDIDATES[0]);
    expect(r.ok).toBe(true);
  });

  test("rejects missing source_urls", () => {
    const bad = { ...SAMPLE_CANDIDATES[0], source_urls: [] };
    const r = validateCandidate(bad);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe("source_urls_empty");
  });

  test("rejects invalid category", () => {
    const bad = { ...SAMPLE_CANDIDATES[0], category: "unknown" };
    const r = validateCandidate(bad);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe("category");
  });

  test("rejects out-of-range confidence", () => {
    const bad = { ...SAMPLE_CANDIDATES[0], confidence: 1.5 };
    const r = validateCandidate(bad);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe("confidence");
  });

  test("rejects non-http source URL", () => {
    const bad = { ...SAMPLE_CANDIDATES[0], source_urls: ["javascript:alert(1)"] };
    const r = validateCandidate(bad);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe("source_urls_invalid");
  });

  test("normalizes dedup_key", () => {
    const r = validateCandidate({ ...SAMPLE_CANDIDATES[0], dedup_key: "  Airbnb!! Product //v3  " });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.dedup_key).toBe("airbnb-product-v3");
  });
});

describe("normalizeDedupKey", () => {
  test("collapses non-alphanumeric characters", () => {
    expect(normalizeDedupKey("Foo // BAR-baz.qux 2026")).toBe("foo-bar-baz-qux-2026");
  });
  test("trims to 200 chars max", () => {
    const k = "x".repeat(300);
    expect(normalizeDedupKey(k).length).toBe(200);
  });
});

describe("scanForbiddenPhrases", () => {
  test("catches guarantee language (EN)", () => {
    expect(scanForbiddenPhrases("This is a guaranteed return.")).toContain("guarantee_language");
  });
  test("catches risk-free (EN)", () => {
    expect(scanForbiddenPhrases("Almost risk-free strategy.")).toContain("risk_free");
  });
  test("catches clear title (EN)", () => {
    expect(scanForbiddenPhrases("You will receive a clear title.")).toContain("clear_title_absolute");
  });
  test("catches guarantee language (ES)", () => {
    expect(scanForbiddenPhrases("Rendimientos garantizados en 6 meses.")).toContain("guaranteed_returns_es");
  });
  test("passes clean copy", () => {
    expect(scanForbiddenPhrases("Educational content only. Consult professionals.")).toEqual([]);
  });
});

describe("validateBilingualParity", () => {
  test("accepts SAMPLE_DRAFT parity", () => {
    const r = validateBilingualParity(SAMPLE_DRAFT.content_es, SAMPLE_DRAFT.content_en);
    expect(r.ok).toBe(true);
  });
  test("rejects too-short content", () => {
    const r = validateBilingualParity("short", "short");
    expect(r.ok).toBe(false);
  });
  test("rejects severe length asymmetry", () => {
    const es = "Este es un texto muy largo ".repeat(100) + " short-term rental tax deed subasta alquiler";
    const en = "short-term rental tax deed county auction";
    const r = validateBilingualParity(es, en);
    expect(r.ok).toBe(false);
  });
  test("rejects missing pillar labels", () => {
    const noPillar = "Lorem ipsum dolor sit amet consectetur adipiscing elit ".repeat(10);
    const r = validateBilingualParity(noPillar, noPillar);
    expect(r.ok).toBe(false);
  });
});

describe("runCompliance", () => {
  test("passes SAMPLE_DRAFT", () => {
    const c = runCompliance(SAMPLE_DRAFT);
    expect(c.ok).toBe(true);
    expect(c.status).toBe("pass");
  });

  test("fails when a forbidden phrase appears", () => {
    const bad = { ...SAMPLE_DRAFT, content_en: SAMPLE_DRAFT.content_en + " Guaranteed returns for all subscribers." };
    const c = runCompliance(bad);
    expect(c.ok).toBe(false);
    expect(c.status).toBe("fail");
    expect(c.findings.some((f) => f.includes("guarantee"))).toBe(true);
  });

  test("fails when a selected story's source URL is not embedded in the body", () => {
    const draft = {
      ...SAMPLE_DRAFT,
      content_es: SAMPLE_DRAFT.content_es.replace(/https:\/\/news\.airbnb\.com\//g, "[stripped]"),
      content_en: SAMPLE_DRAFT.content_en.replace(/https:\/\/news\.airbnb\.com\//g, "[stripped]"),
    };
    const c = runCompliance(draft);
    expect(c.ok).toBe(false);
    expect(c.findings.some((f) => f.startsWith("missing_source_link"))).toBe(true);
  });

  test("fails when Tax Deed disclaimer is missing", () => {
    const draft = {
      ...SAMPLE_DRAFT,
      content_es: SAMPLE_DRAFT.content_es.replace(/Aviso educativo[\s\S]*/g, ""),
      content_en: SAMPLE_DRAFT.content_en.replace(/Educational disclaimer[\s\S]*/g, ""),
    };
    const c = runCompliance(draft);
    expect(c.ok).toBe(false);
    expect(c.findings.some((f) => f.includes("missing_tax_deed_disclaimer"))).toBe(true);
  });

  test("fails when public name is missing", () => {
    const draft = {
      ...SAMPLE_DRAFT,
      content_en: SAMPLE_DRAFT.content_en.replace(/AnaMaría Morrison/g, "Some Author"),
    };
    const c = runCompliance(draft);
    expect(c.findings).toContain("en:missing_public_name");
  });
});
