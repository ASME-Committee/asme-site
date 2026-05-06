import {
  Stethoscope,
  HeartPulse,
  Activity,
  Pill,
  GraduationCap,
  Siren,
  Brain,
  Microscope,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { clinicianRoles, type ClinicianRole } from "@/lib/content";

const iconMap: Record<ClinicianRole["glyph"], LucideIcon> = {
  stethoscope: Stethoscope,
  "heart-pulse": HeartPulse,
  activity: Activity,
  pill: Pill,
  graduation: GraduationCap,
  siren: Siren,
  brain: Brain,
  microscope: Microscope,
};

export function ClinicianRoles() {
  return (
    <section id="clinicians" className="section relative">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Who joins ASME</span>
          <h2 className="h-display mt-3 text-display-lg balance">
            Every clinical discipline.<br />Every career stage.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {clinicianRoles.map((role, i) => {
            const Icon = iconMap[role.glyph];
            return (
              <Reveal key={role.title} delay={i * 0.04}>
                <SpotlightCard glow={i % 2 === 0 ? "blue" : "coral"}>
                  <article className="card card-hover h-full p-6 flex flex-col">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient-subtle text-brand-blue transition-transform duration-300 group-hover/spot:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-xl tracking-tight text-fg">
                      {role.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted pretty">
                      {role.examples}
                    </p>
                  </article>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-10 text-sm text-fg-subtle">
          Plus: founders, intrapreneurs, consultants, investors, journalists, and
          policy-makers with clinical backgrounds. If you have ever cared for a
          patient, you belong here.
        </Reveal>
      </Container>
    </section>
  );
}
