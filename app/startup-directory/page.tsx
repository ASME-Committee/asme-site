import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { StartupDirectory } from "@/components/sections/StartupDirectory";

export const metadata: Metadata = {
  title: "Startup Directory",
  description:
    "The AUSCEP and ASME startup directory: clinician founders and the ventures they are building. Search by name, venture, or sector.",
};

export default function StartupDirectoryPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Startup directory"
        title="Ventures built by our members."
        lead="Clinician founders from AUSCEP and the ASME community. Search by name, venture, or sector."
      />
      <StartupDirectory />
    </PageShell>
  );
}
