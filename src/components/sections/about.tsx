"use client";

import { useRef } from "react";
import { about } from "@/content";
import { ClipImage } from "@/components/motion/clip-image";
import { Label } from "@/components/ui/label";
import { Rule } from "@/components/ui/rule";
import { Section } from "@/components/ui/section";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ScrollTrigger, SplitText, gsap, useGSAP } from "@/lib/gsap";

const HIGHLIGHT = "who they are.";
const HIGHLIGHT_AT = about.headline.indexOf(HIGHLIGHT);

export function About() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const el = root.current?.querySelector<HTMLElement>("[data-scrub]");
      if (!el) return;
      const split = SplitText.create(el, { type: "words" });
      // Dim the words only just before they scroll into view, so the
      // page never loads with low-contrast text (Lighthouse contrast audit).
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom+=200",
        once: true,
        onEnter: (self) => {
          if (
            self.progress < 1 &&
            el.getBoundingClientRect().top > innerHeight * 0.75
          )
            gsap.set(split.words, { opacity: 0.15 });
        },
      });
      gsap.fromTo(
        split.words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      );
      document.fonts.ready.then(() => ScrollTrigger.refresh());
      return () => split.revert();
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <Section id="about" ref={root} aria-labelledby="about-title">
      <h2
        id="about-title"
        data-scrub
        className="font-display text-display max-w-[14ch] leading-[0.98] tracking-[-0.02em] text-balance"
      >
        {HIGHLIGHT_AT > -1 ? (
          <>
            {about.headline.slice(0, HIGHLIGHT_AT)}
            <span className="bg-teal text-ink box-decoration-clone px-[0.04em]">
              {HIGHLIGHT}
            </span>
          </>
        ) : (
          about.headline
        )}
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-12 md:mt-28 md:grid-cols-12 md:gap-x-6">
        <ClipImage
          image={about.portrait}
          sizes="(min-width: 768px) 40vw, 100vw"
          className="md:col-span-5"
        />

        <div className="flex flex-col md:col-span-6 md:col-start-7 md:self-end">
          <p className="text-lead max-w-[36ch] leading-[1.4] hyphens-auto md:text-justify">
            {about.paragraphs[0]}
          </p>
          {about.paragraphs.slice(1).map((para) => (
            <p
              key={para.slice(0, 24)}
              className="text-body text-ink/80 mt-8 max-w-[62ch] hyphens-auto md:text-justify"
            >
              {para}
            </p>
          ))}

          <div className="mt-14">
            <Label as="h3">Credentials</Label>
            <ul className="mt-5">
              {about.credentials.map((item, i) => (
                <li key={item}>
                  {i === 0 && <Rule />}
                  <p className="text-body py-5">{item}</p>
                  <Rule />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
