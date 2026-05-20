/**
 * Bootstrap first owner user (idempotent)
 * Run: npx tsx src/scripts/bootstrap-pr-users.ts
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, PR_OWNER_EMAIL, PR_OWNER_PASSWORD
 */

import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

async function main() {
  const email = process.env.PR_OWNER_EMAIL;
  const password = process.env.PR_OWNER_PASSWORD;

  if (!email || !password) {
    console.error("Set PR_OWNER_EMAIL and PR_OWNER_PASSWORD env vars");
    process.exit(1);
  }

  const { data: existing } = await supabase
    .from("pr_users")
    .select("id")
    .eq("email", email.toLowerCase())
    .single();

  if (existing) {
    console.log("Owner already exists:", email);
    return;
  }

  const hash = await bcrypt.hash(password, 12);
  const { data, error } = await supabase
    .from("pr_users")
    .insert({ email: email.toLowerCase(), password_hash: hash, role: "owner", active: true })
    .select("id")
    .single();

  if (error) {
    console.error("Error creating owner:", error);
    process.exit(1);
  }

  console.log("Owner created successfully. ID:", data.id);
}

main();
