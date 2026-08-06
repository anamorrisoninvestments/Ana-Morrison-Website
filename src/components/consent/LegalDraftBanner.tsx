export default function LegalDraftBanner() {
  return (
    <div className="my-6 p-4 rounded-2xl border border-[#C8A45D]/40 bg-[#C8A45D]/8">
      <p className="text-[#C8A45D] text-xs tracking-widest uppercase font-semibold mb-1">
        Borrador provisional
      </p>
      <p className="text-[#F7F3EC]/80 text-sm leading-relaxed">
        Este documento es un borrador provisional pendiente de revisión legal por
        un abogado autorizado en Florida. No debe interpretarse como asesoría
        legal ni como un documento revisado profesionalmente.
      </p>
    </div>
  );
}
