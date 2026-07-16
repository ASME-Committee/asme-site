"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { partners } from "@/lib/content";
import { asset } from "@/lib/asset";

/**
 * Slim band that lives between the hero and the manifesto.
 * Just the partner marquee. Quotes live further down in Testimonials.
 */
export function Partners() {
  // Platinum partner leads the strip.
  const ordered = [...partners].sort(
    (a, b) => Number(b.tier === "platinum") - Number(a.tier === "platinum"),
  );
  return (
    <section
      id="partners"
      className="section-tight relative bg-surface-subtle border-y border-border"
    >
      <Container>
        <Reveal className="text-center">
          <span className="eyebrow">Backed by Australia's healthcare ecosystem</span>
          <p className="mt-3 text-sm text-fg-muted">
            ASME and AUSCEP work alongside the institutions, funds, and accelerators building Australian healthcare's next decade.
          </p>
        </Reveal>
      </Container>

      <Reveal className="mt-10">
        <div className="relative overflow-hidden mask-fade-x">
          <div className="flex w-max animate-marquee">
            {[...ordered, ...ordered].map((p, i) => (
              <a
                key={`${p.name}-${i}`}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.name}
                className="mx-10 flex h-28 w-56 shrink-0 items-center justify-center opacity-80 transition-opacity hover:opacity-100"
              >
                <Image
                  src={asset(p.logo)}
                  alt={p.name}
                  width={320}
                  height={112}
                  className={`w-auto object-contain ${p.tier === "platinum" ? "max-h-24" : "max-h-20"}`}
                />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
