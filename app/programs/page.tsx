import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Auscep } from "@/components/sections/Auscep";
import { Pathways } from "@/components/sections/Pathways";
import { Testimonials } from "@/components/sections/Testimonials";
import { programsList, site } from "@/lib/content";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "ASME's application-driven programs for clinician innovators, including the flagship 12-month AUSCEP program delivered with MTPConnect, internships, and more.",
};

export default function ProgramsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Programs"
        title="From idea to first cheque to scale."
        lead="Our programs are planned months ahead and built around application and cohort. Different from events: programs do not expire when a date passes."
        cta={{ label: "Apply to join", href: site.joinUrl, external: true }}
      />

      {/* Programs overview */}
      <section className="section relative">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {programsList.map((p, i) => {
              const internal = p.href.startsWith("/") || p.href.startsWith("#");
              const body = (
                <article className="card card-hover flex h-full flex-col p-7">
                  <div className="flex items-center justify-between">
                    <span className="chip">{p.status}</span>
                    <ArrowUpRight className="h-4 w-4 text-fg-muted" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl tracking-tight text-fg">{p.name}</h3>
                  <p className="mt-1 text-sm text-fg-subtle">{p.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-fg-muted pretty">{p.body}</p>
                  {p.placeholder && (
                    <p className="mt-4 text-xs uppercase tracking-[0.14em] text-fg-subtle">
                      Details to confirm
                    </p>
                  )}
                </article>
              );
              return (
                <Reveal key={p.name} delay={i * 0.06}>
                  {internal ? (
                    <Link href={p.href} className="block h-full">
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* AUSCEP detail (anchor target #auscep) */}
      <Auscep />

      {/* How to apply */}
      <section id="apply" className="section relative bg-surface-subtle">
        <Container>
          <Reveal className="max-w-2xl">
            <span className="eyebrow">How to apply</span>
            <h2 className="h-display mt-3 text-display-lg balance">A clear path in.</h2>
          </Reveal>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { n: "01", t: "Join ASME (free)", d: "Become a member so we can match you to the right program and cohort." },
              { n: "02", t: "Submit an application", d: "Tell us about your idea, your stage, and what you want from the program." },
              { n: "03", t: "Interview and onboard", d: "Shortlisted applicants meet the delivery team and join the next cohort." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <li className="card h-full p-7">
                  <div className="font-mono text-xs tracking-wider text-brand-blue">STEP / {s.n}</div>
                  <h3 className="mt-4 font-display text-xl tracking-tight text-fg">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Outcomes & alumni */}
      <Testimonials />
    </PageShell>
  );
}
