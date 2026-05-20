"use client";

import { useState } from "react";

type Query = {
  id: string;
  platform: string;
  from_email: string;
  subject: string;
  body: string;
  score: number;
  reason: string;
  ai_draft: string;
  status: "pending" | "sent" | "rejected";
  created_at: string;
};

type Stat = {
  date: string;
  queries_received: number;
  responses_sent: number;
  high_score_matches: number;
};

type Props = {
  queries: Query[];
  stats: Stat[];
  user: { email: string; role: string };
};

function scoreColor(score: number) {
  if (score >= 70) return "text-green-400";
  if (score >= 40) return "text-yellow-400";
  return "text-red-400";
}

function scoreBg(score: number) {
  if (score >= 70) return "bg-green-400/10 border-green-400/30";
  if (score >= 40) return "bg-yellow-400/10 border-yellow-400/30";
  return "bg-red-400/10 border-red-400/30";
}

export default function PRDashboardClient({ queries, stats, user }: Props) {
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [draft, setDraft] = useState("");
  const [journalistEmail, setJournalistEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [localQueries, setLocalQueries] = useState(queries);
  const [filter, setFilter] = useState<"all" | "pending" | "sent" | "rejected">("pending");

  const filtered = localQueries.filter((q) => filter === "all" || q.status === filter);
  const pending = localQueries.filter((q) => q.status === "pending").length;
  const highScore = localQueries.filter((q) => q.score >= 70).length;

  function openQuery(q: Query) {
    setSelectedQuery(q);
    setDraft(q.ai_draft || "");
    setJournalistEmail(q.from_email || "");
  }

  async function handleApprove() {
    if (!selectedQuery) return;
    setSending(true);
    const res = await fetch("/api/pr-autopilot/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queryId: selectedQuery.id, finalDraft: draft, journalistEmail }),
    });
    if (res.ok) {
      setLocalQueries((prev) => prev.map((q) => q.id === selectedQuery.id ? { ...q, status: "sent" } : q));
      setSelectedQuery(null);
    }
    setSending(false);
  }

  async function handleReject() {
    if (!selectedQuery) return;
    await fetch(`/api/pr-autopilot/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queryId: selectedQuery.id }),
    });
    setLocalQueries((prev) => prev.map((q) => q.id === selectedQuery.id ? { ...q, status: "rejected" } : q));
    setSelectedQuery(null);
  }

  return (
    <div className="min-h-screen bg-black text-[#F7F3EC]">
      {/* Header */}
      <div className="border-b border-[#C8A45D]/20 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-[#C8A45D] font-bold tracking-widest uppercase text-sm">PR Auto-Pilot</p>
          <p className="text-[#888888] text-xs">Ana Morrison · The Host Circle</p>
        </div>
        <div className="text-right">
          <p className="text-[#F7F3EC]/70 text-sm">{user.email}</p>
          <p className="text-[#888888] text-xs uppercase tracking-wider">{user.role}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Queries Pendientes", value: pending, accent: "text-yellow-400" },
            { label: "Score 70+", value: highScore, accent: "text-green-400" },
            { label: "Total (última semana)", value: stats.reduce((a, s) => a + (s.queries_received || 0), 0), accent: "text-[#22AEEF]" },
            { label: "Respuestas Enviadas", value: stats.reduce((a, s) => a + (s.responses_sent || 0), 0), accent: "text-[#C8A45D]" },
          ].map((s) => (
            <div key={s.label} className="p-5 border border-[#C8A45D]/20 bg-[#111111]">
              <p className={`text-3xl font-bold ${s.accent}`}>{s.value}</p>
              <p className="text-[#888888] text-xs mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(["pending", "all", "sent", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs tracking-widest uppercase font-semibold transition-colors ${
                filter === f ? "bg-[#C8A45D] text-black" : "border border-[#C8A45D]/30 text-[#C8A45D] hover:bg-[#C8A45D]/10"
              }`}
            >
              {f === "pending" ? `Pendientes (${pending})` : f === "all" ? "Todos" : f === "sent" ? "Enviados" : "Rechazados"}
            </button>
          ))}
        </div>

        {/* Queries list */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-[#888888]">
              <p className="text-4xl mb-4">📭</p>
              <p>No hay queries en esta categoría</p>
            </div>
          )}
          {filtered.map((q) => (
            <div
              key={q.id}
              onClick={() => openQuery(q)}
              className={`p-5 border cursor-pointer hover:border-[#C8A45D] transition-all ${scoreBg(q.score)}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[#888888] text-xs uppercase tracking-wider">{q.platform}</span>
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 ${
                      q.status === "sent" ? "bg-green-400/20 text-green-400" :
                      q.status === "rejected" ? "bg-red-400/20 text-red-400" :
                      "bg-yellow-400/20 text-yellow-400"
                    }`}>{q.status}</span>
                  </div>
                  <p className="text-[#F7F3EC] font-semibold text-sm truncate">{q.subject}</p>
                  <p className="text-[#888888] text-xs mt-1">{q.from_email} · {new Date(q.created_at).toLocaleDateString("es-US")}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-2xl font-bold ${scoreColor(q.score)}`}>{q.score}</p>
                  <p className="text-[#888888] text-xs">score</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#C8A45D]/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#C8A45D]/20 flex items-center justify-between">
              <div>
                <p className="text-[#C8A45D] text-xs uppercase tracking-widest">{selectedQuery.platform}</p>
                <p className="text-[#F7F3EC] font-bold">{selectedQuery.subject}</p>
              </div>
              <button onClick={() => setSelectedQuery(null)} className="text-[#888888] hover:text-[#F7F3EC] text-2xl">×</button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <span className={`text-3xl font-bold ${scoreColor(selectedQuery.score)}`}>{selectedQuery.score}/100</span>
                <p className="text-[#F7F3EC]/60 text-sm">{selectedQuery.reason}</p>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-wider mb-2">Query del Periodista</p>
                <div className="bg-black p-4 text-[#F7F3EC]/70 text-sm leading-relaxed max-h-32 overflow-y-auto">
                  {selectedQuery.body}
                </div>
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-wider mb-2">Email del periodista</p>
                <input
                  value={journalistEmail}
                  onChange={(e) => setJournalistEmail(e.target.value)}
                  className="w-full bg-black border border-[#C8A45D]/30 text-[#F7F3EC] px-3 py-2 text-sm outline-none focus:border-[#C8A45D]"
                  placeholder="email@periodista.com"
                />
              </div>
              <div>
                <p className="text-[#888888] text-xs uppercase tracking-wider mb-2">Draft de Respuesta (editable)</p>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={8}
                  className="w-full bg-black border border-[#C8A45D]/30 text-[#F7F3EC] px-3 py-2 text-sm outline-none focus:border-[#C8A45D] resize-none"
                />
              </div>
              {["owner", "editor"].includes(user.role) && (
                <div className="flex gap-3">
                  <button
                    onClick={handleApprove}
                    disabled={sending || selectedQuery.status === "sent"}
                    className="flex-1 py-3 bg-[#C8A45D] text-black font-bold tracking-widest uppercase text-sm hover:bg-[#E2C98A] transition-colors disabled:opacity-60"
                  >
                    {sending ? "Enviando..." : "✓ Aprobar y Enviar"}
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={sending || selectedQuery.status !== "pending"}
                    className="px-6 py-3 border border-red-400/40 text-red-400 text-sm uppercase tracking-wider hover:bg-red-400/10 transition-colors disabled:opacity-60"
                  >
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
