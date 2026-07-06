import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { Manifesto } from "@/components/sections/Manifesto";
import { ClinicianRoles } from "@/components/sections/ClinicianRoles";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Pathways } from "@/components/sections/Pathways";
import { Auscep } from "@/components/sections/Auscep";
import { MemberSpotlights } from "@/components/sections/MemberSpotlights";
import { Insights } from "@/components/sections/Insights";
import { Events } from "@/components/sections/Events";
import { JoinCTA } from "@/components/sections/JoinCTA";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Partners />
        <Manifesto />
        <ClinicianRoles />
        <WhatWeDo />
        <Pathways />
        <Auscep />
        <MemberSpotlights />
        <Insights />
        <Events />
        <JoinCTA />
      </main>
      <Footer />
    </>
  );
}
