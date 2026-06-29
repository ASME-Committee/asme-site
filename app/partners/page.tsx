import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PartnerTiers } from "@/components/sections/PartnerTiers";
import { partners, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "ASME's corporate, program, and ecosystem partners, and how to partner or sponsor. We work alongside the institutions, funds, and accelerators building Australian healthcare.",
};

export default function PartnersPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Partners"
        title="Building the ecosystem together."
        lead="ASME and AUSCEP work alongside the institutions, funds, and accelerators shaping Australian healthcare's next decade. Partnership is a commercial conversation aimed at organisations."
        cta={{ label: "Partner with us", href: `mailto:${site.email}?subject=Partnering with ASME` }}
      />

      {/* Partner grid */}
      <section className="section relative">
        <Container>
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Our partners</span>
            <h2 className="h-display mt-3 text-display-lg balance">In good company.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.03}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={p.name}
                  className="card card-hover flex h-28 items-center justify-center p-6 opacity-80 transition-opacity hover:opacity-100"
                >
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={200}
                    height={64}
                    className="max-h-14 w-auto object-contain"
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <PartnerTiers />
    </PageShell>
  );
}
