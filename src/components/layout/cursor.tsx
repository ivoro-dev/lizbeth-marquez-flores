"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { DUR, EASE, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const FINE = "(hover: hover) and (pointer: fine)";
const SIZE = 64;
const REST = 12 / SIZE;

function subscribe(cb: () => void) {
  const mq = window.matchMedia(FINE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function useFinePointer() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(FINE).matches,
    () => false,
  );
}

/**
 * Desktop-only cursor: 12px solid orange dot that follows with a lerp and
 * grows to 64px with an ink label over elements that have `data-cursor`.
 */
export function Cursor() {
  const fine = useFinePointer();
  if (!fine) return null;
  return <CursorDot />;
}

function CursorDot() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [label, setLabel] = useState("");

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const dot = el.querySelector<HTMLElement>("[data-dot]");
      const text = el.querySelector<HTMLElement>("[data-label]");
      if (!dot || !text) return;

      gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
      gsap.set(dot, { scale: REST });
      gsap.set(text, { autoAlpha: 0 });

      const follow = reduced ? 0 : 0.35;
      const toX = gsap.quickTo(el, "x", { duration: follow, ease: EASE.soft });
      const toY = gsap.quickTo(el, "y", { duration: follow, ease: EASE.soft });
      const grow = reduced ? 0 : DUR.fast;

      let shown = false;
      let current: Element | null = null;

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        if (!shown) {
          gsap.set(el, { x: e.clientX, y: e.clientY });
          gsap.to(el, { autoAlpha: 1, duration: grow });
          shown = true;
        }
        toX(e.clientX);
        toY(e.clientY);

        const target = (e.target as Element | null)?.closest("[data-cursor]");
        if (target === current) return;
        current = target ?? null;
        const next = target?.getAttribute("data-cursor") ?? "";
        if (next) setLabel(next);
        gsap.to(dot, {
          scale: next ? 1 : REST,
          duration: grow,
          ease: EASE.out,
          overwrite: true,
        });
        gsap.to(text, {
          autoAlpha: next ? 1 : 0,
          duration: next ? grow : grow / 2,
          delay: next ? grow * 0.2 : 0,
          overwrite: true,
        });
      };

      const onLeave = () => {
        shown = false;
        gsap.to(el, { autoAlpha: 0, duration: grow });
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      return () => {
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none invisible fixed top-0 left-0 z-[100]"
      style={{ width: SIZE, height: SIZE }}
    >
      <div data-dot className="bg-orange absolute inset-0 rounded-full" />
      <span
        data-label
        className="text-ink text-label absolute inset-0 flex items-center justify-center font-medium tracking-[0.06em] uppercase"
      >
        {label}
      </span>
    </div>
  );
}
