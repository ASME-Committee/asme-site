import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PartnerTiers } from "@/components/sections/PartnerTiers";
import { partners, site } from "@/lib/content";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "ASME's corporate, program, and ecosystem partners, and how to partner or sponsor. We work alongside the institutions, funds, and accelerators building Australian healthcare.",
};

export default function PartnersPage() {
  const platinum = partners.find((p) => p.tier === "platinum");
  const others = partners.filter((p) => p.tier !== "platinum");

  return (
    <PageShell>
      <PageHeader
        eyebrow="Partners"
        title="Building the ecosystem together."
        lead="ASME and AUSCEP work alongside the institutions, funds, and accelerators shaping Australian healthcare's next decade. Partnership is a commercial conversation aimed at organisations."
        cta={{ label: "Partner with us", href: `mailto:${site.email}?subject=Partnering with ASME` }}
      />

      {/* Platinum partner (featured above all others) */}
      {platinum && (
        <section className="section relative bg-surface-subtle">
          <Container>
            <Reveal className="max-w-2xl">
              <span className="eyebrow">Platinum partner</span>
              <h2 className="h-display mt-3 text-display-lg balance">Our lead partner.</h2>
            </Reveal>
            <Reveal className="mt-10">
              <a
                href={platinum.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platinum.name}
                className="card card-hover relative flex flex-col items-center gap-8 overflow-hidden p-10 md:flex-row md:justify-between md:p-14"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
                  style={{ background: "radial-gradient(circle, rgb(43 88 224 / 0.4), transparent 60%)" }}
                />
                <Image
                  src={asset(platinum.logo)}
                  alt={platinum.name}
                  width={460}
                  height={160}
                  className="max-h-24 w-auto object-contain md:max-h-28"
                />
                <div className="text-center md:max-w-sm md:text-right">
                  <span className="chip">Platinum partner</span>
                  <p className="mt-4 text-base leading-relaxed text-fg-muted pretty">
                    {platinum.name} is ASME's platinum partner, backing our programs and community at the highest level.
                  </p>
                </div>
              </a>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Other partners */}
      <section className="section relative">
        <Container>
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Our partners</span>
            <h2 className="h-display mt-3 text-display-lg balance">In good company.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {others.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.03}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={p.name}
                  className="card card-hover flex h-28 items-center justify-center p-6 opacity-80 transition-opacity hover:opacity-100"
                >
                  <Image
                    src={asset(p.logo)}
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
