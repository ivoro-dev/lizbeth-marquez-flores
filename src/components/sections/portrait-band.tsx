"use client";

import Image from "next/image";
import { useRef } from "react";
import { bandPortrait } from "@/content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { DUR, EASE, gsap, useGSAP } from "@/lib/gsap";

/**
 * Full-width portrait between Cover and About. On enter the frame opens
 * top-to-bottom while the photo slides down into place; then scrubbed parallax.
 */
export function PortraitBand() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(root);
      const frame = q("[data-band-frame]")[0];
      if (!frame) return;
      const enter = { trigger: frame, start: "top 85%", once: true };

      // Slide down on enter
      gsap.fromTo(
        frame,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: DUR.slow,
          ease: EASE.inOut,
          scrollTrigger: enter,
        },
      );
      gsap.fromTo(
        q("[data-band-slide]"),
        { yPercent: -12 },
        {
          yPercent: 0,
          duration: DUR.slow + 0.3,
          ease: EASE.out,
          scrollTrigger: enter,
        },
      );

      // Parallax: the taller photo layer drifts up inside the frame
      gsap.fromTo(
        q("[data-band-parallax]"),
        { yPercent: 0 },
        {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <div ref={root} className="overflow-hidden">
      <div
        data-band-frame
        className="relative h-svh w-full max-w-full overflow-hidden"
      >
        <div data-band-parallax className="absolute inset-x-0 top-0 h-[112%]">
          <div data-band-slide className="absolute inset-0">
            <Image
              src={bandPortrait.src}
              alt={bandPortrait.alt}
              fill
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
