import type { Locale } from "@/lib/i18n/config";

type Props = { locale?: Locale };

export default function LegalDraftBanner({ locale = "es" }: Props) {
  const text =
    locale === "en"
      ? "This document is a provisional draft under legal review. The final version will be published soon."
      : "Este documento es una versión provisional en revisión legal. La versión final se publicará próximamente.";
  return (
    <div className="mb-8 p-4 rounded-2xl border border-[#C8A45D]/40 bg-[#C8A45D]/5">
      <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-1">
        {locale === "en" ? "Provisional draft" : "Versión provisional"}
      </p>
      <p className="text-[#F7F3EC]/80 text-sm">{text}</p>
    </div>
  );
}
