"use client";

import { ArrowUpRightIcon, PlayIcon } from "@phosphor-icons/react/dist/ssr";
import { useRef } from "react";
import { press } from "@/content";
import type { LinkItem, Project } from "@/types/content";
import { Label } from "@/components/ui/label";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { DUR, EASE, gsap, useGSAP } from "@/lib/gsap";

const wrap = "mt-16 md:mt-24 lg:grid lg:grid-cols-12 lg:gap-x-6";

/** Locks of Liz: press wordmarks set in text. */
export function PressRow() {
  const items = press.filter((p) => p.outlet !== "FOX61");
  return (
    <div className={wrap}>
      <div className="lg:col-span-7 lg:col-start-6">
        <Label tone="current" className="opacity-65">
          Press
        </Label>
        <ul className="font-display text-h3 mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          {items.map((p, i) => (
            <li key={p.outlet} className="flex items-baseline gap-x-4">
              {i > 0 && (
                <span aria-hidden="true" className="opacity-70">
                  ·
                </span>
              )}
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Open"
                  className="group hover:text-orange focus-visible:outline-orange decoration-teal inline-flex items-baseline gap-[0.2em] underline decoration-[0.06em] underline-offset-[0.18em] outline-offset-4 transition-colors duration-500 focus-visible:outline-2"
                >
                  {p.outlet}
                  <ArrowUpRightIcon
                    aria-hidden="true"
                    weight="light"
                    className="text-teal-text size-[0.7em] shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-[0.12em] group-hover:-translate-y-[0.12em]"
                  />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span className="opacity-70">{p.outlet}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Boss Babes: `50 → 130+` counting up, the end value in orange. */
export function StatCount({ stat }: { stat: NonNullable<Project["stat"]> }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const from = parseInt(stat.from, 10);
  const to = parseInt(stat.to, 10);
  const suffix = stat.to.replace(/^\d+/, "");

  useGSAP(
    () => {
      const el = root.current?.querySelector<HTMLElement>("[data-count]");
      if (!el) return;
      // Reduced motion: final number (also undoes a count started before the
      // media query resolved after hydration).
      if (reduced) {
        el.textContent = String(to);
        return;
      }
      const num = { v: from };
      el.textContent = String(from);
      gsap.to(num, {
        v: to,
        duration: DUR.slow,
        ease: EASE.out,
        onUpdate: () => {
          el.textContent = String(Math.round(num.v));
        },
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    // Full container width: at text-mega the stat is wider than the offset column
    <div ref={root} className="mt-16 max-w-full overflow-hidden md:mt-24">
      <p className="font-display text-mega leading-[0.9] tracking-[-0.03em] whitespace-nowrap tabular-nums">
        <span className="sr-only">{`${stat.from} to ${stat.to} ${stat.label}`}</span>
        <span aria-hidden="true">
          {stat.from} <span className="text-[0.6em]">→</span>{" "}
          <span className="bg-orange text-ink box-decoration-clone px-[0.04em]">
            <span data-count>{to}</span>
            {suffix}
          </span>
        </span>
      </p>
      <Label tone="current" className="mt-4 opacity-65">
        {stat.label}
      </Label>
    </div>
  );
}

/** Work Drama: big listen link with a circular play icon. */
export function ListenLink({ link }: { link: LinkItem }) {
  return (
    <div className={wrap}>
      <div className="lg:col-span-7 lg:col-start-6">
        <a
          href={link.href}
          target="_blank"
          rel="noreferrer"
          data-cursor="Listen"
          className="group font-display text-h2 focus-visible:outline-orange inline-flex items-center gap-[0.4em] leading-[1.1] outline-offset-8 focus-visible:outline-2"
        >
          <span className="group-hover:bg-orange group-hover:border-orange group-hover:text-ink flex size-[1.5em] shrink-0 items-center justify-center rounded-full border border-current transition-colors duration-500">
            <PlayIcon
              aria-hidden="true"
              weight="light"
              className="size-[0.55em]"
            />
          </span>
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-[0.08em] transition-[background-size] duration-500 ease-[var(--ease-out-expo)] group-hover:bg-[length:100%_1px]">
            {link.label}
          </span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
