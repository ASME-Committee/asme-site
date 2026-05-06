"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/LogoMark";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-surface/75 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2 -ml-1">
          <LogoMark />
          <span className="sr-only">ASME, home</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-full px-3 py-1.5 text-sm text-fg-muted transition-colors hover:text-fg hover:bg-surface-subtle"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={site.joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Join the community
          </ButtonLink>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-elevated text-fg-muted"
          >
            <span
              className={cn(
                "block h-px w-4 bg-current transition-all",
                open ? "translate-y-0 rotate-45" : "-translate-y-1",
              )}
            />
            <span
              className={cn(
                "absolute block h-px w-4 bg-current transition-all",
                open ? "-rotate-45" : "translate-y-1",
              )}
            />
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "md:hidden overflow-hidden border-b border-border bg-surface/95 backdrop-blur-xl transition-[max-height,opacity] duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="py-4 flex flex-col gap-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-fg-muted hover:bg-surface-subtle hover:text-fg"
            >
              {n.label}
            </Link>
          ))}
          <ButtonLink
            href={site.joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            variant="primary"
            size="sm"
            className="mt-2 self-start"
          >
            Join the community
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
