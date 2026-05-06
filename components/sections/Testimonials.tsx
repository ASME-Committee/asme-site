"use client";

import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { testimonials, type Testimonial } from "@/lib/content";
import { cn } from "@/lib/cn";

const accentBg: Record<Testimonial["accent"], string> = {
  blue: "bg-[radial-gradient(circle_at_30%_30%,#2B58E0,#1B3FB4)]",
  coral: "bg-[radial-gradient(circle_at_30%_30%,#F2929C,#D9676F)]",
  "soft-blue": "bg-[radial-gradient(circle_at_30%_30%,#A8C7F9,#6E8AC9)]",
};

export function Testimonials() {
  return (
    <section id="testimonials" className="section relative bg-surface-subtle">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Real clinicians. Real outcomes.</span>
          <h2 className="h-display mt-3 text-display-lg balance">
            Hear from clinicians who've been where you are.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.04}>
              <SpotlightCard glow={t.accent === "coral" ? "coral" : "blue"}>
                <figure className="card card-hover h-full p-7 flex flex-col">
                  <Quote className="h-5 w-5 text-brand-blue/40 transition-transform duration-500 group-hover/spot:scale-125 group-hover/spot:rotate-6" aria-hidden />
                  <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-fg pretty">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white text-sm font-semibold tracking-tight shadow-soft transition-transform duration-300 group-hover/spot:scale-110",
                        accentBg[t.accent],
                      )}
                      aria-hidden
                    >
                      {t.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-fg">{t.name}</span>
                      <span className="block text-xs text-fg-subtle">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
