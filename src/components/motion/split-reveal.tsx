"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { DUR, EASE, gsap, SplitText, useGSAP } from "@/lib/gsap";

type SplitRevealProps = {
  as?: ElementType;
  /** "lines" for headings (pattern 1), "chars" for intro/cover only (pattern 2) */
  type?: "lines" | "chars";
  /** Seconds before the reveal starts once in view */
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Masked line / char reveal on scroll (MOTION.md patterns 1 and 2).
 * Re-splits on resize and after fonts load (autoSplit). With reduced motion
 * the text is left as-is.
 */
export function SplitReveal({
  as: Tag = "div",
  type = "lines",
  delay = 0,
  className,
  children,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const chars = type === "chars";
      const split = SplitText.create(el, {
        type: chars ? "chars,lines" : "lines",
        mask: "lines",
        linesClass: "split-line",
        // Line splits keep words intact, so leave the text readable as-is
        // (aria-label is invalid on <p>); char splits need the label.
        aria: chars ? "auto" : "none",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(chars ? self.chars : self.lines, {
            yPercent: 105,
            duration: chars ? DUR.slow : DUR.base,
            ease: EASE.out,
            stagger: chars ? 0.025 : 0.08,
            delay,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }),
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [reduced, type, delay], revertOnUpdate: true },
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
