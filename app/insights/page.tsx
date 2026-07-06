import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Insights } from "@/components/sections/Insights";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { videos } from "@/lib/content";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "The ASME content hub: newsletters, Clinician+ webinars, founder interviews, podcasts, and videos. Everything ASME publishes, in one place.",
};

const categories: { title: string; body: string; href: string; image?: string }[] = [
  {
    title: "Newsletters",
    body: "Every past issue, browsable and shareable, each with its own link. Connect the Mailchimp archive here.",
    href: "#",
  },
  {
    title: "Webinars (Clinician+)",
    body: "The Clinician+ series with speakers, dates, and recordings. Turning your big idea into a business.",
    href: "#videos",
    image: "/photos/webinar-clinician-plus.png",
  },
  {
    title: "Interviews",
    body: "Member and founder stories. Get inspired by clinicians who have built and shipped.",
    href: "/blog",
  },
  {
    title: "Podcasts",
    body: "Conversations with clinician founders, investors, and operators. Coming soon.",
    href: "#",
  },
  {
    title: "Videos",
    body: "Talks, panels, and highlights, including founder addresses and event recaps.",
    href: "#videos",
  },
];

export default function InsightsPage() {
  const featured = videos[0];

  return (
    <PageShell>
      <PageHeader
        eyebrow="Insights"
        title="Everything ASME publishes, in one place."
        lead="Newsletters, Clinician+ webinars, founder interviews, podcasts, and videos. Old content keeps working for you in search and email, and every piece links back to the next step."
      />

      {/* Browse by type */}
      <section className="relative section">
        <Container>
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Browse by type</span>
            <h2 className="h-display mt-3 text-display-lg balance">Find what you need.</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <Link
                  href={c.href}
                  className="card card-hover group flex h-full flex-col overflow-hidden"
                >
                  {c.image && (
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-subtle">
                      <Image
                        src={asset(c.image)}
                        alt={c.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl tracking-tight text-fg">{c.title}</h3>
                      <ArrowUpRight className="h-4 w-4 text-fg-muted transition-colors group-hover:text-brand-blue" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty">{c.body}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* News & Updates feed (recent articles) */}
      <Insights />

      {/* Videos */}
      {featured && (
        <section id="videos" className="section relative bg-surface-subtle">
          <Container>
            <Reveal className="max-w-2xl">
              <span className="eyebrow">Videos</span>
              <h2 className="h-display mt-3 text-display-lg balance">Watch &amp; listen.</h2>
            </Reveal>
            <Reveal className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <VideoEmbed youtubeId={featured.youtubeId} start={featured.start} title={featured.title} />
              </div>
              <div className="lg:col-span-5">
                <h3 className="font-display text-2xl tracking-tight text-fg balance">
                  {featured.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-fg-muted pretty">
                  {featured.blurb}
                </p>
              </div>
            </Reveal>
          </Container>
        </section>
      )}
    </PageShell>
  );
}
