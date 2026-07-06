import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { People } from "@/components/sections/People";
import { Endorsements } from "@/components/sections/Endorsements";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { manifesto, positions, site, founderMessage } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "ASME is a not-for-profit home for clinicians using their training to make an impact at scale through entrepreneurship and innovation. Our story, people, positions, and impact.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About ASME"
        title="A society for clinicians who build."
        lead="A not-for-profit home for doctors, medical students, and clinicians using their training and experience to make an impact at scale on healthcare through entrepreneurship and innovation."
        cta={{ label: "Join the community", href: site.joinUrl, external: true }}
      />

      {/* Our story */}
      <section id="story" className="section relative">
        <Container>
          <Reveal className="max-w-3xl">
            <span className="eyebrow">Our story &amp; mission</span>
            <h2 className="h-display mt-3 text-display-lg balance">Why this society exists.</h2>
            <p className="mt-6 text-xl leading-relaxed text-fg pretty">
              ASME was founded on a simple belief: clinicians deserve a home where their passion for innovation is understood, supported, and amplified.
            </p>
            <div className="mt-6 space-y-5">
              {manifesto.body.map((p) => (
                <p key={p} className="text-lg leading-relaxed text-fg-muted pretty">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* A message from the founder (draft) */}
      <section id="founder" className="section relative">
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <div className="card p-8 md:p-12">
              <span className="eyebrow">A message from our founder</span>
              <h2 className="h-display mt-3 text-3xl tracking-tight md:text-4xl balance">
                {founderMessage.title}
              </h2>
              <div className="mt-6 space-y-5">
                {founderMessage.paragraphs.map((p) => (
                  <p key={p} className="text-lg leading-relaxed text-fg-muted pretty">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <div
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#2B58E0,#1B3FB4)] text-sm font-semibold text-white shadow-soft"
                >
                  BC
                </div>
                <div>
                  <p className="font-medium text-fg">{founderMessage.name}</p>
                  <p className="text-sm text-fg-subtle">{founderMessage.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <People />

      {/* Advocacy / Our Positions */}
      <section id="positions" className="section relative">
        <Container>
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Advocacy &middot; Our positions</span>
            <h2 className="h-display mt-3 text-display-lg balance">Where ASME stands.</h2>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
              Position statements and submissions on clinician-led innovation. This grows into its own section as advocacy becomes a core function.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {positions.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <article className="card h-full p-7">
                  <h3 className="font-display text-xl tracking-tight text-fg">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty">{p.summary}</p>
                  {p.placeholder && (
                    <p className="mt-4 text-xs uppercase tracking-[0.14em] text-fg-subtle">
                      Draft &mdash; add the full statement
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Endorsements subtle />
      <ImpactStats />

      {/* Media & press */}
      <section id="media" className="section relative bg-surface-subtle">
        <Container>
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Media &amp; press</span>
            <h2 className="h-display mt-3 text-display-lg balance">ASME in the news.</h2>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
              Press mentions and coverage will be listed here. Add logos and links as coverage lands.
            </p>
          </Reveal>
        </Container>
      </section>
    </PageShell>
  );
}
