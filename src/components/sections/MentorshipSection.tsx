"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const pillars = [
  {
    title: "Estructura Empresarial",
    items: [
      "Acceso completo a la membresía durante un año",
      "Acompañamiento para crear empresa, EIN y Tax ID",
      "Preparación para apertura de cuenta bancaria empresarial",
    ],
  },
  {
    title: "Inteligencia Artificial Aplicada",
    items: [
      "Programa de creación de IA para automatizar tu negocio de hospitalidad",
      "Sistema para mejorar fotos, generar publicaciones, títulos, descripciones y reglas",
      "Publicación simultánea en tres plataformas",
      "Automatización de mensajes, códigos, equipo, mantenimiento, pagos, insumos, reseñas y reclamos",
      "Sistema replicable por propiedad",
      "Guías de bienvenida físicas y virtuales",
      "Automatización de marketing con IA",
      "Creación de IA de branding y marketing",
    ],
  },
  {
    title: "Legal & Operacional",
    items: [
      "Template de contrato para arrendatarios en modelo de arbitraje",
      "Template de contrato para propietarios en modelo de administración o co-hosting",
    ],
  },
  {
    title: "Acompañamiento Semanal",
    items: [
      "Reuniones grupales semanales durante un año con AnaMaria Morrison",
      "Actualizaciones de inversión y generación de ingresos",
      "Reuniones semanales con experto financiero para crédito y adquisición de capital",
    ],
  },
  {
    title: "Educación Fiscal con Contador Público",
    items: [
      "Clases semanales con contador público profesional",
      "Educación fiscal para negocios de alquiler a corto plazo",
      "Estructura correcta del negocio",
      "Deducciones legales y organización contable",
      "Separación de finanzas personales y empresariales",
      "Preparación para impuestos",
      "Estrategias legales para pagar menos impuestos",
      "Uso inteligente del crédito y estructura financiera",
    ],
  },
];

export default function MentorshipSection() {
  return (
    <section id="mentoria" className="py-28 bg-[#141210] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,164,93,0.06)_0%,transparent_55%)]" />
      <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-[#10145F]/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#C8A45D]/10 border border-[#C8A45D]/30 text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-6">
            Programa High Ticket · 12 Meses
          </span>
          <h2 className="heading-serif text-5xl sm:text-6xl mb-4 leading-[0.95]">
            <span className="text-[#F7F3EC]">El Negocio Secreto</span>
            <br />
            <span className="text-gold-gradient italic">de la Gente Rica</span>
          </h2>
          <p className="text-[#888888] text-sm tracking-widest uppercase mb-6">
            The Rich People's Secret
          </p>
          <p className="text-[#F7F3EC]/70 text-lg leading-relaxed">
            Un programa de acompañamiento anual para construir un negocio profesional
            de alquiler a corto plazo con estructura empresarial, automatización,
            inteligencia artificial, educación financiera y acompañamiento semanal.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-8 rounded-2xl border border-[#C8A45D]/15 bg-[#1C1916] hover:border-[#C8A45D]/40 transition-all"
            >
              <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-2">
                Pilar {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="heading-serif text-2xl text-[#F7F3EC] mb-5">{pillar.title}</h3>
              <ul className="space-y-2.5">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="text-[#C8A45D] mt-1.5 text-xs">◆</span>
                    <span className="text-[#F7F3EC]/75 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/contacto"
            className="inline-block px-10 py-4 rounded-full bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-all hover:shadow-[0_0_40px_rgba(200,164,93,0.4)]"
          >
            Ver la Clase Gratuita
          </Link>
          <p className="text-[#888888] text-xs mt-4 italic">
            Sin costo · Cupo limitado
          </p>
        </div>
      </div>
    </section>
  );
}
