import { type ReactNode } from "react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

/**
 * Standard chrome for every interior page: scroll progress, sticky nav,
 * main content, and the global footer. Keeps the six tabs consistent.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
