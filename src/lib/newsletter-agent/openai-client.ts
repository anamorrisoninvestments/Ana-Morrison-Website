import "server-only";
import OpenAI from "openai";
import { log } from "@/lib/log";

let cached: OpenAI | null = null;

export function getOpenAI(): OpenAI | null {
  if (cached) return cached;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  cached = new OpenAI({ apiKey });
  return cached;
}

export const NEWSLETTER_MODEL = process.env.NEWSLETTER_OPENAI_MODEL || "gpt-5.1";

// Extract JSON text from a Responses API result. Prefers structured output.
export function extractResponseText(response: unknown): string {
  const r = response as { output_text?: string; output?: unknown };
  if (typeof r.output_text === "string" && r.output_text.trim().length > 0) {
    return r.output_text;
  }
  // Fallback: walk the output array for the first text part
  if (Array.isArray(r.output)) {
    for (const item of r.output as Array<{ content?: Array<{ type?: string; text?: string }> }>) {
      if (item?.content) {
        for (const part of item.content) {
          if (part.type === "output_text" && typeof part.text === "string") return part.text;
        }
      }
    }
  }
  log.warn("newsletter.openai.no_text_in_response");
  return "";
}

// Safe JSON parse that never throws.
export function safeJson<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    // Try to recover a JSON object embedded in prose (best-effort).
    const match = text.match(/\{[\s\S]*\}$/);
    if (match) {
      try { return JSON.parse(match[0]) as T; } catch { return null; }
    }
    return null;
  }
}
