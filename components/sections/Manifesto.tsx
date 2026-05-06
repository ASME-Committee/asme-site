"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { manifesto } from "@/lib/content";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Manifesto() {
  const reduce = useReducedMotion();

  return (
    <section className="section-tight relative">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            {manifesto.eyebrow}
          </motion.span>

          <ul className="mt-6 space-y-3 md:space-y-4">
            {manifesto.lines.map((line, i) => (
              <motion.li
                key={line}
                initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1 - i * 0.05, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.18, ease: easeOut }}
                className="font-display text-3xl tracking-tight text-fg balance md:text-5xl"
              >
                {line}
              </motion.li>
            ))}
          </ul>

          <div className="mx-auto mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-fg-muted pretty">
            {manifesto.body.map((para, i) => (
              <motion.p
                key={i}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.12, ease: easeOut }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
