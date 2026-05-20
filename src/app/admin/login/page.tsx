"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    if (res.ok) {
      router.push("/admin/pr-autopilot");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Credenciales incorrectas");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-[#C8A45D] font-bold text-lg tracking-widest uppercase">Ana Morrison</p>
          <p className="text-[#888888] text-xs tracking-widest uppercase mt-1">PR Auto-Pilot</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#888888] text-xs tracking-widest uppercase mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-[#111111] border border-[#C8A45D]/30 focus:border-[#C8A45D] text-[#F7F3EC] px-4 py-3 text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-[#888888] text-xs tracking-widest uppercase mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-[#111111] border border-[#C8A45D]/30 focus:border-[#C8A45D] text-[#F7F3EC] px-4 py-3 text-sm outline-none"
            />
          </div>
          {error && <p className="text-red-400 text-sm border border-red-400/30 px-3 py-2">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-colors disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
