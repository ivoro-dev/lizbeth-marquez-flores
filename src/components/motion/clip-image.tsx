"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Img } from "@/types/content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { DUR, EASE, gsap, useGSAP } from "@/lib/gsap";

type ClipImageProps = {
  image: Img;
  /** next/image `sizes`, required so the right file size loads */
  sizes: string;
  priority?: boolean;
  /** Scrubbed parallax inside the frame (MOTION.md pattern 5) */
  parallax?: boolean;
  /** Frame aspect ratio, e.g. "3 / 4". Defaults to the image's own ratio. */
  aspect?: string;
  className?: string;
  imgClassName?: string;
  /** Use "" when the image is decorative */
  alt?: string;
};

/**
 * Image that reveals with a bottom-up clip (MOTION.md pattern 4), optional
 * parallax. With reduced motion the image is shown as-is.
 */
export function ClipImage({
  image,
  sizes,
  priority,
  parallax,
  aspect,
  className,
  imgClassName,
  alt,
}: ClipImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const wrap = frame.current;
      if (!wrap || reduced) return;
      const q = gsap.utils.selector(wrap);
      const img = q("[data-clip-img]");
      const trigger = { trigger: wrap, start: "top 80%", once: true };

      gsap.fromTo(
        wrap,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: DUR.slow,
          ease: EASE.inOut,
          scrollTrigger: trigger,
        },
      );
      gsap.fromTo(
        img,
        { scale: 1.25 },
        {
          scale: 1,
          duration: DUR.slow,
          ease: EASE.out,
          scrollTrigger: trigger,
        },
      );

      if (parallax) {
        gsap.fromTo(
          q("[data-clip-parallax]"),
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: frame, dependencies: [reduced, parallax] },
  );

  return (
    <div
      ref={frame}
      className={cn("bg-ink/5 relative overflow-hidden", className)}
      style={{ aspectRatio: aspect ?? `${image.width} / ${image.height}` }}
    >
      <div
        data-clip-parallax
        className={cn(
          "absolute inset-x-0",
          parallax ? "-top-[8%] h-[116%]" : "inset-y-0",
        )}
      >
        <Image
          data-clip-img
          src={image.src}
          alt={alt ?? image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      </div>
    </div>
  );
}
