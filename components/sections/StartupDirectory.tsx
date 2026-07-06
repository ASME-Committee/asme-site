"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { startups } from "@/lib/startups";
import { asset } from "@/lib/asset";

export function StartupDirectory() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return startups;
    return startups.filter((s) =>
      `${s.name} ${s.company} ${s.sector} ${s.description}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <section id="directory" className="section relative bg-surface-subtle">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Startup directory</span>
          <h2 className="h-display mt-3 text-display-lg balance">
            Ventures built by our members.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
            Clinician founders from AUSCEP and the ASME community. Search by name, venture, or sector.
          </p>
        </Reveal>

        {/* Search */}
        <Reveal className="mt-8">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search founders, ventures, sectors..."
              aria-label="Search the startup directory"
              className="h-12 w-full rounded-full border border-border bg-surface-elevated pl-11 pr-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus-visible:border-fg/40 focus-visible:ring-2 focus-visible:ring-accent/40"
            />
          </div>
          <p className="mt-3 text-sm text-fg-subtle">
            {filtered.length} {filtered.length === 1 ? "venture" : "ventures"}
          </p>
        </Reveal>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <article key={`${s.name}-${s.company}`} className="card card-hover flex h-full gap-4 p-5">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border bg-surface-subtle">
                  <Image
                    src={asset(s.photo)}
                    alt={s.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold tracking-tight text-fg">{s.name}</h3>
                  <p className="text-sm text-brand-blue">{s.company}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-fg-subtle">
                    {s.sector}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted pretty">
                    {s.description}
                  </p>
                  {s.linkedin && (
                    <a
                      href={s.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.name} on LinkedIn`}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-brand-blue"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-fg-muted">No ventures match &ldquo;{query}&rdquo;.</p>
        )}
      </Container>
    </section>
  );
}
