import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/content";

const bullets = [
  "Free to join. No clinical-society dues.",
  "Application reviewed within 5 working days.",
  "Member intros begin in week one.",
];

export function JoinCTA() {
  return (
    <section
      id="join"
      className="relative isolate overflow-hidden bg-brand-ink py-24 md:py-32 text-white"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl animate-glow"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgb(43 88 224 / 0.6), transparent 60%), radial-gradient(circle at 70% 70%, rgb(242 146 156 / 0.5), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/60">
            Join the community
          </span>
          <h2 className="h-display mt-4 text-display-xl text-white balance">
            Stop being the only{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(120deg,#A8C7F9,#F2929C)" }}
            >
              clinician founder
            </span>{" "}
            in the room.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70 pretty">
            Tell us a bit about yourself. We'll get you onto the member roster, into the next event, and connected to the right people in your city.
          </p>

          <div className="mt-10 flex justify-center">
            <ButtonLink
              href={site.joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="bg-white text-brand-ink hover:bg-white/90 shadow-lift"
            >
              Apply to join
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <ul className="mx-auto mt-10 flex flex-col items-center gap-3 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8">
            {bullets.map((line) => (
              <li key={line} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-coral-soft" />
                {line}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
