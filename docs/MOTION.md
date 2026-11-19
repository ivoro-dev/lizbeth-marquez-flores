# Motion system

Motion should feel **calm, precise, expensive**. Fewer, bigger moments beat many small ones. If everything moves, nothing matters.

## Rules

- Import from `@/lib/gsap` only. Use `EASE.out` (expo.out) for reveals, `EASE.inOut` for wipes/transitions, `EASE.soft` for hovers.
- Durations: `DUR.fast` 0.5 (hover), `DUR.base` 0.9 (reveals), `DUR.slow` 1.4 (hero).
- Every animation inside `useGSAP(() => {...}, { scope: ref })`. Never raw `useEffect` for GSAP.
- `const reduced = useReducedMotion()`; if `reduced`, skip the timeline and leave elements in their final state.
- Initial hidden states set in GSAP (`gsap.set`) or with `autoAlpha`, never with CSS `opacity-0` (prevents invisible content if JS fails).
- Animate `transform`, `opacity`, `clip-path` only.
- Responsive differences with `gsap.matchMedia()` (`(min-width: 1024px)` for pinning/horizontal scroll).
- After fonts load, call `ScrollTrigger.refresh()` once (do it in the first section that needs it: `document.fonts.ready.then(() => ScrollTrigger.refresh())`).

## Allowed patterns (use these, don't invent new ones)

### 1. Line reveal (headings)

```tsx
const split = SplitText.create(el, {
  type: "lines",
  mask: "lines",
  linesClass: "split-line",
});
gsap.from(split.lines, {
  yPercent: 105,
  duration: DUR.base,
  ease: EASE.out,
  stagger: 0.08,
  scrollTrigger: { trigger: el, start: "top 85%", once: true },
});
// cleanup: useGSAP reverts; also call split.revert() in the returned function if needed
```

### 2. Char reveal (intro + cover name only)

Same as 1 with `type: "chars,lines"`, `mask: "lines"`, animate `split.chars`, stagger 0.025, `DUR.slow`.

### 3. Word scrub (About statement only)

```tsx
const split = SplitText.create(el, { type: "words" });
gsap.fromTo(
  split.words,
  { opacity: 0.15 },
  {
    opacity: 1,
    stagger: 0.1,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top 75%",
      end: "bottom 45%",
      scrub: true,
    },
  },
);
```

### 4. Image clip reveal

```tsx
gsap.fromTo(
  wrap,
  { clipPath: "inset(100% 0% 0% 0%)" },
  {
    clipPath: "inset(0% 0% 0% 0%)",
    duration: DUR.slow,
    ease: EASE.inOut,
    scrollTrigger: { trigger: wrap, start: "top 80%", once: true },
  },
);
gsap.fromTo(
  img,
  { scale: 1.25 },
  { scale: 1, duration: DUR.slow, ease: EASE.out, scrollTrigger: {/* same */} },
);
```

### 5. Parallax (inside overflow-hidden frame)

`gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: frame, scrub: true } })` with the image 116% tall.

### 6. Decision underline (signature, identical in all projects)

An absolutely positioned orange bar (height 0.12em) under the Decision text:
`gsap.fromTo(bar, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: DUR.slow, ease: EASE.inOut, scrollTrigger: { trigger: beat, start: "top 70%", once: true } })`

### 7. Pinned horizontal gallery (desktop only)

```tsx
mm.add("(min-width: 1024px)", () => {
  const distance = () => track.scrollWidth - window.innerWidth;
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
```

### 8. Count up (Boss Babes stat, 72h)

Tween a proxy object `{ v: 0 }` to the number, write `Math.round(v)` into the element `onUpdate`. Keep the `+` as static text.

### 9. Background colour change (Work Drama → Listen & Watch)

Scrub `backgroundColor`/`color` on a full-page wrapper or the sections themselves from paper/ink to ink/paper with `start: "top 60%", end: "top 20%"`. Text colours via CSS variables are fine.

### 10. Hover (CSS where possible)

Link underline: `background-size` 0 → 100% with `transition` using `var(--ease-out-expo)` 0.5s. Row shift: `translate-x-3` on hover. Use GSAP `quickTo` only for the cursor and the Listen & Watch image preview.

## Budget

- Max one pinned section per project (the gallery) + nothing else pinned.
- Max ~10 ScrollTriggers per section.
- Total JS animation must keep 60fps on a mid laptop. If it janks, remove effects, don't add `will-change` everywhere.
