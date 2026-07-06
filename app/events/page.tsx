import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Events } from "@/components/sections/Events";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "ASME events: founder and investor dinners, pitch nights, roundtables, workshops, webinars, and networking nights. Register for what is coming up.",
};

export default function EventsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Events"
        title="High-signal rooms, all year round."
        lead="Time-bound events engineered for outcomes: first cheques, first hires, first customers. Register for what is coming up, and catch recaps from what you missed."
        cta={{ label: "Join to get invites", href: site.joinUrl, external: true }}
      />

      {/* Upcoming + recent (reuses the homepage Events section) */}
      <Events />

      {/* Webinars & networking note */}
      <section className="section relative bg-surface-subtle">
        <Container>
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Webinars &amp; networking nights</span>
            <h2 className="h-display mt-3 text-display-lg balance">
              Online and in person.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
              Recordings of past webinars live in the Insights hub. Networking nights run in Sydney, Melbourne, and Brisbane. Members get first access to RSVPs.
            </p>
          </Reveal>
        </Container>
      </section>
    </PageShell>
  );
}
