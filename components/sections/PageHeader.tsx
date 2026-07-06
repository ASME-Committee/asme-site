import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

type Cta = { label: string; href: string; external?: boolean };

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  cta?: Cta;
};

/**
 * Top band for interior pages. Lighter than the homepage Hero: a single
 * dotted backdrop, the page eyebrow, an h1, a lead paragraph, and one CTA.
 */
export function PageHeader({ eyebrow, title, lead, cta }: Props) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border pt-12 pb-12 md:pt-20 md:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.3]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(var(--fg) / 0.12) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 60% 80% at 20% 0%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 80% at 20% 0%, black 20%, transparent 70%)",
        }}
      />
      <Container>
        <Reveal className="max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="h-display mt-4 text-display-xl balance">{title}</h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted pretty">
              {lead}
            </p>
          )}
          {cta && (
            <div className="mt-8">
              <ButtonLink
                href={cta.href}
                variant="primary"
                size="md"
                {...(cta.external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                {cta.label}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
