import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * Membership signup endpoint. Persists applications to the Supabase `members`
 * table (the ASME CRM reads from the same table). Replaces the old Airtable form.
 */

export const runtime = "nodejs";

const ROLES = ["Founder", "Investor", "Operator", "Advisor", "Curious"] as const;
type Role = (typeof ROLES)[number];

type Payload = {
  full_name: string;
  email: string;
  role: Role;
  specialty?: string;
  city?: string;
  linkedin_url?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: unknown, max = 500): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Partial<Payload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const full_name = clean(body.full_name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const role = body.role;
  const specialty = clean(body.specialty, 160);
  const city = clean(body.city, 120);
  const linkedin_url = clean(body.linkedin_url, 300);
  const message = clean(body.message, 2000);

  if (full_name.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (!role || !ROLES.includes(role)) {
    return NextResponse.json({ error: "Please pick how you'd describe yourself." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("members").insert({
      full_name,
      email,
      role,
      specialty: specialty || null,
      city: city || null,
      linkedin_url: linkedin_url || null,
      message: message || null,
      source: "website",
      status: "new",
    });

    if (error) {
      // Unique-violation on email = already applied. Treat as success to the user.
      if (error.code === "23505") {
        return NextResponse.json({ ok: true, duplicate: true });
      }
      console.error("[asme/join] insert failed", error);
      return NextResponse.json(
        { error: "Something went wrong saving your application. Please try again." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("[asme/join] unexpected error", err);
    return NextResponse.json(
      { error: "Server is not configured yet. Please try again shortly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
