"use client";

import Image from "next/image";
import { useRef } from "react";
import { coverPortrait, site } from "@/content";
import { Container } from "@/components/ui/container";
import { onIntroDone } from "@/lib/intro";
import { DUR, EASE, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Cover. Rule #1: her full name is always fully legible. The cut-out portrait
 * sits BEHIND the name (z-index), so letters are never covered; only light
 * parts of the photo (jeans, wall-free cut-out) pass behind the type.
 */
export function Cover() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const lines = q("[data-name-line]");
      const frame = q("[data-portrait-frame]");
      const img = q("[data-portrait-img]");

      if (reduced) return;

      // Hidden start state (set before paint, so no flash).
      gsap.set(lines, { yPercent: 130 });
      gsap.set(frame, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(img, { scale: 1.08 });

      const enter = () =>
        gsap
          .timeline({ defaults: { ease: EASE.out } })
          .to(lines, { yPercent: 0, duration: DUR.slow, stagger: 0.1 }, 0)
          .to(
            frame,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: DUR.slow,
              ease: EASE.inOut,
            },
            0.05,
          )
          .to(img, { scale: 1, duration: DUR.slow + 0.4 }, 0.05);

      const off = onIntroDone(enter);

      // Scroll: portrait grows slightly, name lines drift apart.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const st = {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };
        gsap.to("[data-drift='left']", {
          xPercent: -4,
          ease: "none",
          scrollTrigger: st,
        });
        gsap.to("[data-drift='right']", {
          xPercent: 4,
          ease: "none",
          scrollTrigger: st,
        });
        gsap.to("[data-portrait-scale]", {
          scale: 1.08,
          ease: "none",
          scrollTrigger: st,
        });
      });

      // Portrait floats toward the cursor, capped to a small range.
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
      let move: ((e: MouseEvent) => void) | undefined;
      if (fine.matches && frame[0]) {
        const MAX_X = 22;
        const MAX_Y = 16;
        const fx = gsap.quickTo(frame[0], "x", {
          duration: 0.9,
          ease: "power3.out",
        });
        const fy = gsap.quickTo(frame[0], "y", {
          duration: 0.9,
          ease: "power3.out",
        });
        move = (e) => {
          const nx = (e.clientX / window.innerWidth - 0.5) * 2;
          const ny = (e.clientY / window.innerHeight - 0.5) * 2;
          fx(nx * MAX_X);
          fy(ny * MAX_Y);
        };
        window.addEventListener("mousemove", move);
      }

      document.fonts.ready.then(() => ScrollTrigger.refresh());

      return () => {
        off();
        if (move) window.removeEventListener("mousemove", move);
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="cover"
      aria-label="Cover"
      className="relative overflow-x-clip pt-[clamp(72px,8vw,112px)] pb-[clamp(24px,3vw,40px)]"
    >
      <Container className="relative flex min-h-[calc(100svh-clamp(72px,8vw,112px)-clamp(24px,3vw,40px))] flex-col">
        {/* Cut-out portrait: stands behind the name, never in front of it.
            Mobile: centred-right above the name, feet tucked behind "Lizbeth".
            Desktop: just right of centre, full height, legs behind "-Flores". */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 bottom-[calc(18vw*2.2)] md:bottom-0"
        >
          <div
            data-portrait-scale
            className="absolute inset-x-0 bottom-0 flex h-[min(100%,460px)] origin-bottom justify-center md:h-[min(100%,920px)] md:pl-[16%]"
          >
            <div data-portrait-frame className="relative h-full">
              <Image
                data-portrait-img
                src={coverPortrait.src}
                alt=""
                width={coverPortrait.width}
                height={coverPortrait.height}
                priority
                sizes="(min-width: 768px) 55vw, 95vw"
                className="h-full w-auto origin-bottom object-contain"
              />
            </div>
          </div>
        </div>

        <h1 className="font-display text-ink relative z-[1] mt-[clamp(28px,4vw,56px)] flex flex-1 flex-col justify-end leading-[0.9] tracking-[-0.02em]">
          <span className="sr-only">{site.name}</span>

          <span
            data-drift="left"
            aria-hidden="true"
            className="split-line block"
          >
            <span
              data-name-line
              className="block text-[18vw] md:text-[min(12vw,15rem)]"
            >
              {site.firstName}
            </span>
          </span>

          <span aria-hidden="true" className="block">
            {/* Desktop: one line */}
            <span data-drift="right" className="split-line hidden md:block">
              <span
                data-name-line
                className="block text-[min(12vw,15rem)] whitespace-nowrap"
              >
                <span className="bg-teal text-ink box-decoration-clone px-[0.04em]">
                  {site.lastName.split("-")[0]}
                </span>
                -{site.lastName.split("-").slice(1).join("-")}
              </span>
            </span>
            {/* Mobile: two lines */}
            <span className="split-line block md:hidden">
              <span data-name-line className="block text-[18vw]">
                <span className="bg-teal text-ink box-decoration-clone px-[0.04em]">
                  Marquez
                </span>
                -
              </span>
            </span>
            <span className="split-line block md:hidden">
              <span data-name-line className="block text-[18vw]">
                Flores
              </span>
            </span>
          </span>
        </h1>
      </Container>
    </section>
  );
}
