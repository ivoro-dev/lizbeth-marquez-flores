"use client";

import { useRef } from "react";
import { approach } from "@/content";
import { ClipImage } from "@/components/motion/clip-image";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Label } from "@/components/ui/label";
import { Section } from "@/components/ui/section";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { DUR, EASE, gsap, useGSAP } from "@/lib/gsap";

/** Closer: lead-in sentence, then the three short ones on their own lines. */
const sentences = approach.closer.match(/[^.]+\./g)?.map((s) => s.trim()) ?? [];
const closerLead = sentences.slice(0, -3).join(" ");
const closerLines = sentences.slice(-3);
const hours = parseInt(approach.turnaround, 10);

export function Approach() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [lead, ...rest] = approach.paragraphs;
  const ex = approach.example;

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const row = q("[data-pillars]")[0];
      const count = q("[data-hours]")[0];
      if (!row || !count) return;
      // Reduced motion: final number (also undoes a count started before the
      // media query resolved after hydration).
      if (reduced) {
        count.textContent = String(hours);
        return;
      }

      // Orange line draws across the pillars to 72h
      gsap.fromTo(
        q("[data-line]"),
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            end: "top 35%",
            scrub: true,
          },
        },
      );

      // 72 counts up as the line arrives (MOTION.md pattern 8)
      const num = { v: 0 };
      count.textContent = "0";
      gsap.to(num, {
        v: hours,
        duration: DUR.slow,
        ease: EASE.out,
        onUpdate: () => {
          count.textContent = String(Math.round(num.v));
        },
        scrollTrigger: { trigger: row, start: "top 40%", once: true },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <Section id="approach" ref={root} aria-label="Approach">
      <Label>Approach</Label>
      <SplitReveal
        as="h2"
        className="font-display text-display mt-8 leading-[0.95] tracking-[-0.02em]"
      >
        {approach.name.replace(/Diagnosis$/, "")}
        <span className="bg-teal text-ink box-decoration-clone px-[0.04em]">
          Diagnosis
        </span>
      </SplitReveal>

      <div className="mt-12 grid gap-8 md:mt-20 lg:grid-cols-12 lg:gap-x-6">
        <p className="text-lead max-w-[36ch] leading-[1.4] lg:col-span-6">
          {lead}
        </p>
        <div className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8">
          {rest.map((t) => (
            <p key={t} className="text-body text-ink/80 max-w-[56ch]">
              {t}
            </p>
          ))}
        </div>
      </div>

      {/* Pillars + 72h */}
      <div
        data-pillars
        className="relative mt-16 grid gap-y-10 md:mt-24 lg:grid-cols-[1fr_auto] lg:gap-x-10"
      >
        <span
          data-line
          aria-hidden="true"
          className="bg-orange absolute top-0 left-0 h-[2px] w-full"
        />
        <ol className="grid grid-cols-2 pt-8 lg:grid-cols-4">
          {approach.pillars.map((p, i) => (
            <li
              key={p}
              className={cn(
                "border-ink/14 py-6 pr-4 md:py-8",
                i % 2 === 1 && "border-l pl-4 lg:pl-6",
                i % 2 === 0 && i > 0 && "lg:border-l lg:pl-6",
                i > 1 && "border-t lg:border-t-0",
              )}
            >
              <span className="text-label text-teal-text block tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-h3 mt-4 block leading-[1.1]">
                {p}
              </span>
            </li>
          ))}
        </ol>
        <div className="border-ink/14 pt-8 lg:border-l lg:pl-10">
          <p className="font-display text-display text-orange leading-[0.9] tabular-nums">
            <span className="sr-only">{approach.turnaround}</span>
            <span aria-hidden="true">
              <span data-hours>{hours}</span>h
            </span>
          </p>
          <Label tone="current" className="mt-3 opacity-65">
            Turnaround
          </Label>
        </div>
      </div>

      {/* Images */}
      <div className="mt-20 grid items-end gap-10 md:mt-32 md:grid-cols-12 md:gap-x-6">
        <ClipImage
          image={approach.image}
          sizes="(min-width: 768px) 50vw, 100vw"
          parallax
          className="md:col-span-7"
        />
        <figure className="md:col-span-4 md:col-start-9">
          <ClipImage image={ex.image} sizes="(min-width: 768px) 30vw, 70vw" />
          <figcaption className="text-label mt-3 opacity-65">
            {ex.caption} · {ex.title}
          </figcaption>
        </figure>
      </div>

      {/* Closer */}
      <div className="mt-20 md:mt-32">
        {closerLead && (
          <p className="text-lead max-w-[40ch] opacity-70">{closerLead}</p>
        )}
        <div className="mt-8">
          {closerLines.map((line, i) => (
            <SplitReveal
              key={line}
              as="p"
              delay={i * 0.12}
              className="font-display text-h1 leading-[1.05] tracking-[-0.015em]"
            >
              {line === "Name it plainly." ? (
                <span className="bg-teal text-ink box-decoration-clone px-[0.04em]">
                  {line}
                </span>
              ) : (
                line
              )}
            </SplitReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
