import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { events } from "@/lib/content";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";

export function Events() {
  const upcoming = events.filter((e) => e.upcoming);
  const past = events.filter((e) => !e.upcoming);

  return (
    <section id="events" className="section relative bg-surface-subtle">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Events</span>
          <h2 className="h-display mt-3 text-display-lg balance">
            High-signal rooms.<br />Invite-only by default.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
            Every event is engineered for outcomes. First cheques, first hires, first customers. Not generic networking.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.05}>
              <article className="card card-hover h-full p-7 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="chip">{e.type}</span>
                  <span className="font-mono text-xs tracking-wider text-brand-blue">
                    UPCOMING
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl tracking-tight text-fg balance">
                  {e.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty">
                  {e.blurb}
                </p>
                <div className="mt-auto pt-6 flex items-center gap-4 text-xs text-fg-subtle">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {e.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {e.city}
                  </span>
                </div>
                {e.href && (
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-brand-blue"
                  >
                    Register
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {past.length > 0 && (
          <Reveal className="mt-14 border-t border-border pt-10">
            <p className="text-xs uppercase tracking-[0.18em] text-fg-subtle">
              Recently
            </p>
            <ul className="mt-5 divide-y divide-border">
              {past.map((e) => (
                <li
                  key={e.title}
                  className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-medium text-fg">{e.title}</p>
                    <p className="mt-0.5 text-sm text-fg-muted pretty">{e.blurb}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4 text-xs text-fg-subtle">
                    <span>{e.date}</span>
                    <span>·</span>
                    <span>{e.city}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
