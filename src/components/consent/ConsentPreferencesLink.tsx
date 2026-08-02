"use client";

export default function ConsentPreferencesLink({
  className = "",
  label = "Preferencias de cookies",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("amc:open-consent-preferences"))}
      className={className}
    >
      {label}
    </button>
  );
}
