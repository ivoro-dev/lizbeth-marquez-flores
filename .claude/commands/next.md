---
description: Build the next unchecked task from docs/BUILD-PLAN.md
---
Open `docs/BUILD-PLAN.md` and take the first unchecked task (or task number $ARGUMENTS if given).

1. Read only what the task needs: the relevant part of `docs/DESIGN.md`, `docs/MOTION.md` if it animates, `docs/ASSETS.md` if it uses images, and the content files it uses.
2. Build it following `CLAUDE.md`.
3. Run `npm run lint` and `npm run typecheck`, fix errors.
4. Visual check with Playwright: one screenshot at 1440x900, one at 390x844 of this section. Fix obvious problems (max 4 screenshots total).
5. Tick the task in BUILD-PLAN.md.
6. Reply in max 5 lines. Do not start the next task.
