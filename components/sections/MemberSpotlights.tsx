"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { members, type Member } from "@/lib/content";
import { cn } from "@/lib/cn";

const accentBg: Record<Member["accent"], string> = {
  blue: "bg-[radial-gradient(circle_at_30%_30%,#2B58E0,#1B3FB4)]",
  coral: "bg-[radial-gradient(circle_at_30%_30%,#F2929C,#D9676F)]",
  "soft-blue": "bg-[radial-gradient(circle_at_30%_30%,#A8C7F9,#6E8AC9)]",
};

export function MemberSpotlights() {
  return (
    <section id="community" className="section relative overflow-hidden">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">The community</span>
          <h2 className="h-display mt-3 text-display-lg balance">
            Real clinicians.<br />Real companies. Real cap tables.
          </h2>
        </Reveal>
      </Container>

      <Reveal className="mt-12">
        <div className="group relative overflow-hidden mask-fade-x">
          <div
            className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]"
            style={{ animationDuration: "90s" }}
          >
            {[...members, ...members].map((m, i) => (
              <article
                key={`${m.name}-${i}`}
                aria-hidden={i >= members.length}
                className="card card-hover relative shrink-0 overflow-hidden p-7 w-[300px] md:w-[360px]"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-full text-white text-lg font-semibold tracking-tight shadow-soft",
                      accentBg[m.accent],
                    )}
                    aria-hidden
                  >
                    {m.initials}
                  </div>
                  <span className="chip">{m.type}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-fg">
                  {m.name}
                </h3>
                <p className="mt-1 text-sm text-fg-subtle">
                  {m.role} · {m.org}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-fg-muted pretty">{m.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
