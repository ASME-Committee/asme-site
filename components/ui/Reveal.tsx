"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
} & Omit<HTMLMotionProps<"div">, "children" | "ref">;

/**
 * Wraps children in a one-shot fade-up animation triggered when scrolled into view.
 * Honors prefers-reduced-motion (renders instantly with no transform).
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
  ...rest
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = (motion[as] as typeof motion.div) ?? motion.div;

  if (reduce) {
    const Tag = as as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
