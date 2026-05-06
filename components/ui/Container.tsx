import { cn } from "@/lib/cn";
import { type HTMLAttributes } from "react";

export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 lg:px-8", className)} {...rest} />
  );
}
