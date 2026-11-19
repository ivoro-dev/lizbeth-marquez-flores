"use client";

import { useLenis } from "lenis/react";
import { site } from "@/content";
import { Container } from "@/components/ui/container";

/** Teal footer, continues the Contact section. */
export function Footer() {
  const lenis = useLenis();

  return (
    <footer className="bg-teal text-ink pb-8 md:pb-10">
      <Container className="flex items-baseline justify-between gap-6 text-base">
        <p>© 2026 {site.name}</p>
        <a
          href="#cover"
          onClick={(e) => {
            if (!lenis) return;
            e.preventDefault();
            lenis.scrollTo(0, { duration: 1.6 });
          }}
          className="focus-visible:outline-ink bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 outline-offset-4 transition-[background-size] duration-500 ease-[var(--ease-out-expo)] hover:bg-[length:100%_1px] focus-visible:outline-2"
        >
          Back to top
        </a>
      </Container>
    </footer>
  );
}
