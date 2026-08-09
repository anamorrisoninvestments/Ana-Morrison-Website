"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type InterestKey =
  | "str-rentabilizar"
  | "str-administracion"
  | "str-preparacion"
  | "tax-deed-aprender"
  | "tax-deed-oportunidades"
  | "entrevista"
  | "otro";

const interests: { key: InterestKey; label: string; description: string; color: "gold" | "blue" }[] = [
  {
    key: "str-rentabilizar",
    label: "Quiero rentabilizar una propiedad",
    description: "Tengo una propiedad y quiero convertirla en alquiler a corto plazo.",
    color: "gold",
  },
  {
    key: "str-administracion",
    label: "Quiero administración STR",
    description: "Necesito que administren profesionalmente mi propiedad STR.",
    color: "gold",
  },
  {
    key: "str-preparacion",
    label: "Quiero preparar y lanzar una propiedad",
    description: "Diseño, amoblado, fotos, listing y puesta en marcha.",
    color: "gold",
  },
  {
    key: "tax-deed-aprender",
    label: "Quiero aprender sobre Tax Deed",
    description: "Formación y educación sobre subastas del condado.",
    color: "blue",
  },
  {
    key: "tax-deed-oportunidades",
    label: "Quiero analizar oportunidades Tax Deed",
    description: "Listado curado de títulos por condado.",
    color: "blue",
  },
  {
    key: "entrevista",
    label: "Invitar a Ana a una entrevista o evento",
    description: "Podcasts, medios, keynotes o eventos corporativos.",
    color: "gold",
  },
  { key: "otro", label: "Otro", description: "Cuéntame de qué se trata.", color: "gold" },
];

const propertyTypes = ["Apartamento", "Casa", "Villa", "Loft", "Estudio", "Otro"];
const platforms = ["Airbnb", "Booking", "VRBO", "Expedia", "Otra", "Aún no está publicada"];
const investmentExperience = ["Ninguna", "Menos de 1 año", "1–3 años", "3+ años"];
const investmentCapital = [
  "Menos de $10,000",
  "$10,000 – $50,000",
  "$50,000 – $150,000",
  "$150,000 – $500,000",
  "Más de $500,000",
  "Prefiero no responder",
];

type FormState = "idle" | "loading" | "success" | "error";

const INTEREST_MAP: Record<string, InterestKey> = {
  str: "str-rentabilizar",
  "str-rentabilizar": "str-rentabilizar",
  "str-administracion": "str-administracion",
  "str-preparacion": "str-preparacion",
  "tax-deed": "tax-deed-oportunidades",
  "tax-deed-aprender": "tax-deed-aprender",
  "tax-deed-oportunidades": "tax-deed-oportunidades",
  "host-circle": "tax-deed-aprender",
  entrevista: "entrevista",
  otro: "otro",
};

