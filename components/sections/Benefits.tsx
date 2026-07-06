import { type ReactNode } from "react";
import { Network, Compass, Sparkles, ShieldCheck, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { memberBenefits } from "@/lib/content";

const iconMap: Record<string, ReactNode> = {
  network: <Network className="h-5 w-5" />,
  compass: <Compass className="h-5 w-5" />,
  spark: <Sparkles className="h-5 w-5" />,
  shield: <ShieldCheck className="h-5 w-5" />,
  mail: <Mail className="h-5 w-5" />,
};

type Props = { id?: string; heading?: string; subtle?: boolean };

export function Benefits({ id = "benefits", heading = "Why join", subtle = false }: Props) {
  return (
    <section id={id} className={`section relative ${subtle ? "bg-surface-subtle" : ""}`}>
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">{heading}</span>
          <h2 className="h-display mt-3 text-display-lg balance">
            Free to join.<br />Built to be worth it.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
            Membership costs nothing. Here is what it gets you.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {memberBenefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.05}>
              <SpotlightCard>
                <article className="card card-hover h-full p-7">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-brand-gradient-subtle text-brand-blue">
                    {iconMap[b.glyph]}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-fg">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted pretty">
                    {b.body}
                  </p>
                </article>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
