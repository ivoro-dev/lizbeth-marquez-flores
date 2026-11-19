---
description: Critique the page like an Awwwards juror, then list fixes (no code changes)
---
Start the dev server if needed. Using Playwright, screenshot the full page at 1440x900 in 6 scroll positions and at 390x844 in 4 positions (max 10 screenshots).

Judge it like an Awwwards juror and a hiring manager. Check against `docs/DESIGN.md` (banned list, tokens, type, rhythm) and `docs/BRIEF.md` must-haves.

Output a numbered list of the 10 most important problems, worst first. For each: where, what's wrong, the fix in one line. Then ask which ones to fix. **Don't change code in this command.**
