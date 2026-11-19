"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { DUR, EASE, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";

const LINKS = [
  { label: "Work", href: "#projects" },
  { label: "Listen", href: "#listen-watch" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Fixed header. Ink text by default, paper text over sections marked
 * `data-theme="ink"` (and with the menu open). Hover is orange. Hides on scroll down.
 */
export function Header() {
  const root = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [onInk, setOnInk] = useState(false);
  const lenis = useLenis();
  const hidden = useRef(false);
  const first = useRef(true);

  // Enter after the intro.
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      gsap.set(el, { autoAlpha: 0, yPercent: -100 });
      return onIntroDone(() =>
        gsap.to(el, {
          autoAlpha: 1,
          yPercent: 0,
          duration: DUR.base,
          ease: EASE.out,
          delay: 0.3,
        }),
      );
    },
    { scope: root },
  );

  // Switch to paper text while an ink section sits under the header.
  useGSAP(() => {
    const active = new Set<Element>();
    document.querySelectorAll("[data-theme='ink']").forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top 40px",
        end: "bottom 40px",
        refreshPriority: -1,
        onToggle: (self) => {
          if (self.isActive) active.add(sec);
          else active.delete(sec);
          setOnInk(active.size > 0);
        },
      });
    });
  });

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    const el = root.current;
    if (!el || !lenis) return;
    const onScroll = () => {
      if (open) return;
      const y = lenis.scroll;
      const down = lenis.direction === 1;
      const shouldHide = down && y > 160;
      if (shouldHide === hidden.current) return;
      hidden.current = shouldHide;
      gsap.to(el, {
        yPercent: shouldHide ? -100 : 0,
        duration: DUR.fast,
        ease: EASE.out,
        overwrite: "auto",
      });
    };
    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis, open]);

  // Mobile menu: lock scroll, slide overlay in/out, close on Escape.
  useEffect(() => {
    const ov = overlay.current;
    if (!ov) return;
    if (first.current) {
      first.current = false;
      gsap.set(ov, { yPercent: -100 });
      return;
    }
    if (open) {
      lenis?.stop();
      gsap.to(ov, { yPercent: 0, duration: DUR.base, ease: EASE.inOut });
      gsap.fromTo(
        ov.querySelectorAll("a"),
        { yPercent: 40, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: DUR.base,
          ease: EASE.out,
          stagger: 0.06,
          delay: 0.25,
        },
      );
    } else {
      lenis?.start();
      gsap.to(ov, { yPercent: -100, duration: 0.7, ease: EASE.inOut });
    }
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open, lenis]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (target && lenis)
      lenis.scrollTo(target as HTMLElement, { duration: 1.4 });
  };

  const linkCls =
    "focus-visible:outline-orange hover:text-orange outline-offset-4 focus-visible:outline-2 transition-[color,background-size] bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 duration-500 ease-[var(--ease-out-expo)] hover:bg-[length:100%_1px]";

  return (
    <>
      <div
        ref={overlay}
        aria-hidden={!open}
        inert={!open}
        className="bg-ink fixed inset-0 z-40 flex flex-col justify-end px-[clamp(20px,4vw,64px)] pb-[clamp(32px,8vw,64px)] md:hidden"
      >
        <nav aria-label="Menu" className="flex flex-col gap-2">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={go(l.href)}
              className="font-display text-paper text-h1 hover:text-orange focus-visible:outline-orange leading-[1.05] outline-offset-4 transition-colors duration-500 focus-visible:outline-2"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <header
        ref={root}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${open || onInk ? "text-paper" : "text-ink"}`}
      >
        <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-[clamp(20px,4vw,64px)] py-[clamp(16px,2vw,28px)]">
          <a
            href="#cover"
            onClick={go("#cover")}
            aria-label="LMF, Lizbeth Marquez-Flores, back to top"
            className="font-display hover:text-orange focus-visible:outline-orange text-2xl leading-none tracking-[-0.02em] outline-offset-4 transition-colors duration-500 focus-visible:outline-2"
          >
            LMF
          </a>

          <nav aria-label="Primary" className="hidden gap-10 text-base md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={go(l.href)}
                className={linkCls}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={`${linkCls} text-base md:hidden`}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>
    </>
  );
}
