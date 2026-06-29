import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Benefits } from "@/components/sections/Benefits";
import { MemberSpotlights } from "@/components/sections/MemberSpotlights";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { personas, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join ASME for free. The benefits of membership, who it is for, the Innovator Directory of members and their ventures, and how membership supports CPD and AHPRA registration.",
};

export default function CommunityPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Community"
        title="Stop being the only clinician founder in the room."
        lead="Membership is free. The only thing to overcome is hesitation. Join the network, get into the next event, and meet the people building healthcare's next decade."
        cta={{ label: "Join (free)", href: site.joinUrl, external: true }}
      />

      <Benefits heading="Why join" />

      {/* Who it's for */}
      <section id="who" className="section relative bg-surface-subtle">
        <Container>
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Who it&apos;s for</span>
            <h2 className="h-display mt-3 text-display-lg balance">Find yourself here.</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {personas.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <article className="card h-full p-7">
                  <h3 className="font-display text-xl tracking-tight text-fg">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Innovator Directory (reuses member spotlights) */}
      <MemberSpotlights />

      {/* CPD & AHPRA */}
      <section id="cpd" className="section relative">
        <Container>
          <Reveal className="max-w-3xl">
            <span className="eyebrow">CPD &amp; AHPRA</span>
            <h2 className="h-display mt-3 text-display-lg balance">
              Counts toward your registration.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
              Taking part in ASME programs and events can contribute to your continuing professional development and help you maintain registration. Specific CPD details will be confirmed here.
            </p>
          </Reveal>
        </Container>
      </section>

      <JoinCTA />
    </PageShell>
  );
}
