import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Insights } from "@/components/sections/Insights";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "The ASME content hub: news and updates, the newsletter archive, the webinar and video library, member and founder stories, and toolkits for clinician founders.",
};

const archives = [
  {
    title: "Newsletter archive",
    body: "Every past issue, browsable and shareable, each with its own URL. Connect the Mailchimp archive or import issues here.",
    href: "#",
  },
  {
    title: "Webinar & video library",
    body: "Recordings with titles, speakers, dates, and short summaries. Add embeds as recordings are published.",
    href: "#",
  },
  {
    title: "Member & founder stories",
    body: "The interview series. Get inspired by clinicians who have built and shipped.",
    href: "/blog",
  },
  {
    title: "Toolkits & resources",
    body: "Practical material for clinician founders: templates, checklists, and guides.",
    href: "#",
  },
];

export default function ResourcesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Resources"
        title="Everything ASME publishes, in one place."
        lead="News, newsletters, webinars, founder stories, and toolkits. Old content keeps working for you in search and email, and every piece links back to the next step."
      />

      {/* News & Updates feed (recent articles) */}
      <Insights />

      {/* Archives and libraries */}
      <section className="section relative bg-surface-subtle">
        <Container>
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Archives &amp; libraries</span>
            <h2 className="h-display mt-3 text-display-lg balance">Browse by type.</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {archives.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.05}>
                <Link
                  href={a.href}
                  className="card card-hover group flex h-full flex-col p-7"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl tracking-tight text-fg">{a.title}</h3>
                    <ArrowUpRight className="h-4 w-4 text-fg-muted transition-colors group-hover:text-brand-blue" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty">{a.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
