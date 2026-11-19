"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";

const CARDS = [
  {
    src: "/images/unsorted/ig-carousel-who-should-you-see-1.webp",
    alt: "Who should you see clinic triage carousel",
    title: "Who Should You See?",
    tag: "Triage & Education",
    number: "01",
  },
  {
    src: "/images/unsorted/ig-carousel-guljan-founder-2.webp",
    alt: "Guljan acupuncturist and founder positioning",
    title: "Founder Authority",
    tag: "Brand Leadership",
    number: "02",
  },
  {
    src: "/images/unsorted/ig-giveaway.webp",
    alt: "Holistic Health partnership giveaway",
    title: "Community Outreach",
    tag: "Audience Activation",
    number: "03",
  },
  {
    src: "/images/unsorted/img-7196.webp",
    alt: "Acupuncture visit walkthrough from start to finish",
    title: "Patient Journey",
    tag: "Experience Narrative",
    number: "04",
  },
];

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
      aria-label="Visual Strategy Semicircle Carousel"
      className="bg-paper text-ink relative flex h-svh min-h-[560px] w-full flex-col justify-between overflow-hidden py-10 md:py-14 select-none"
    >
      {/* Semicircle Display Stage */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
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
            className="pointer-events-none absolute rounded-full border border-dashed border-ink/15"
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
                  className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-ink/15 bg-paper shadow-[0_18px_45px_-10px_rgba(17,17,17,0.18)] transition-[transform,box-shadow] duration-300 hover:scale-105 hover:shadow-[0_24px_55px_-8px_rgba(17,17,17,0.28)]"
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1024px) 280px, 200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient Legibility Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />

                  {/* Card Editorial Labels */}
                  <div className="absolute inset-x-0 bottom-0 p-4 text-paper">
                    <span className="text-[10px] font-semibold tracking-widest text-orange uppercase">
                      {card.number} · {card.tag}
                    </span>
                    <h3 className="font-display text-paper mt-1 text-base leading-snug md:text-lg">
                      {card.title}
                    </h3>
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

