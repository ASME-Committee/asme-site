import Image from "next/image";
import logo from "@/public/asme-logo.png";
import { cn } from "@/lib/cn";

/**
 * The official ASME wordmark + petal mark, kept exactly as on asme.org.au.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="Australian Society for Medical Entrepreneurship & Innovation"
      priority
      sizes="(max-width: 768px) 140px, 180px"
      className={cn("h-8 w-auto md:h-9", className)}
    />
  );
}
