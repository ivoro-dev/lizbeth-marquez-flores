"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
// Mobile: don't recalculate pins when the address bar shows/hides (stops jumps)
ScrollTrigger.config({ ignoreMobileResize: true });

/** Single source of truth for motion. See docs/MOTION.md */
export const EASE = {
  out: "expo.out",
  inOut: "power4.inOut",
  soft: "power2.out",
} as const;

export const DUR = {
  fast: 0.5,
  base: 0.9,
  slow: 1.4,
} as const;

export { gsap, ScrollTrigger, SplitText, useGSAP };
