"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { INTRO_SEEN_KEY, markIntroDone } from "@/lib/intro";
import { DUR, EASE, gsap, useGSAP } from "@/lib/gsap";

/**
 * Preloader:
 * - Top-right "LMF" mark
 * - Large 000 to 100 counter at bottom (orange, Gloock font)
 * - Number animates smoothly from 000 to 100
 * - Slides up to reveal cover section
 */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const running = useRef(false);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);

  // Lenis mounts after the first render; keep it paused while the intro runs.
  useEffect(() => {
    lenisRef.current = lenis;
    if (lenis && running.current) lenis.stop();
  }, [lenis]);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const finish = () => {
        running.current = false;
        lenisRef.current?.start();
        document.documentElement.style.overflow = "";
        try {
          sessionStorage.setItem(INTRO_SEEN_KEY, "1");
        } catch {}
        markIntroDone();
        setGone(true);
      };

      let seen = false;
      try {
        if (process.env.NODE_ENV === "production") {
          seen = sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
        }
      } catch {}

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (seen || reduced) {
        finish();
        return;
      }

      running.current = true;
      lenisRef.current?.stop();
      document.documentElement.style.overflow = "hidden";
      window.scrollTo(0, 0);

      const count = el.querySelector<HTMLElement>("[data-intro-count]");
      const mark = el.querySelector<HTMLElement>("[data-intro-mark]");

      gsap.set(mark, { autoAlpha: 0, y: -8 });
      gsap.to(mark, { autoAlpha: 1, y: 0, duration: DUR.fast, ease: EASE.out });

      let rafId: number;
      const startTime = performance.now();
      const countDuration = 1300; // 1.3s for 000 -> 100

      const updateCounter = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / countDuration);

        // Smooth ease-in-out curve
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const val = Math.round(eased * 100);
        if (count) {
          count.textContent = String(val).padStart(3, "0");
        }

        if (progress < 1) {
          rafId = requestAnimationFrame(updateCounter);
        } else {
          // Reached 100: brief pause, then slide out
          gsap.delayedCall(0.18, () => {
            const exitTl = gsap.timeline({ onComplete: finish });

            exitTl
              .to(
                [count, mark],
                { autoAlpha: 0, duration: 0.3, ease: EASE.soft },
                0,
              )
              .to(
                el,
                {
                  yPercent: -100,
                  duration: 0.85,
                  ease: EASE.inOut,
                },
                0.05,
              )
              .call(() => markIntroDone(), [], 0.3);
          });
        }
      };

      rafId = requestAnimationFrame(updateCounter);

      return () => {
        cancelAnimationFrame(rafId);
        gsap.killTweensOf(el);
        if (count) gsap.killTweensOf(count);
        if (mark) gsap.killTweensOf(mark);
      };
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      data-intro
      aria-hidden="true"
      className="bg-ink text-paper fixed inset-0 z-[100] flex flex-col justify-between px-[clamp(20px,4vw,64px)] py-[clamp(20px,3vw,40px)] select-none"
    >
      {/* Top right LMF */}
      <div className="flex w-full justify-end">
        <span
          data-intro-mark
          className="font-display text-paper text-2xl leading-none tracking-[-0.02em] md:text-3xl"
        >
          LMF
        </span>
      </div>

      {/* Bottom counter */}
      <div>
        <p
          data-intro-count
          className="font-display text-orange text-[clamp(5rem,22vw,22rem)] leading-[0.8] tracking-[-0.04em] tabular-nums"
        >
          000
        </p>
      </div>
    </div>
  );
}
