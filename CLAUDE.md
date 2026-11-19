# Lizbeth Portfolio

One-page, Awwwards-level portfolio for Lizbeth Marquez-Flores (brand strategist applying for brand manager / brand storyteller jobs). Readers are hiring managers. Built by Ivoro.

## How to work
- Work comes from `docs/BUILD-PLAN.md`. Do **one task per session**, the first unchecked one, unless told otherwise. Then stop.
- Before building a task, read only: the task, the matching part of `docs/DESIGN.md`, and `docs/MOTION.md` if it animates. Don't explore the whole repo.
- All copy, links and image paths are already in `src/content/`. Use them exactly. **Never write new marketing copy, stats, testimonials or claims.** Small UI labels (e.g. "Challenge", "Listen", "Back to top") are fine.
- Images: use the files and sizes listed in `docs/ASSETS.md` with `next/image`. **Don't open image files to look at them**; the descriptions are enough.
- `client-assets/` holds raw originals. Never import from it, never read it.
- Ignore the Next.js docs note in AGENTS.md unless an API actually errors.

## Stack (already installed; don't add libraries without asking)
Next.js 16 App Router, React 19, TypeScript, Tailwind v4 (tokens in `src/app/globals.css`), GSAP 3 + ScrollTrigger + SplitText + `@gsap/react`, Lenis (wired in `src/components/providers/smooth-scroll.tsx`, don't touch), Phosphor icons (`@phosphor-icons/react/dist/ssr`, thin/light weights only).

Import GSAP only from `@/lib/gsap`. Use `useGSAP` with a `scope` ref for every animation (auto cleanup). Use `EASE` and `DUR` from that file.

## Skills
- **GSAP skills** (official): use them for correct API usage. `docs/MOTION.md` still decides *which* animations exist.
- **frontend-design**: use it for polish and details only. The direction, fonts, colours and layouts in `docs/DESIGN.md` are fixed and override the skill.

## Structure
- `src/components/sections/` one file per page section
- `src/components/ui/` shared primitives (only create when used twice)
- `src/components/motion/` reusable animation components
- `src/content/` all text and data
- `docs/` brief, design, motion, assets, build plan

## Quality rules
- Follow the banned list in `docs/DESIGN.md`. If something you're about to build looks like a template, stop and redo it.
- Animate only `transform`, `opacity`, `clip-path`. Respect reduced motion (`useReducedMotion` hook): show final state, no motion.
- Every section must work at 390px wide and 1440px wide. No horizontal scroll on mobile.
- Semantic HTML, alt text from content files, visible focus states, links open external sites in a new tab with `rel="noreferrer"`.
- Body text never below 16px.

## Done = all of these
1. `npm run lint` and `npm run typecheck` pass.
2. Check visually once with the Playwright MCP: start `npm run dev` in the background if not running, open http://localhost:3000, take **one** screenshot at 1440x900 and **one** at 390x844 of the section you built. Fix obvious issues. Don't take more than 4 screenshots per task.
3. Tick the task in `docs/BUILD-PLAN.md`.
4. Reply with max 5 lines: what you built, anything you couldn't do. No long summaries.

## Saving tokens
- Don't re-read files you already read this session. Don't print whole files back.
- Don't run `npm run build` unless the task says so (dev server is enough).
- Prefer editing over rewriting files.
