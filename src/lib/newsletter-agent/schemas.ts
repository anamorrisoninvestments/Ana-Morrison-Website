// JSON Schemas for structured output validation from OpenAI.
// Kept out of TS types file so it can be imported anywhere without pulling
// zod as a runtime dependency (we use manual runtime checks below).

export const candidateStoryJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" },
    category: { type: "string", enum: ["str", "tax_deed"] },
    headline: { type: "string", minLength: 8, maxLength: 200 },
    summary: { type: "string", minLength: 20, maxLength: 800 },
    why_it_matters: { type: "string", minLength: 10, maxLength: 400 },
    practical_takeaway: { type: "string", minLength: 10, maxLength: 300 },
    jurisdiction: { type: ["string", "null"] },
    published_at: { type: ["string", "null"] },
    source_urls: {
      type: "array",
      minItems: 1,
      items: { type: "string", format: "uri" },
    },
    source_quality: {
      type: "string",
      enum: ["primary", "official", "reputable_secondary", "weak"],
    },
    confidence: { type: "number", minimum: 0, maximum: 1 },
    freshness_score: { type: "number", minimum: 0, maximum: 1 },
    relevance_score: { type: "number", minimum: 0, maximum: 1 },
    dedup_key: { type: "string", minLength: 4, maxLength: 200 },
  },
  required: [
    "id","category","headline","summary","why_it_matters","practical_takeaway",
    "jurisdiction","published_at","source_urls","source_quality","confidence",
    "freshness_score","relevance_score","dedup_key",
  ],
} as const;

export const researchOutputJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    candidates: { type: "array", items: candidateStoryJsonSchema, minItems: 0, maxItems: 80 },
  },
  required: ["candidates"],
} as const;

export const editionOutputJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    subject_es: { type: "string", minLength: 5, maxLength: 140 },
    subject_en: { type: "string", minLength: 5, maxLength: 140 },
    content_es: { type: "string", minLength: 200 },
    content_en: { type: "string", minLength: 200 },
    selected_ids: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 10 },
    rejected: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          id: { type: "string" },
          headline: { type: "string" },
          reason: {
            type: "string",
            enum: ["duplicate","low_confidence","no_source","off_topic","unsupported_claim","compliance_risk","weak_source","other"],
          },
          notes: { type: "string" },
        },
        required: ["id","headline","reason"],
      },
    },
  },
  required: ["subject_es","subject_en","content_es","content_en","selected_ids","rejected"],
} as const;
