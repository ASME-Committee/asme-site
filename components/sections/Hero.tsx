"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { hero } from "@/lib/content";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32"
    >
      <BackdropDecor />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <span className="chip">
            <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
            {hero.eyebrow}
          </span>

          {/* Headline is intentionally static. The drifting gradient mesh and
              counter-up metrics carry the motion in this section. */}
          <h1 className="h-display mt-6 text-display-2xl balance">
            <span className="text-fg">A home for</span>{" "}
            <span className="text-gradient">clinician entrepreneurs.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-fg-muted md:text-xl pretty">
            {hero.sub}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink
              href={hero.primaryCta.href}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {hero.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-6 rounded-2xl border border-border bg-surface-elevated/60 p-6 backdrop-blur-md sm:grid-cols-3 md:p-8"
        >
          {hero.metrics.map((m) => (
            <div key={m.label} className="text-center md:text-left">
              <div className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">
                <AnimatedNumber value={m.value} duration={2400} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.14em] text-fg-subtle">
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function BackdropDecor() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Slowly rotating aurora wash. A blurred conic gradient turning behind
          everything gives the calm, flowing motion of a background video. */}
      <motion.div
        className="absolute left-1/2 top-[-40%] h-[150vh] w-[150vh] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "conic-gradient(from 90deg, rgb(43 88 224 / 0.45), rgb(168 199 249 / 0.2), rgb(242 146 156 / 0.4), rgb(168 199 249 / 0.2), rgb(43 88 224 / 0.45))",
        }}
        animate={reduce ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      {/* Faint dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(var(--fg) / 0.15) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, black 30%, transparent 75%)",
        }}
      />

      {/* Three drifting, morphing colour blobs. Offset paths and durations make
          them chase each other for organic, never-repeating flow. */}
      <motion.div
        className="absolute left-1/2 top-[-160px] h-[520px] w-[920px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgb(43 88 224 / 0.55), transparent 55%)",
        }}
        animate={
          reduce
            ? undefined
            : { x: ["-8%", "10%", "-8%"], y: ["-4%", "6%", "-4%"], scale: [1, 1.1, 1] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-[-100px] h-[480px] w-[820px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 70% 70%, rgb(242 146 156 / 0.55), transparent 60%)",
        }}
        animate={
          reduce
            ? undefined
            : { x: ["12%", "-12%", "12%"], y: ["6%", "-6%", "6%"], scale: [1.05, 0.92, 1.05] }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[18%] top-[8%] h-[420px] w-[640px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgb(168 199 249 / 0.5), transparent 60%)",
        }}
        animate={
          reduce
            ? undefined
            : { x: ["-6%", "14%", "-6%"], y: ["8%", "-6%", "8%"], scale: [0.95, 1.12, 0.95] }
        }
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Breathing luminous core keeps the headline area bright and legible
          while still feeling alive. */}
      <motion.div
        className="absolute left-1/2 top-[34%] h-[60vh] w-[80vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--surface) / 0.65), transparent 62%)",
        }}
        animate={reduce ? undefined : { opacity: [0.55, 0.8, 0.55], scale: [1, 1.06, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft fade to surface so the hero blends into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-surface" />
    </div>
  );
}
