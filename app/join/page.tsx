import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { JoinForm } from "@/components/sections/JoinForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Join ASME",
  description:
    "Apply to join the Australian Society for Medical Entrepreneurship & Innovation. Free to join, application reviewed within 5 working days.",
};

export default function JoinPage() {
  return (
    <>
      <Nav />
      <main className="py-16 md:py-24">
      <Container className="max-w-2xl">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-fg-muted">
            Join the community
          </span>
          <h1 className="h-display mt-4 text-display-lg text-fg">Apply to join {site.name}</h1>
          <p className="mx-auto mt-4 max-w-xl text-fg-muted">
            Tell us a bit about yourself. We'll get you onto the member roster, into the
            next event, and connected to the right people in your city.
          </p>
        </div>
        <JoinForm />
      </Container>
      </main>
      <Footer />
    </>
  );
}
