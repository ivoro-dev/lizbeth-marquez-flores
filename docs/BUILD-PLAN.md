# Build plan (first version)

One task per session. Tick `[x]` when done. Run `/clear` between tasks.
Each task lists what "done" means. Follow `CLAUDE.md` for checks.

## Phase 1: Foundation

- [x] **1. Shared primitives.** (Built 19 Nov: `ui/label.tsx`, `ui/rule.tsx`, `ui/text-link.tsx`, `motion/split-reveal.tsx`, `motion/clip-image.tsx`.) `ui/container.tsx` already done (page margins). Create `ui/label.tsx` (numbered uppercase label), `ui/rule.tsx` (1px line), `ui/text-link.tsx` (external link with arrow icon + drawn underline, `data-cursor` prop). Create `motion/split-reveal.tsx` (pattern 1/2 from MOTION.md, props: `as`, `type: "lines" | "chars"`, `delay`) and `motion/clip-image.tsx` (pattern 4 + optional parallax, wraps `next/image`). Done: components exist, typecheck passes, a temporary test render on the page looks right, then remove the test render.
- [x] **2. Header + cursor.** (Built 19 Nov: `layout/header.tsx`, `layout/cursor.tsx`. Grown cursor is solid orange, not blended, so its label stays readable over link text.) Fixed header per DESIGN.md (blend mode, hide on scroll down, mobile menu overlay). Custom cursor component (desktop only) mounted in layout. Done: works at 1440 and 390.

## Phase 2: Sections

- [x] **3. Intro + Cover.** (Built 18 Nov: `layout/intro.tsx`, `sections/cover.tsx`, `lib/intro.ts`. Intro panel slides up, cover rises from below.) Intro loader (≤1.6s, once per session via `sessionStorage`) and the Cover section. Name fully legible, nothing overlaps it, at every width from 360 to 1920. Done: screenshot proves the name is clean on desktop and mobile.
- [x] **4. About.** (Built 19 Nov: `sections/about.tsx`.) Word-scrub statement, portrait reveal, paragraphs, credentials.
- [x] **5. Case file component.** (Built 19 Nov: `sections/case-file.tsx`, `sections/projects.tsx`. All project images in the shared gallery for now; task 6 moves the Wholeness screenshots.) Build `sections/case-file.tsx` used by `projects.tsx`: header row, sticky number column, four beats, Decision underline, pinned horizontal gallery (desktop) / stack (mobile), links. Render all four projects with it. Done: all four projects render; Decision moment identical in each.
- [x] **6. Project specifics.** (Built 19 Nov: `sections/case-extras.tsx`, `sections/wholeness-evidence.tsx`, wired in `projects.tsx`.) Locks of Liz press row; Wholeness bio before/after + "One month later" screenshots block; Boss Babes `50 → 130+` count-up; Work Drama listen link + background turns ink. Done: each special piece visible and correct; no growth numbers typed into copy (screenshots only).
- [x] **7. Listen & Watch.** (Built 19 Nov: `sections/listen-watch.tsx`.) Ink section, four rows, NBC featured, hover preview following cursor (desktop). Header `Listen` link scrolls here via Lenis.
- [x] **8. Approach.** (Built 19 Nov: `sections/approach.tsx`; `lizbeth-04` added to `content/approach.ts`.) The Diagnosis per DESIGN.md: pillars with drawn orange line to `72h`, images, three-line closer.
- [x] **9. Contact + Footer.** (Built 19 Nov: `sections/contact.tsx`, `layout/footer.tsx`.) Teal section, huge email link, rows, back-to-top via Lenis.

## Phase 3: Polish

- [x] **10. Motion pass.** (19 Nov: code-level pass only, no screenshots; visual scroll-through still needs checking in the browser.) Scroll the whole page top to bottom (screenshots at 4–5 points max). Fix timing clashes, double animations, janky pins, anything that animates and shouldn't. Check reduced-motion mode shows everything.
- [x] **11. Responsive + a11y pass.** (19 Nov: code-level pass plus Lighthouse/axe. Teal label text darkened via `--teal-text` for AA, split-text aria fixed, duplicate alt removed, menu focus states. Multi-width visual check not done, no screenshots.) 360, 390, 768, 1024, 1440, 1920 widths. Focus states, alt text, heading order (one h1 = her name), link labels, no horizontal overflow.
- [x] **12. Production check.** (19 Nov: build passes; Lighthouse desktop performance 90, accessibility 96.) `npm run build` passes. Lighthouse (desktop) ≥ 85 performance, ≥ 95 accessibility. Fix the top issues only.

## Phase 4: Client feedback (20 Nov voice notes + red edits in her brief doc)

- [x] **13. Copy from her red edits.** (20 Nov.) About rewritten to lead with why hire her (headline now "who they are"); Boss Babes challenge/decision wording; Work Drama decision + status (Season 1, Season 2, YouTube 2027); CT Insider article linked in press row.
- [x] **14. Wholeness content to its case.** (20 Nov.) The 5 `unsorted/` pieces (carousel slides, reel frame, postpartum flyer, giveaway) moved from the cover dial into the Wholeness gallery.
- [x] **15. Cover dial = photos of her.** (20 Nov.) `round-carousel.tsx` now uses `scopeCards` in `content/about.ts`: 5 photos of Lizbeth titled by discipline. Section background teal.
- [x] **16. Boss Babes event photos.** (20 Nov.) Added repost of the full room + speaker photo. `event-2-room` not used (crop of the repost). Empty-room setup photos still needed from client.
- [x] **17. More teal.** (20 Nov.) Highlights, links, scrollbar, selection, intro counter now teal. Orange kept only for: Decision underline, `130+`, `72h` + its line, hovers, cursor, Featured label.
- [x] **18. Cover portrait.** (20 Nov.) Background removed (`portrait/lizbeth-09-cutout.webp`), large, stands behind the name (z-index) so letters are never covered.
- [x] **19. Wholeness analytics before/after.** (20 Nov.) `insights-before` paired with `insights-30-days` in the "One month later" block.
- [x] **20. Client round 2.** (20 Nov.) New cover photo with table (`portrait/lizbeth-cover-table.webp`, white bg removed), centred slightly right; real Work Drama logo (replaced AI version); 2 episode covers added; Boss Babes event set-up photos added; WAC logo removed from gallery; captions fixed (branded photo shoot, five-practitioner carousel).

Also fixed 20 Nov: with reduced motion, SplitReveal headings could stay hidden and `72h` / `130+` showed 0 (hook resolves after hydration). Now final state.

## Later (not in first version, wait for client feedback)

- PDF version (landscape, under 10MB, clickable links, file name `Lizbeth-Marquez-Flores-Brand-Portfolio.pdf`)
- Possible extra assets from client: Locks of Liz brand guide spreads, 1 more Wholeness flyer or other Wholeness content, LOL Earned Media video
- "Download PDF" link in header once PDF exists
- Deploy to Vercel
