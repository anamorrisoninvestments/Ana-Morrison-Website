import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "@/lib/supabase";
import { CLIENT } from "@/lib/client-data";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a PR scoring assistant for ${CLIENT.name}, a real estate entrepreneur and short-term rental expert specializing in Airbnb, co-hosting, co-living, real estate arbitrage, tax deed investments, and financial freedom strategies.

Analyze journalist PR queries and:
1. Score from 0-100 how relevant this is for ${CLIENT.name} to respond to:
   - 90-100: Perfect fit (real estate, Airbnb, STR, tax deeds, Latina entrepreneur, financial freedom, women in real estate)
   - 70-89: Good fit (entrepreneurship, investing, passive income, property management)
   - 40-69: Possible fit (business, finance, leadership, women in business)
   - 0-39: Not relevant

2. Draft a response (max 200 words) that positions ${CLIENT.name} as an expert. Lead with her strongest credential for this specific query.

Respond in JSON: { "score": number, "reason": string, "draft": string }`;

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (secret !== process.env.PR_AUTOPILOT_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { from?: string; subject?: string; body?: string; platform?: string; userId?: string; userEmail?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { from, subject, body: emailBody, platform = "unknown", userId, userEmail } = body;
  if (!subject || !emailBody) {
    return NextResponse.json({ error: "Missing subject or body" }, { status: 400 });
  }

  const queryText = `Platform: ${platform}\nFrom: ${from || "unknown"}\nSubject: ${subject}\n\n${emailBody}`.slice(0, 4000);

  let score = 50;
  let reason = "AI scoring unavailable";
  let draft = "Response draft unavailable";

  try {
    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 800,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `PR Query:\n${queryText}` }],
    });
    const text = (msg.content[0] as { text: string }).text;
    const json = JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] || "{}");
    score = Number(json.score) || 50;
    reason = json.reason || reason;
    draft = json.draft || draft;
  } catch (err) {
    console.error("Anthropic scoring error:", err);
  }

  const { data, error } = await supabaseAdmin
    .from("pr_queries")
    .insert({
      platform,
      from_email: from,
      subject,
      body: emailBody.slice(0, 5000),
      score,
      reason,
      ai_draft: draft,
      status: "pending",
      submitted_by_user_id: userId || null,
      submitted_by_email: userEmail || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  // Update daily stats
  const today = new Date().toISOString().split("T")[0];
  await supabaseAdmin.rpc("increment_pr_stats", {
    p_date: today,
    p_score: score,
  });

  return NextResponse.json({ id: data.id, score }, { status: 201 });
}
