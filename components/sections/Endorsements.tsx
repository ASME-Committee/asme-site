import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { endorsements } from "@/lib/content";

type Props = { subtle?: boolean };

export function Endorsements({ subtle = false }: Props) {
  return (
    <section id="endorsements" className={`section relative ${subtle ? "bg-surface-subtle" : ""}`}>
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Endorsements</span>
          <h2 className="h-display mt-3 text-display-lg balance">
            Backed by people who set the standard.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {endorsements.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.06}>
              <figure className="card h-full p-7">
                <blockquote className="text-base leading-relaxed text-fg pretty">
                  &ldquo;{e.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-5">
                  <p className="font-medium text-fg">{e.name}</p>
                  <p className="mt-0.5 text-sm text-fg-subtle">{e.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
