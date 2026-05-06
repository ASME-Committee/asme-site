import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/LogoMark";
import { site } from "@/lib/content";

const cols = [
  {
    heading: "Society",
    links: [
      { label: "What we do", href: "#what" },
      { label: "Pathways", href: "#pathways" },
      { label: "AUSCEP", href: "#auscep" },
      { label: "Community", href: "#community" },
    ],
  },
  {
    heading: "Engage",
    links: [
      { label: "Events", href: "#events" },
      { label: "Insights", href: "#insights" },
      { label: "Newsletter", href: "#join" },
      { label: "Partners", href: "#partners" },
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
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface-subtle">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <LogoMark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted pretty">
              The home for clinicians building, investing in, and shaping the future of healthcare. Founded by clinicians. Run by clinicians. Open by application.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-fg-subtle">
              {site.fullName}
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {cols.map((col) => (
              <div key={col.heading}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-fg">
                  {col.heading}
                </h4>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map((l) => {
                    const external = l.href.startsWith("http");
                    return (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          {...(external && {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                          className="text-fg-muted hover:text-fg transition-colors"
                        >
                          {l.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-6">
          <p className="text-xs text-fg-subtle">
            © {new Date().getFullYear()} {site.name}. Built by clinicians, for clinicians.
          </p>
        </div>
      </Container>
    </footer>
  );
}
