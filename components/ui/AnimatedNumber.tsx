"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Counts up from 0 to the numeric portion of `value` once the element scrolls
 * into view. Preserves any non-numeric characters (commas, +, $, k, M).
 *
 *   <AnimatedNumber value="2,000+" />
 *   <AnimatedNumber value="$20M+" />
 *
 * Honours prefers-reduced-motion (renders the final value immediately).
 */
type Props = {
  value: string;
  duration?: number; // ms
};

export function AnimatedNumber({ value, duration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState<string>(reduce ? value : zeroLike(value));

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setDisplay(value);
      return;
    }
    const target = parseTarget(value);
    if (target == null) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const v = target * ease(t);
      setDisplay(formatLike(value, v));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

/** Replace the numeric core of the input with zeros so layout doesn't jump. */
function zeroLike(value: string): string {
  return value.replace(/[\d.,]+/, (match) =>
    match.replace(/\d/g, "0"),
  );
}

/** Pull the numeric target out of "2,000+" / "$20M+" / "18k". */
function parseTarget(value: string): number | null {
  const match = value.match(/[\d,.]+/);
  if (!match) return null;
  return parseFloat(match[0].replace(/,/g, ""));
}

/** Render a numeric `n` back into the same template as `value`. */
function formatLike(value: string, n: number): string {
  return value.replace(/[\d,.]+/, () => {
    const hadComma = value.includes(",");
    const original = value.match(/[\d,.]+/)?.[0] ?? "";
    const decimals = (original.split(".")[1] ?? "").length;
    const rounded = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
    if (!hadComma) return rounded;
    const [intPart, decPart] = rounded.split(".");
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decPart ? `${withCommas}.${decPart}` : withCommas;
  });
}
