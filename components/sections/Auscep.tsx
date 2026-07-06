import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { auscep } from "@/lib/content";

export function Auscep() {
  return (
    <section id="auscep" className="section relative">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">{auscep.eyebrow}</span>
            <h2 className="h-display mt-3 text-display-lg balance">
              {auscep.title}
              <span className="block text-fg-muted text-2xl md:text-3xl mt-3 font-normal tracking-tight">
                {auscep.subtitle}
              </span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted pretty">
              {auscep.description}
            </p>

            <ul className="mt-10 space-y-2 text-sm">
              {auscep.outcomes.map((o) => (
                <li
                  key={o}
                  className="flex gap-3 text-fg-muted before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-brand-blue"
                >
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="lg:col-span-7 grid gap-3 sm:grid-cols-2">
            {auscep.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.06}>
                <SpotlightCard>
                  <article className="card card-hover h-full p-7">
                    <div className="font-mono text-xs tracking-wider text-fg-subtle">
                      PILLAR / {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-4 font-display text-2xl tracking-tight text-fg">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty">
                      {pillar.body}
                    </p>
                  </article>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
