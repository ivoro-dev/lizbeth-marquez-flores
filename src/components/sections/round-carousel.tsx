"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { scopeCards } from "@/content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";

const CARDS = scopeCards.map((c, i) => ({
  ...c,
  number: String(i + 1).padStart(2, "0"),
}));

// Dial geometry per breakpoint. Cards sit on the top arc of a circle whose
// centre is below the stage; `step` is the angle between neighbouring cards
// (arc length = card width + gap, so cards never overlap).
const LAYOUT = {
  lg: { radius: 900, card: 280 },
  sm: { radius: 520, card: 200 },
} as const;
type LayoutKey = keyof typeof LAYOUT;

const GAP = 32;
const stepDeg = (k: LayoutKey) =>
  ((LAYOUT[k].card + GAP) / LAYOUT[k].radius) * (180 / Math.PI);
const mid = (CARDS.length - 1) / 2;
// Card 01 starts centred; scrolling down rotates clockwise (cards move right),
// bringing each next card (waiting on the left) to the centre.
const startRot = (k: LayoutKey) => -mid * stepDeg(k);
const endRot = (k: LayoutKey) => mid * stepDeg(k);

/**
 * Semicircle Carousel:
 * Positioned directly below the Cover (Hero) section.
 * Cards sit along the curved perimeter of a large circle.
 * When scrolling down: rotates clockwise (to the right).
 * When scrolling up: rotates counter-clockwise (to the left).
 */
export function RoundCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [layout, setLayout] = useState<LayoutKey>("lg");

  useGSAP(
    () => {
      const section = sectionRef.current;
      const wheel = wheelRef.current;
      if (!section || !wheel) return;

      const mm = gsap.matchMedia();

      const setup = (k: LayoutKey) => {
        setLayout(k);
        if (reduced) {
          gsap.set(wheel, { rotation: startRot(k) });
          return;
        }
        gsap.fromTo(
          wheel,
          { rotation: startRot(k) },
          {
            rotation: endRot(k),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      };

      mm.add("(min-width: 1024px)", () => setup("lg"));
      mm.add("(max-width: 1023px)", () => setup("sm"));

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  const { radius, card: cardW } = LAYOUT[layout];
  const step = stepDeg(layout);

  return (
    <section
      ref={sectionRef}
      id="visual-strategy"
      aria-label="Areas of work"
      className="bg-teal text-ink relative flex h-svh min-h-[560px] w-full flex-col justify-between overflow-hidden rounded-t-[50%_clamp(120px,26vw,440px)] pt-10 select-none md:pt-14"
    >
      {/* Semicircle Display Stage */}
      <div className="relative flex flex-1 items-center justify-center">
        {/* Central Rotating Wheel Hub: sits `radius` below the stage centre */}
        <div
          ref={wheelRef}
          className="absolute left-1/2 h-0 w-0"
          style={{
            top: `calc(50% + ${radius}px)`,
            transform: `rotate(${startRot(layout)}deg)`,
          }}
        >
          {/* Subtle track guide (dashed circle) */}
          <div
            aria-hidden="true"
            className="border-paper/50 pointer-events-none absolute rounded-full border border-dashed"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              left: `-${radius}px`,
              top: `-${radius}px`,
            }}
          />

          {CARDS.map((card, i) => {
            const angle = (mid - i) * step;
            return (
              <div
                key={card.src}
                className="absolute top-0 left-0"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                }}
              >
                <article
                  style={{ width: `${cardW}px` }}
                  className="group border-ink/15 bg-paper relative aspect-[3/4] overflow-hidden rounded-sm border shadow-[0_18px_45px_-10px_rgba(17,17,17,0.18)]"
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1024px) 280px, 200px"
                    className="object-cover object-top"
                  />

                  {/* Gradient Legibility Overlay */}
                  <div className="from-ink/90 via-ink/25 absolute inset-0 bg-gradient-to-t to-transparent" />

                  {/* Card Editorial Labels */}
                  <div className="text-paper absolute inset-x-0 bottom-0 p-4">
                    <span className="text-teal text-[10px] font-semibold tracking-widest uppercase">
                      {card.number}
                    </span>
                    <p className="font-display text-paper mt-1 text-base leading-snug md:text-lg">
                      {card.title}
                    </p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
