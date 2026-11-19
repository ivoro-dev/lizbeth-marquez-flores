import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = ComponentProps<"section"> & {
  containerClassName?: string;
};

export function Section({
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-20 md:py-32", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