function ContactFormInner({ locale = "es" }: { locale?: "es" | "en" }) {
  const searchParams = useSearchParams();
  const initialInteres = searchParams.get("interes");
  const initialSelected = initialInteres ? INTEREST_MAP[initialInteres] ?? null : null;
  const isEN = locale === "en";
  const L = {
    step1Title: isEN ? "How can we help you?" : "¿Cómo podemos ayudarte?",
    step1Subtitle: isEN ? "Pick the option that best describes your situation and I'll show you the right form." : "Elige la opción que mejor describe tu momento y te mostraré el formulario adecuado.",
    successTitle: isEN ? "Message received!" : "¡Mensaje recibido!",
    successBody: isEN ? "I'll respond within 24 business hours. In the meantime, follow me on Instagram for more content." : "Te respondo en menos de 24 horas hábiles. Mientras tanto, sígueme en Instagram para más contenido.",
    successMore: isEN ? "Send another message" : "Enviar otro mensaje",
    selectedLabel: isEN ? "Selected Form" : "Formulario Seleccionado",
    change: isEN ? "Change" : "Cambiar",
    fldName: isEN ? "Name *" : "Nombre *",
    fldNamePh: isEN ? "Your full name" : "Tu nombre completo",
    fldEmail: isEN ? "Email *" : "Email *",
    fldWA: isEN ? "WhatsApp *" : "WhatsApp *",
    fldWAPh: "+1 (786) 000-0000",
    fldCompany: isEN ? "Media / Company" : "Medio / Empresa",
    fldCompanyPh: isEN ? "Name of podcast, media outlet, or company" : "Nombre del podcast, medio o empresa",
    fldLocSTR: isEN ? "Property city" : "Ciudad de la propiedad",
    fldLocSTRPh: isEN ? "e.g., Miami, FL" : "Ej: Miami, FL",
    fldLocGeneric: isEN ? "City / State / County of interest" : "Ciudad / Estado / Condado de interés",
    fldLocGenericPh: isEN ? "e.g., Miami-Dade, FL" : "Ej: Miami-Dade, FL",
    submit: isEN ? "Send message" : "Enviar mensaje",
    submitting: isEN ? "Sending..." : "Enviando...",
    errRate: isEN ? "Too many requests. Please try again in a minute." : "Demasiadas solicitudes. Intenta de nuevo en un minuto.",
    errInvalid: isEN ? "Please review the fields: something is invalid." : "Revisa los campos: algún valor no es válido.",
    errGeneric: isEN ? "Something went wrong. Please try again in a few minutes." : "Ocurrió un error. Intenta de nuevo en unos minutos.",
    errNetwork: isEN ? "Connection error. Check your internet." : "Error de conexión. Verifica tu internet.",
    consent: isEN
      ? "By submitting, I agree that AnaMaría Morrison may contact me and that my data will be processed per the Privacy Policy."
      : "Al enviar, acepto que AnaMaría Morrison pueda contactarme y que se procesen mis datos según la Política de Privacidad.",
  };

  const [selected, setSelected] = useState<InterestKey | null>(initialSelected);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formStartedAt] = useState<number>(() => Date.now());
  const CONSENT_VERSION = process.env.NEXT_PUBLIC_CONSENT_VERSION || "v1.0";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return; // evita doble click / doble submit
    setState("loading");
    setErrorMsg("");
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form));

    const payload = {
      source: "contact_form" as const,
      locale,
      interest: selected || "otro",
      name: String(raw.name || ""),
      email: String(raw.email || ""),
      whatsapp: raw.whatsapp ? String(raw.whatsapp) : undefined,
      company: raw.company ? String(raw.company) : undefined,
      location: raw.location ? String(raw.location) : undefined,
      propertyType: raw.propertyType ? String(raw.propertyType) : undefined,
      bedrooms: raw.bedrooms ? String(raw.bedrooms) : undefined,
      platform: raw.platform ? String(raw.platform) : undefined,
      monthlyIncome: raw.monthlyIncome ? String(raw.monthlyIncome) : undefined,
      startDate: raw.startDate ? String(raw.startDate) : undefined,
      experience: raw.experience ? String(raw.experience) : undefined,
      capital: raw.capital ? String(raw.capital) : undefined,
      timeframe: raw.timeframe ? String(raw.timeframe) : undefined,
      eventType: raw.eventType ? String(raw.eventType) : undefined,
      eventDate: raw.eventDate ? String(raw.eventDate) : undefined,
      message: String(raw.message || ""),
      consent_communications: Boolean(raw.consent),
      consent_marketing: false,
      consent_version: CONSENT_VERSION,
      landing_url: typeof window !== "undefined" ? window.location.href : undefined,
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
      hp_website: raw.hp_website ? String(raw.hp_website) : undefined,
      form_started_at: formStartedAt,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        if (res.status === 429) {
          setErrorMsg(L.errRate);
        } else if (json.error === "invalid_input") {
          setErrorMsg(L.errInvalid);
        } else {
          setErrorMsg(L.errGeneric);
        }
        setState("error");
      }
    } catch {
      setErrorMsg(L.errNetwork);
      setState("error");
    }
  }

  const interestsForLocale = isEN
    ? interests.map((it) => {
        const map: Record<InterestKey, { label: string; description: string }> = {
          "str-rentabilizar": { label: "I want to improve my property's performance", description: "I own a property and want to operate it as a short-term rental." },
          "str-administracion": { label: "I want professional STR management", description: "I need professional management of my STR property." },
          "str-preparacion": { label: "I want to prepare and launch a property", description: "Design, furnishing, photos, listing, and go-live." },
          "tax-deed-aprender": { label: "I want to learn about Tax Deed", description: "Education about county tax deed auctions." },
          "tax-deed-oportunidades": { label: "I want to evaluate Tax Deed opportunities", description: "1:1 consultation about county auctions." },
          entrevista: { label: "Invite AnaMaría to an interview or event", description: "Podcasts, media, keynotes, or corporate events." },
          otro: { label: "Other", description: "Tell me what it's about." },
        };
        return { ...it, ...map[it.key] };
      })
    : interests;

  if (state === "success") {
    return (
      <div className="p-10 rounded-2xl border border-[#C8A45D]/40 bg-[#C8A45D]/5 text-center">
        <div className="text-4xl mb-4 text-[#C8A45D]">✓</div>
        <h3 className="text-[#C8A45D] font-bold text-xl mb-2 heading-serif">{L.successTitle}</h3>
        <p className="text-[#F7F3EC]/70 text-sm mb-6">{L.successBody}</p>
        <button
          onClick={() => {
            setState("idle");
            setSelected(null);
          }}
          className="text-[#C8A45D] text-sm underline"
        >
          {L.successMore}
        </button>
      </div>
    );
  }

  // Step 1: choose interest
  if (!selected) {
    return (
      <div>
        <h2 className="heading-serif text-2xl text-[#F7F3EC] mb-2">{L.step1Title}</h2>
        <p className="text-[#F7F3EC]/60 text-sm mb-6">{L.step1Subtitle}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {interestsForLocale.map((it) => (
            <button
              key={it.key}
              onClick={() => setSelected(it.key)}
              className={`text-left p-5 rounded-2xl border transition-all bg-[#1C1916] hover:bg-[#1C1916]/70 ${
                it.color === "blue"
                  ? "border-[#22AEEF]/25 hover:border-[#22AEEF]/60"
                  : "border-[#C8A45D]/25 hover:border-[#C8A45D]/60"
              }`}
            >
              <p
                className={`text-sm font-semibold mb-1 ${
                  it.color === "blue" ? "text-[#22AEEF]" : "text-[#C8A45D]"
                }`}
              >
                {it.label}
              </p>
              <p className="text-[#F7F3EC]/60 text-xs leading-relaxed">{it.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const current = interestsForLocale.find((i) => i.key === selected)!;
  const isSTRProperty =
    selected === "str-rentabilizar" ||
    selected === "str-administracion" ||
    selected === "str-preparacion";
  const isTaxDeed = selected === "tax-deed-aprender" || selected === "tax-deed-oportunidades";
  const isInterview = selected === "entrevista";

  const accent = current.color === "blue" ? "#22AEEF" : "#C8A45D";
  const accentHover = current.color === "blue" ? "#22AEEF" : "#E2C98A";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot oculto — un humano no lo ve. Los bots lo rellenan. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <label>
          Website
          <input type="text" name="hp_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <p
            className="text-xs tracking-widest uppercase font-semibold mb-1"
            style={{ color: accent }}
          >
            {L.selectedLabel}
          </p>
          <p className="text-[#F7F3EC] text-base heading-serif">{current.label}</p>
        </div>
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="text-[#888888] text-xs underline hover:text-[#F7F3EC] flex-shrink-0"
        >
          {L.change}
        </button>
      </div>

      {/* Campos comunes */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={L.fldName} name="name" required placeholder={L.fldNamePh} />
        <Field label={L.fldEmail} name="email" type="email" required placeholder="you@email.com" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={L.fldWA} name="whatsapp" type="tel" required placeholder={L.fldWAPh} />
        {isInterview ? (
          <Field label={L.fldCompany} name="company" placeholder={L.fldCompanyPh} />
        ) : (
          <Field
            label={isSTRProperty ? L.fldLocSTR : L.fldLocGeneric}
            name="location"
            required
            placeholder={isSTRProperty ? L.fldLocSTRPh : L.fldLocGenericPh}
          />
        )}
      </div>

      {/* Campos condicionales STR */}
      {isSTRProperty && (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label={isEN ? "Property type" : "Tipo de propiedad"} name="propertyType" options={propertyTypes} placeholder={isEN ? "Select" : "Selecciona"} />
            <Field label={isEN ? "Bedrooms" : "Habitaciones"} name="bedrooms" type="number" placeholder={isEN ? "e.g., 2" : "Ej: 2"} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select
              label={isEN ? "Already listed?" : "¿Ya está publicada?"}
              name="platform"
              options={platforms}
              placeholder={isEN ? "Select an option" : "Selecciona una opción"}
            />
            <Field
              label={isEN ? "Approximate monthly income" : "Ingreso mensual aproximado"}
              name="monthlyIncome"
              placeholder={isEN ? "Optional · USD" : "Opcional · USD"}
            />
          </div>
          <Field
            label={isEN ? "Estimated start date" : "Fecha estimada para comenzar"}
            name="startDate"
            placeholder={isEN ? "e.g., in 1 month, next 3 months, now" : "Ej: en 1 mes, próximos 3 meses, ya"}
          />
        </>
      )}

      {/* Campos condicionales Tax Deed */}
      {isTaxDeed && (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select
              label={isEN ? "Prior experience" : "Experiencia previa"}
              name="experience"
              options={investmentExperience}
              placeholder={isEN ? "Select" : "Selecciona"}
            />
            <Select
              label={isEN ? "Capital allocated (segmentation, not exclusion)" : "Capital destinado (segmentación, no exclusión)"}
              name="capital"
              options={investmentCapital}
              placeholder={isEN ? "Select" : "Selecciona"}
            />
          </div>
          <Field
            label={isEN ? "Estimated investment timeframe" : "Plazo estimado para invertir"}
            name="timeframe"
            placeholder={isEN ? "e.g., 30 days, 3 months, exploring" : "Ej: en 30 días, 3 meses, explorando"}
          />
        </>
      )}

      {/* Campos condicionales Entrevista */}
      {isInterview && (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label={isEN ? "Event type" : "Tipo de evento"} name="eventType" placeholder={isEN ? "Podcast, event, keynote, etc." : "Podcast, evento, keynote, etc."} />
          <Field label={isEN ? "Estimated date" : "Fecha estimada"} name="eventDate" placeholder={isEN ? "Optional" : "Opcional"} />
        </div>
      )}

      <div>
        <label className="block text-[#888888] text-xs tracking-widest uppercase mb-2">{isEN ? "Message *" : "Mensaje *"}</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full bg-[#111111] border border-[#C8A45D]/30 focus:border-[#C8A45D] text-[#F7F3EC] px-4 py-3 text-sm outline-none transition-colors resize-none rounded-lg"
          placeholder={
            isTaxDeed
              ? isEN ? "Tell me what you're looking for: education, evaluating specific opportunities, etc." : "Cuéntame qué buscas: aprender, filtrar oportunidades específicas, etc."
              : isSTRProperty
              ? isEN ? "Tell me about your property, your goal, and any relevant details." : "Cuéntame de tu propiedad, tu objetivo y cualquier detalle relevante."
              : isInterview
              ? isEN ? "Tell me about the format, audience, date, and topics you'd like to cover." : "Cuéntame del formato, la audiencia, la fecha y qué te gustaría abordar."
              : isEN ? "Tell me how I can help you." : "Cuéntame en qué puedo ayudarte."
          }
        />
      </div>

      <label className="flex items-start gap-3 text-xs text-[#F7F3EC]/60">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 accent-[#C8A45D]"
        />
        <span>{L.consent}</span>
      </label>

      {state === "error" && (
        <p className="text-red-400 text-sm border border-red-400/30 rounded-lg px-4 py-3">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        style={{ backgroundColor: accent }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = accentHover)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = accent)}
        className="w-full px-8 py-4 rounded-full text-black font-bold tracking-widest uppercase text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "loading" ? L.submitting : L.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[#888888] text-xs tracking-widest uppercase mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-[#111111] border border-[#C8A45D]/30 focus:border-[#C8A45D] text-[#F7F3EC] px-4 py-3 text-sm outline-none transition-colors rounded-lg"
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  placeholder = "Selecciona",
}: {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[#888888] text-xs tracking-widest uppercase mb-2">{label}</label>
      <select
        name={name}
        defaultValue=""
        className="w-full bg-[#111111] border border-[#C8A45D]/30 focus:border-[#C8A45D] text-[#F7F3EC] px-4 py-3 text-sm outline-none transition-colors appearance-none cursor-pointer rounded-lg"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

type ContactFormProps = { locale?: "es" | "en" };

export default function ContactForm({ locale = "es" }: ContactFormProps) {
  return (
    <Suspense fallback={<div className="text-[#888888] text-sm">{locale === "en" ? "Loading form..." : "Cargando formulario..."}</div>}>
      <ContactFormInner locale={locale} />
    </Suspense>
  );
}
