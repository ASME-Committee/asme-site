import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:ring-accent disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-fg-inverse hover:bg-fg/90 shadow-soft hover:shadow-lift active:scale-[0.98]",
  secondary:
    "border border-border-strong bg-surface-elevated text-fg hover:border-fg/40 hover:bg-surface-subtle",
  ghost:
    "text-fg-muted hover:text-fg hover:bg-surface-subtle",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

type CommonProps = { variant?: Variant; size?: Size; className?: string };

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CommonProps;
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...rest }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...rest} />
  ),
);
Button.displayName = "Button";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps;
export const ButtonLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = "primary", size = "md", ...rest }, ref) => (
    <a ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...rest} />
  ),
);
ButtonLink.displayName = "ButtonLink";
