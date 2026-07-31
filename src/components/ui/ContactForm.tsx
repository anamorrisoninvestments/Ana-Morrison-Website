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

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialInteres = searchParams.get("interes");
  const initialSelected = initialInteres ? INTEREST_MAP[initialInteres] ?? null : null;

  const [selected, setSelected] = useState<InterestKey | null>(initialSelected);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    data.interest = selected || "otro";
    data.interestLabel = interests.find((i) => i.key === selected)?.label || "Otro";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json.message || "Ocurrió un error. Intenta de nuevo.");
        setState("error");
      }
    } catch {
      setErrorMsg("Error de conexión. Verifica tu internet.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="p-10 rounded-2xl border border-[#C8A45D]/40 bg-[#C8A45D]/5 text-center">
        <div className="text-4xl mb-4 text-[#C8A45D]">✓</div>
        <h3 className="text-[#C8A45D] font-bold text-xl mb-2 heading-serif">¡Mensaje recibido!</h3>
        <p className="text-[#F7F3EC]/70 text-sm mb-6">
          Te respondo en menos de 24 horas hábiles. Mientras tanto, sígueme en Instagram para más contenido.
        </p>
        <button
          onClick={() => {
            setState("idle");
            setSelected(null);
          }}
          className="text-[#C8A45D] text-sm underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  // Step 1: choose interest
  if (!selected) {
    return (
      <div>
        <h2 className="heading-serif text-2xl text-[#F7F3EC] mb-2">¿Cómo podemos ayudarte?</h2>
        <p className="text-[#F7F3EC]/60 text-sm mb-6">
          Elige la opción que mejor describe tu momento y te mostraré el formulario adecuado.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {interests.map((it) => (
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

  const current = interests.find((i) => i.key === selected)!;
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
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <p
            className="text-xs tracking-widest uppercase font-semibold mb-1"
            style={{ color: accent }}
          >
            Formulario Seleccionado
          </p>
          <p className="text-[#F7F3EC] text-base heading-serif">{current.label}</p>
        </div>
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="text-[#888888] text-xs underline hover:text-[#F7F3EC] flex-shrink-0"
        >
          Cambiar
        </button>
      </div>

      {/* Campos comunes */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nombre *" name="name" required placeholder="Tu nombre completo" />
        <Field label="Email *" name="email" type="email" required placeholder="tu@email.com" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="WhatsApp *" name="whatsapp" type="tel" required placeholder="+1 (786) 000-0000" />
        {isInterview ? (
          <Field label="Medio / Empresa" name="company" placeholder="Nombre del podcast, medio o empresa" />
        ) : (
          <Field
            label={isSTRProperty ? "Ciudad de la propiedad" : "Ciudad / Estado / Condado de interés"}
            name="location"
            required
            placeholder={isSTRProperty ? "Ej: Miami, FL" : "Ej: Miami-Dade, FL"}
          />
        )}
      </div>

      {/* Campos condicionales STR */}
      {isSTRProperty && (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="Tipo de propiedad" name="propertyType" options={propertyTypes} />
            <Field label="Habitaciones" name="bedrooms" type="number" placeholder="Ej: 2" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select
              label="¿Ya está publicada?"
              name="platform"
              options={platforms}
              placeholder="Selecciona una opción"
            />
            <Field
              label="Ingreso mensual aproximado"
              name="monthlyIncome"
              placeholder="Opcional · USD"
            />
          </div>
          <Field
            label="Fecha estimada para comenzar"
            name="startDate"
            placeholder="Ej: en 1 mes, próximos 3 meses, ya"
          />
        </>
      )}

      {/* Campos condicionales Tax Deed */}
      {isTaxDeed && (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select
              label="Experiencia previa"
              name="experience"
              options={investmentExperience}
              placeholder="Selecciona"
            />
            <Select
              label="Capital destinado (segmentación, no exclusión)"
              name="capital"
              options={investmentCapital}
              placeholder="Selecciona"
            />
          </div>
          <Field
            label="Plazo estimado para invertir"
            name="timeframe"
            placeholder="Ej: en 30 días, 3 meses, explorando"
          />
        </>
      )}

      {/* Campos condicionales Entrevista */}
      {isInterview && (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Tipo de evento" name="eventType" placeholder="Podcast, evento, keynote, etc." />
          <Field label="Fecha estimada" name="eventDate" placeholder="Opcional" />
        </div>
      )}

      <div>
        <label className="block text-[#888888] text-xs tracking-widest uppercase mb-2">Mensaje *</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full bg-[#111111] border border-[#C8A45D]/30 focus:border-[#C8A45D] text-[#F7F3EC] px-4 py-3 text-sm outline-none transition-colors resize-none rounded-lg"
          placeholder={
            isTaxDeed
              ? "Cuéntame qué buscas: aprender, filtrar oportunidades específicas, etc."
              : isSTRProperty
              ? "Cuéntame de tu propiedad, tu objetivo y cualquier detalle relevante."
              : isInterview
              ? "Cuéntame del formato, la audiencia, la fecha y qué te gustaría abordar."
              : "Cuéntame en qué puedo ayudarte."
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
        <span>
          Acepto que Ana Morrison me contacte por email, WhatsApp o teléfono en relación a esta
          consulta. Sin spam, nunca.
        </span>
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
        {state === "loading" ? "Enviando..." : "Enviar Mensaje"}
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

export default function ContactForm() {
  return (
    <Suspense fallback={<div className="text-[#888888] text-sm">Cargando formulario...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
