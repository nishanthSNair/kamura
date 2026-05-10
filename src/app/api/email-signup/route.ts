import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const Body = z.object({
  email: z.string().email(),
  source: z.enum([
    "peptide_waitlist",
    "booking_waitlist",
    "newsletter",
    "unspecified",
  ]),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }

  const { email, source } = parsed.data;
  const supabase = await createServerSupabaseClient();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = req.headers.get("user-agent") ?? null;

  // Idempotent insert — UNIQUE(email, source) means re-submits are no-ops.
  // We treat 23505 (unique violation) as success so users can't tell whether
  // they were already on the list.
  const { error } = await supabase.from("email_signups").insert({
    email: email.toLowerCase(),
    source,
    ip,
    user_agent: userAgent,
  });

  if (error && error.code !== "23505") {
    console.error("email_signup insert failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not save signup" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
