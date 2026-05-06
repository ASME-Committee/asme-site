import { NextResponse } from "next/server";

/**
 * Stub endpoint for community signups. In production, swap the body for a
 * real integration (Resend/Loops/Mailchimp + a CRM record). Until then this
 * just validates the shape and logs to the server.
 */

const ROLES = ["Founder", "Investor", "Operator", "Advisor", "Curious"] as const;
type Role = (typeof ROLES)[number];

type Payload = {
  name: string;
  email: string;
  role: Role;
  context?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Partial<Payload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const role = body.role;
  const context = body.context?.trim() ?? "";

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (!role || !ROLES.includes(role)) {
    return NextResponse.json({ error: "Pick a role" }, { status: 400 });
  }

  // TODO: persist to CRM / send a confirmation email.
  console.log("[asme/join]", { name, email, role, context });

  return NextResponse.json({ ok: true });
}
