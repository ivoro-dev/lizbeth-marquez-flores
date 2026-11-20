"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import type { Project } from "@/types/content";
import { ClipImage } from "@/components/motion/clip-image";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { TextLink } from "@/components/ui/text-link";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { DUR, EASE, gsap, useGSAP } from "@/lib/gsap";

type CaseFileProps = {
  project: Project;
  total: number;
  /** Background turns ink as this case enters (MOTION.md pattern 9) */
  ink?: boolean;
  /** Project-specific evidence, shown after the beats */
  children?: ReactNode;
};

/** Cursor label for a link, from the start of its own text. */
function cursorFor(label: string) {
  if (/^watch/i.test(label)) return "Watch";
  if (/^listen/i.test(label)) return "Listen";
  return "Open";
}

/**
 * One project as a case file: header row, sticky number + four beats,
 * pinned horizontal gallery (desktop) / stack (mobile), links.
 */
export function CaseFile({ project, ink, children }: CaseFileProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const p = project;
  const meta = [p.role, p.location, p.status].filter(Boolean);

  const beats = [
    { label: "Challenge", text: p.challenge },
    { label: "Decision", text: p.decision },
    { label: "Work", text: p.work },
    { label: p.outcomeLabel, text: p.outcome },
  ];

  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(root);

      // Decision underline (MOTION.md pattern 6), identical in every case
      const beat = q("[data-decision]")[0];
      const bar = q("[data-decision-bar]")[0];
      if (beat && bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: DUR.slow,
            ease: EASE.inOut,
            scrollTrigger: { trigger: beat, start: "top 70%", once: true },
          },
        );
      }

      // Paper → ink as the case enters
      if (ink && root.current) {
        gsap.fromTo(
          root.current,
          { backgroundColor: "#f4f1ea", color: "#111111" },
          {
            backgroundColor: "#111111",
            color: "#f4f1ea",
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 60%",
              end: "top 20%",
              scrub: true,
            },
          },
        );
      }

      // Pinned horizontal gallery (MOTION.md pattern 7), desktop only
      const wrapper = q("[data-gallery]")[0];
      const track = q("[data-track]")[0];
      if (!wrapper || !track) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            pin: true,
            scrub: 1,
            end: () => "+=" + distance(),
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root, dependencies: [reduced, ink], revertOnUpdate: true },
  );

  return (
    <article
      ref={root}
      id={p.slug}
      aria-labelledby={`${p.slug}-title`}
      data-theme={ink ? "ink" : undefined}
      className={cn(
        "overflow-x-clip pt-20 md:pt-32",
        ink && "pb-20 md:pb-32",
        ink && reduced && "bg-ink text-paper",
      )}
    >
      <Container>
        {/* Header row */}
        <header className="flex flex-col items-center py-8 text-center md:py-10">
          <h3
            id={`${p.slug}-title`}
            className="font-display text-h1 max-w-[20ch] leading-[1] tracking-[-0.015em] text-balance"
          >
            <span className="bg-teal text-paper box-decoration-clone px-[0.04em]">
              {p.title}
            </span>
          </h3>
          <ul className="sr-only">
            {meta.map((m) => (
              <li key={m}>{m}</li>
            ))}
            <li>{p.disciplines.join(" · ")}</li>
          </ul>
        </header>

        {/* Sticky number + beats */}
        <div className="mt-12 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p
                aria-hidden="true"
                className="font-display text-mega leading-[0.85] tracking-[-0.03em] tabular-nums"
              >
                {p.number}
              </p>
              <p className="font-display text-h3 text-teal-text mt-4 hidden max-w-[16ch] leading-[1.1] lg:block">
                {p.title}
              </p>
            </div>
          </div>

          <ol className="lg:col-span-7 lg:col-start-6">
            {beats.map((b, i) => {
              const decision = b.label === "Decision";
              return (
                <li
                  key={b.label}
                  data-decision={decision || undefined}
                  className={cn(
                    "grid gap-4 border-t border-current/14 py-8 md:grid-cols-[9rem_1fr] md:gap-6 md:py-10",
                    i === beats.length - 1 && "border-b",
                  )}
                >
                  <Label
                    as="h4"
                    number={String(i + 1).padStart(2, "0")}
                    tone={decision ? "teal" : "current"}
                    className={cn("md:pt-1.5", !decision && "opacity-65")}
                  >
                    {b.label}
                  </Label>
                  {decision ? (
                    <p className="font-display text-h3 relative max-w-[30ch] pb-[0.35em] leading-[1.2]">
                      {b.text}
                      <span
                        data-decision-bar
                        aria-hidden="true"
                        className="bg-orange absolute bottom-0 left-0 h-[0.12em] w-full"
                      />
                    </p>
                  ) : (
                    <p className="text-body max-w-[58ch]">{b.text}</p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
        {children}
      </Container>

      {/* Evidence gallery */}
      <div
        data-gallery
        className={cn(
          "mt-16 w-full max-w-full overflow-hidden md:mt-24 lg:flex lg:h-screen lg:items-center",
          reduced ? "lg:overflow-x-auto" : "lg:overflow-hidden",
        )}
        {...(reduced ? { "data-lenis-prevent": true } : {})}
      >
        <ul
          data-track
          aria-label={`${p.title} work samples`}
          className="flex flex-col gap-12 px-[clamp(20px,4vw,64px)] lg:w-max lg:flex-row lg:items-end lg:gap-8"
        >
          {p.images.map((img) => (
            <li
              key={img.src}
              className="w-full lg:w-[calc(68vh*var(--r))] lg:shrink-0"
              style={{ "--r": img.width / img.height } as CSSProperties}
            >
              <figure>
                <ClipImage
                  image={img}
                  alt=""
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
                <figcaption className="text-label mt-3 max-w-[40ch] leading-snug opacity-65">
                  {img.alt}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {/* Links */}
      {p.links && p.links.length > 0 && (
        <Container>
          <ul className="text-lead mt-12 flex flex-col gap-4 md:mt-16">
            {p.links.map((l) => (
              <li key={l.href}>
                <TextLink href={l.href} cursor={cursorFor(l.label)}>
                  {l.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </Container>
      )}
    </article>
  );
}
