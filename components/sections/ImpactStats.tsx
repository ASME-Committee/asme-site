import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { hero, auscep } from "@/lib/content";

export function ImpactStats() {
  return (
    <section id="impact" className="section relative">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Impact</span>
          <h2 className="h-display mt-3 text-display-lg balance">
            The numbers so far.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {hero.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <div className="card h-full p-8">
                <div className="text-4xl font-semibold tracking-tight text-fg md:text-5xl">
                  {m.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.14em] text-fg-subtle">
                  {m.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 border-t border-border pt-8">
          <p className="text-xs uppercase tracking-[0.18em] text-fg-subtle">
            From the AUSCEP program
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {auscep.outcomes.map((o) => (
              <li
                key={o}
                className="flex gap-3 text-sm text-fg-muted before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-brand-blue"
              >
                {o}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
