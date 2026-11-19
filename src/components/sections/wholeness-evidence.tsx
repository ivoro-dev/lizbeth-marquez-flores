"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Img } from "@/types/content";
import { ClipImage } from "@/components/motion/clip-image";
import { Label } from "@/components/ui/label";
import { Rule } from "@/components/ui/rule";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";

const find = (images: Img[], name: string) =>
  images.find((i) => i.src.endsWith(`/${name}.webp`));

/**
 * Wholeness: (1) bio before/after, After wipes in on scroll;
 * (2) "One month later": profile screenshots + 30-day insights.
 * Screenshots only, no numbers in copy.
 */
export function WholenessEvidence({ images }: { images: Img[] }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const bioBefore = find(images, "bio-before");
  const bioAfter = find(images, "bio-after");
  const before = find(images, "profile-before");
  const after = find(images, "profile-after-1-month");
  const insights = find(images, "insights-30-days");

  useGSAP(
    () => {
      const el = root.current?.querySelector("[data-wipe]");
      if (!el || reduced) return;
      gsap.fromTo(
        el,
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 45%",
            scrub: true,
          },
        },
      );
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  const rows = [
    { label: "Before", img: bioBefore, wipe: false },
    { label: "After", img: bioAfter, wipe: true },
  ];

  return (
    <div
      ref={root}
      className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-x-6"
    >
      <div className="grid gap-16 lg:col-span-7 lg:col-start-6">
        <div>
          <Label as="h4">Profile positioning and bio rewrite</Label>
          <div className="mt-6">
            <Rule />
            {rows.map(
              (r) =>
                r.img && (
                  <div
                    key={r.label}
                    className="grid gap-3 py-6 md:grid-cols-[9rem_1fr] md:gap-6"
                  >
                    <Label tone="current" className="opacity-65 md:pt-1.5">
                      {r.label}
                    </Label>
                    <div data-wipe={r.wipe || undefined}>
                      <Image
                        src={r.img.src}
                        alt={r.img.alt}
                        width={r.img.width}
                        height={r.img.height}
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                ),
            )}
            <Rule />
          </div>
        </div>

        {before && after && (
          <div>
            <Label as="h4">One month later</Label>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[
                { label: "Before", img: before },
                { label: "One month later", img: after },
              ].map((x) => (
                <figure key={x.label}>
                  <ClipImage
                    image={x.img}
                    sizes="(min-width: 640px) 30vw, 100vw"
                  />
                  <figcaption className="mt-3">
                    <Label tone="current" className="opacity-65">
                      {x.label}
                    </Label>
                  </figcaption>
                </figure>
              ))}
            </div>
            {insights && (
              <figure className="mt-6 max-w-[28rem]">
                <ClipImage
                  image={insights}
                  alt=""
                  sizes="(min-width: 640px) 28rem, 100vw"
                />
                <figcaption className="text-label mt-3 leading-snug opacity-65">
                  {insights.alt}
                </figcaption>
              </figure>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
