"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/cn";

/**
 * Wrapper that adds a cursor-tracking radial spotlight to its child card.
 * Sets two CSS custom properties (--mx, --my) on pointer move; the overlay
 * is a pure-CSS gradient that reads those variables. No re-renders.
 *
 * The child should be a `card` element (relative + rounded + bordered).
 * The spotlight overlay is absolutely positioned and pointer-events: none,
 * so it never intercepts clicks.
 */
type Props = {
  children: ReactNode;
  className?: string;
  /** Optional accent colour for the glow. Default brand blue. */
  glow?: "blue" | "coral";
};

const glowColours: Record<NonNullable<Props["glow"]>, string> = {
  blue: "rgba(43, 88, 224, 0.18)",
  coral: "rgba(242, 146, 156, 0.18)",
};

export function SpotlightCard({ children, className, glow = "blue" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        "group/spot relative h-full transition-transform duration-300 ease-out hover:-translate-y-0.5",
        className,
      )}
      style={{
        // initial position so the first hover doesn't snap from 0,0
        ["--mx" as never]: "50%",
        ["--my" as never]: "50%",
        ["--glow" as never]: glowColours[glow],
      }}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--mx) var(--my), var(--glow), transparent 60%)",
        }}
      />
    </div>
  );
}
