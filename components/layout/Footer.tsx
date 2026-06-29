import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/LogoMark";
import { NewsletterSignup } from "@/components/layout/NewsletterSignup";
import { site, partners } from "@/lib/content";

const cols = [
  {
    heading: "Explore",
    links: [
      { label: "About", href: "/about" },
      { label: "Programs", href: "/programs" },
      { label: "Events", href: "/events" },
      { label: "Resources", href: "/resources" },
      { label: "Community", href: "/community" },
      { label: "Partners", href: "/partners" },
    ],
  },
  {
    heading: "Connect",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/australian-society-for-medical-entrepreneurship-innovation-asme/",
      },
      { label: site.email, href: `mailto:${site.email}` },
      { label: "Join (free)", href: site.joinUrl },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface-subtle">
      <Container className="py-16 md:py-20">
        {/* Top: brand + newsletter */}
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <LogoMark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted pretty">
              The home for clinicians building, investing in, and shaping the future of healthcare. Founded by clinicians. Run by clinicians.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-fg-subtle">
              {site.fullName}
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-12">
            {cols.map((col) => (
              <div key={col.heading} className="sm:col-span-3">
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-fg">
                  {col.heading}
                </h4>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map((l) => {
                    const external = l.href.startsWith("http") || l.href.startsWith("mailto");
                    return (
                      <li key={l.label}>
                        {external ? (
                          <a
                            href={l.href}
                            {...(l.href.startsWith("http") && {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            })}
                            className="text-fg-muted transition-colors hover:text-fg"
                          >
                            {l.label}
                          </a>
                        ) : (
                          <Link
                            href={l.href}
                            className="text-fg-muted transition-colors hover:text-fg"
                          >
                            {l.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className="col-span-2 sm:col-span-6">
              <NewsletterSignup />
            </div>
          </div>
        </div>

        {/* Partner trust strip */}
        <div className="mt-14 border-t border-border pt-10">
          <p className="text-xs uppercase tracking-[0.18em] text-fg-subtle">
            In good company
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6 opacity-70">
            {partners.slice(0, 7).map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.name}
                className="transition-opacity hover:opacity-100"
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={160}
                  height={48}
                  className="h-9 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Acknowledgement of Country */}
        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-fg-subtle">
          ASME acknowledges the Traditional Custodians of the lands on which we live and work, and pays respect to Elders past and present. We recognise their continuing connection to land, waters, and community.
        </p>

        {/* Bottom legal row */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Built by clinicians, for clinicians.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-fg">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-fg">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
