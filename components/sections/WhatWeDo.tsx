import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { whatWeDo } from "@/lib/content";
import { Compass, Network, Sparkles, Route } from "lucide-react";
import type { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  network: <Network className="h-5 w-5" />,
  compass: <Compass className="h-5 w-5" />,
  spark: <Sparkles className="h-5 w-5" />,
  path: <Route className="h-5 w-5" />,
};

export function WhatWeDo() {
  return (
    <section id="what" className="section relative">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">What we do</span>
          <h2 className="h-display mt-3 text-display-lg">
            One society.<br />
            Four levers for clinicians who build.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {whatWeDo.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <SpotlightCard>
                <article className="card card-hover h-full p-7">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-brand-gradient-subtle text-brand-blue transition-transform duration-300 group-hover/spot:scale-110 group-hover/spot:rotate-3">
                    {iconMap[item.glyph]}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-fg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted pretty">
                    {item.blurb}
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
