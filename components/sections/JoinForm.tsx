"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ROLES = ["Founder", "Investor", "Operator", "Advisor", "Curious"] as const;

const fieldClass =
  "w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-[0.95rem] text-fg placeholder:text-fg-muted/60 transition-colors focus:border-fg/40 focus:outline-none focus:ring-2 focus:ring-accent/40";
const labelClass = "mb-1.5 block text-sm font-medium text-fg";

type State = "idle" | "submitting" | "success" | "error";

export function JoinForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      full_name: String(data.get("full_name") ?? ""),
      email: String(data.get("email") ?? ""),
      role: String(data.get("role") ?? ""),
      specialty: String(data.get("specialty") ?? ""),
      city: String(data.get("city") ?? ""),
      linkedin_url: String(data.get("linkedin_url") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }
      setState("success");
      form.reset();
    } catch {
      setError("Network error. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface-elevated p-8 text-center shadow-soft">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Check className="h-6 w-6" />
        </div>
        <h2 className="h-display mt-5 text-2xl text-fg">You're in the queue.</h2>
        <p className="mx-auto mt-3 max-w-md text-fg-muted">
          Thanks for applying to ASME. We review applications within 5 working days and
          will be in touch at the email you provided.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="full_name">Full name *</label>
          <input id="full_name" name="full_name" type="text" required autoComplete="name" className={fieldClass} placeholder="Dr Jane Smith" />
        </div>

        <div>
          <label className={labelClass} htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="jane@example.com" />
        </div>

        <div>
          <label className={labelClass} htmlFor="role">How would you describe yourself? *</label>
          <select id="role" name="role" required defaultValue="" className={fieldClass}>
            <option value="" disabled>Select one</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="specialty">Specialty or career stage</label>
          <input id="specialty" name="specialty" type="text" className={fieldClass} placeholder="e.g. GP registrar, ED consultant, med student" />
        </div>

        <div>
          <label className={labelClass} htmlFor="city">City / State</label>
          <input id="city" name="city" type="text" autoComplete="address-level2" className={fieldClass} placeholder="e.g. Melbourne, VIC" />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="linkedin_url">LinkedIn (optional)</label>
          <input id="linkedin_url" name="linkedin_url" type="url" className={fieldClass} placeholder="https://linkedin.com/in/..." />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">Tell us a bit about yourself</label>
          <textarea id="message" name="message" rows={4} className={fieldClass} placeholder="What are you building, exploring, or hoping to get from ASME?" />
        </div>
      </div>

      {state === "error" && error ? (
        <p className="mt-4 rounded-lg border border-red-300/40 bg-red-500/5 px-4 py-3 text-sm text-red-600">{error}</p>
      ) : null}

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={state === "submitting"}>
          {state === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting
            </>
          ) : (
            <>
              Apply to join <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
        <p className="text-xs text-fg-muted">Free to join. No clinical-society dues.</p>
      </div>
    </form>
  );
}
