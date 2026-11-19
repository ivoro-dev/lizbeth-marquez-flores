"use client";

import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useRef, useState } from "react";
import { media, projects } from "@/content";
import type { MediaItem } from "@/types/content";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { SplitReveal } from "@/components/motion/split-reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { EASE, gsap, useGSAP } from "@/lib/gsap";

const allImages = projects.flatMap((p) => p.images);
const img = (path: string) => allImages.find((i) => i.src.endsWith(path));

/** Hover preview per row kind (DESIGN.md). */
const previews = {
  "podcast-guest": img("/locks-of-liz/product-collection.webp"),
  "podcast-host": img("/work-drama/host-49.webp"),
  tv: img("/boss-babes/brand-kit.webp"),
} satisfies Record<MediaItem["kind"], unknown>;

const verb = (k: MediaItem["kind"]) => (k === "tv" ? "Watch" : "Listen");

export function ListenWatch() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState<MediaItem["kind"] | null>(null);

  useGSAP(
    () => {
      const el = root.current;
      const box = el?.querySelector<HTMLElement>("[data-preview]");
      if (!el || !box || reduced) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
        return;
      gsap.set(box, {
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
        scale: 0.85,
      });
      const toX = gsap.quickTo(box, "x", { duration: 0.6, ease: EASE.soft });
      const toY = gsap.quickTo(box, "y", { duration: 0.6, ease: EASE.soft });
      const move = (e: PointerEvent) => {
        toX(e.clientX);
        toY(e.clientY);
      };
      window.addEventListener("pointermove", move, { passive: true });
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  const show = (kind: MediaItem["kind"] | null) => {
    setActive(kind);
    if (reduced) return;
    const box = root.current?.querySelector("[data-preview]");
    if (!box) return;
    gsap.to(box, {
      autoAlpha: kind ? 1 : 0,
      scale: kind ? 1 : 0.85,
      duration: 0.5,
      ease: EASE.out,
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={root}
      id="listen-watch"
      data-theme="ink"
      aria-label="Listen & Watch"
      className="bg-ink text-paper relative py-20 md:py-32"
    >
      <Container>
        <SplitReveal
          as="h2"
          className="font-display text-display leading-[0.95] tracking-[-0.02em]"
        >
          Listen &amp;{" "}
          <span className="bg-orange text-ink box-decoration-clone px-[0.04em]">
            Watch
          </span>
        </SplitReveal>

        <ul className="mt-14 border-t border-current/14 md:mt-20">
          {media.map((m, i) => (
            <li key={m.href} className="border-b border-current/14">
              <a
                href={m.href}
                target="_blank"
                rel="noreferrer"
                data-cursor={verb(m.kind)}
                onPointerEnter={() => show(m.kind)}
                onPointerLeave={() => show(null)}
                onFocus={() => show(null)}
                className="group focus-visible:outline-orange grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-7 outline-offset-[-2px] focus-visible:outline-2 md:grid-cols-[5rem_1fr_auto] md:gap-x-6 md:py-10"
              >
                <span className="text-label self-start pt-[0.6em] tabular-nums opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3">
                  {m.featured && (
                    <Label tone="current" className="text-orange mb-3 block">
                      Featured
                    </Label>
                  )}
                  <span
                    className={cn(
                      "font-display block leading-[1.05] tracking-[-0.01em] text-balance",
                      m.featured ? "text-h1" : "text-h2",
                    )}
                  >
                    {m.title}
                  </span>
                  <Label tone="current" className="mt-3 block opacity-65">
                    {m.outlet} · {verb(m.kind)}
                  </Label>
                </span>
                <ArrowRightIcon
                  aria-hidden="true"
                  weight="thin"
                  className="group-hover:text-orange size-8 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-45 md:size-12"
                />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>

      {/* Hover preview (desktop) */}
      <div
        data-preview
        aria-hidden="true"
        className="pointer-events-none invisible fixed top-0 left-0 z-30 hidden aspect-[4/5] w-[min(18vw,280px)] overflow-hidden lg:block"
      >
        {(Object.keys(previews) as MediaItem["kind"][]).map((k) => {
          const p = previews[k];
          return (
            p && (
              <Image
                key={k}
                src={p.src}
                alt=""
                fill
                sizes="280px"
                className={cn(
                  "object-cover transition-opacity duration-300",
                  active === k ? "opacity-100" : "opacity-0",
                )}
              />
            )
          );
        })}
      </div>
    </section>
  );
}
