import { z } from "zod";

// Reglas comunes
const email = z
  .string()
  .trim()
  .toLowerCase()
  .max(254, "email_too_long")
  .regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "email_invalid_format");

const nameField = z.string().trim().min(1, "name_required").max(120, "name_too_long");
const whatsappField = z
  .string()
  .trim()
  .max(30, "whatsapp_too_long")
  .regex(/^[+()\-\s0-9]{6,30}$/, "whatsapp_invalid_format")
  .optional();
const shortText = (max: number) => z.string().trim().max(max).optional();
const messageField = z.string().trim().min(1, "message_required").max(3000, "message_too_long");
const boolFalse = z.boolean().default(false);

const consentBlock = z.object({
  consent_communications: z.literal(true, { message: "consent_communications_required" }),
  consent_marketing: boolFalse,
  consent_version: z.string().trim().min(1).max(20),
});

// Meta común
const metaBlock = z.object({
  landing_url: shortText(500),
  referrer: shortText(500),
  utm_source: shortText(150),
  utm_medium: shortText(150),
  utm_campaign: shortText(150),
  session_id: shortText(64),
  // Honeypot: cualquier valor no vacío = bot
  hp_website: shortText(200),
  // Timestamp cliente (para timing check contra bots)
  form_started_at: z.number().int().positive().optional(),
});

// ────────────────────────────────────────────────────────────────────────────
// Schema por source
// ────────────────────────────────────────────────────────────────────────────

const propertyType = z.enum([
  "Apartamento",
  "Casa",
  "Villa",
  "Loft",
  "Estudio",
  "Otro",
]);
const platform = z.enum([
  "Airbnb",
  "Booking",
  "VRBO",
  "Expedia",
  "Otra",
  "Aún no está publicada",
]);
const experience = z.enum(["Ninguna", "Menos de 1 año", "1–3 años", "3+ años"]);
const capital = z.enum([
  "Menos de $10,000",
  "$10,000 – $50,000",
  "$50,000 – $150,000",
  "$150,000 – $500,000",
  "Más de $500,000",
  "Prefiero no responder",
]);

const interestEnum = z.enum([
  "str-rentabilizar",
  "str-administracion",
  "str-preparacion",
  "tax-deed-aprender",
  "tax-deed-oportunidades",
  "entrevista",
  "otro",
]);

export const contactFormSchema = z
  .object({
    source: z.literal("contact_form"),
    interest: interestEnum,
    name: nameField,
    email,
    whatsapp: whatsappField,
    company: shortText(200),
    location: shortText(120),
    propertyType: propertyType.optional(),
    bedrooms: z.union([z.string().trim().max(10), z.number().int().min(0).max(50)]).optional(),
    platform: platform.optional(),
    monthlyIncome: shortText(50),
    startDate: shortText(120),
    experience: experience.optional(),
    capital: capital.optional(),
    timeframe: shortText(120),
    eventType: shortText(120),
    eventDate: shortText(120),
    message: messageField,
  })
  .merge(consentBlock)
  .merge(metaBlock)
  .strict();

export type ContactFormPayload = z.infer<typeof contactFormSchema>;

// Envelope: cualquier source válido → schema estricto correspondiente.
// PR #2 solo implementa 'contact_form'. Los demás se agregan en sus PRs.
export const leadPayloadSchema = z.discriminatedUnion("source", [contactFormSchema]);

export type LeadPayload = z.infer<typeof leadPayloadSchema>;
