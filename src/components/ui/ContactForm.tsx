"use client";

import { useState } from "react";

const consultTypes = [
  "Conferencia / Keynote",
  "Evento Corporativo",
  "Mentoría 1:1",
  "Co-Hosting / Administración",
  "Tax Deeds / Inversión",
  "Colaboración",
  "Medios / Prensa",
  "Otro",
];

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
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
      <div className="p-10 border border-[#C8A45D]/40 bg-[#C8A45D]/5 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-[#C8A45D] font-bold text-xl mb-2">¡Mensaje recibido!</h3>
        <p className="text-[#F7F3EC]/70 text-sm">Te respondo en menos de 24 horas. Mientras tanto, sígueme en Instagram para más contenido.</p>
        <button onClick={() => setState("idle")} className="mt-6 text-[#C8A45D] text-sm underline">
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[#888888] text-xs tracking-widest uppercase mb-2">Nombre *</label>
          <input
            type="text"
            name="name"
            required
            className="w-full bg-[#111111] border border-[#C8A45D]/30 focus:border-[#C8A45D] text-[#F7F3EC] px-4 py-3 text-sm outline-none transition-colors"
            placeholder="Tu nombre completo"
          />
        </div>
        <div>
          <label className="block text-[#888888] text-xs tracking-widest uppercase mb-2">Email *</label>
          <input
            type="email"
            name="email"
            required
            className="w-full bg-[#111111] border border-[#C8A45D]/30 focus:border-[#C8A45D] text-[#F7F3EC] px-4 py-3 text-sm outline-none transition-colors"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[#888888] text-xs tracking-widest uppercase mb-2">WhatsApp</label>
          <input
            type="tel"
            name="whatsapp"
            className="w-full bg-[#111111] border border-[#C8A45D]/30 focus:border-[#C8A45D] text-[#F7F3EC] px-4 py-3 text-sm outline-none transition-colors"
            placeholder="+1 (786) 000-0000"
          />
        </div>
        <div>
          <label className="block text-[#888888] text-xs tracking-widest uppercase mb-2">Empresa / Organización</label>
          <input
            type="text"
            name="company"
            className="w-full bg-[#111111] border border-[#C8A45D]/30 focus:border-[#C8A45D] text-[#F7F3EC] px-4 py-3 text-sm outline-none transition-colors"
            placeholder="Nombre de tu empresa"
          />
        </div>
      </div>

      <div>
        <label className="block text-[#888888] text-xs tracking-widest uppercase mb-2">Tipo de consulta *</label>
        <select
          name="consultType"
          required
          className="w-full bg-[#111111] border border-[#C8A45D]/30 focus:border-[#C8A45D] text-[#F7F3EC] px-4 py-3 text-sm outline-none transition-colors appearance-none cursor-pointer"
        >
          <option value="">Selecciona una opción</option>
          {consultTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[#888888] text-xs tracking-widest uppercase mb-2">Mensaje *</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full bg-[#111111] border border-[#C8A45D]/30 focus:border-[#C8A45D] text-[#F7F3EC] px-4 py-3 text-sm outline-none transition-colors resize-none"
          placeholder="Cuéntame tu situación, tus objetivos y cómo puedo ayudarte..."
        />
      </div>

      {state === "error" && (
        <p className="text-red-400 text-sm border border-red-400/30 px-4 py-3">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full px-8 py-4 bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "loading" ? "Enviando..." : "Enviar Mensaje"}
      </button>
      <p className="text-[#888888] text-xs text-center">
        Al enviar, aceptas que AnaMaria Morrison te contacte. Sin spam, nunca.
      </p>
    </form>
  );
}
