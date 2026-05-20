import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyToken, COOKIE } from "@/lib/auth";
import { CLIENT } from "@/lib/client-data";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "re_placeholder");
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE)?.value;
  const user = token ? await verifyToken(token) : null;
  if (!user || !["owner", "editor"].includes(user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { queryId, finalDraft, journalistEmail, journalistName } = await req.json();
  if (!queryId || !finalDraft) {
    return NextResponse.json({ error: "Missing queryId or finalDraft" }, { status: 400 });
  }

  const { data: query, error: fetchErr } = await supabaseAdmin
    .from("pr_queries")
    .select("*")
    .eq("id", queryId)
    .single();

  if (fetchErr || !query) {
    return NextResponse.json({ error: "Query not found" }, { status: 404 });
  }

  if (query.status === "sent") {
    return NextResponse.json({ error: "Already sent" }, { status: 409 });
  }

  if (journalistEmail) {
    await getResend().emails.send({
      from: `${CLIENT.name} <${CLIENT.email}>`,
      to: journalistEmail,
      subject: `Re: ${query.subject}`,
      html: `<p>${finalDraft.replace(/\n/g, "<br>")}</p><br><p>—<br><strong>${CLIENT.name}</strong><br>Founder, The Host Circle<br><a href="${CLIENT.siteUrl}">${CLIENT.siteUrl}</a></p>`,
    });
  }

  await supabaseAdmin
    .from("pr_queries")
    .update({
      status: "sent",
      final_response: finalDraft,
      approved_by_user_id: user.userId,
      approved_at: new Date().toISOString(),
    })
    .eq("id", queryId);

  const today = new Date().toISOString().split("T")[0];
  await supabaseAdmin.rpc("increment_pr_responses", { p_date: today });

  return NextResponse.json({ ok: true });
}
