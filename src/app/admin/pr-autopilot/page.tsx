import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken, COOKIE } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import PRDashboardClient from "./PRDashboardClient";

export default async function PRAutopilotPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  const user = token ? await verifyToken(token) : null;
  if (!user) redirect("/admin/login");

  const [{ data: queries }, { data: stats }] = await Promise.all([
    supabaseAdmin
      .from("pr_queries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50),
    supabaseAdmin
      .from("pr_stats")
      .select("*")
      .order("date", { ascending: false })
      .limit(7),
  ]);

  return (
    <PRDashboardClient
      queries={queries || []}
      stats={stats || []}
      user={{ email: user.email, role: user.role }}
    />
  );
}
