# Design direction: "The Case File"

Lizbeth works diagnostically: find what's broken, decide, fix. The site presents her career as a set of **case files**. It should feel like a premium editorial magazine crossed with a strategist's dossier: confident, calm, sharp, with a few bold moments. Not a designer's gallery; the visuals are evidence.

Her brief in one line: _"Show thinking: what was wrong, what I decided, what I made, what happened."_ The **Decision** beat is the hero of every project.

## Tokens (in `globals.css`, use the Tailwind names)

| Token    | Value      | Use                                                                                              |
| -------- | ---------- | ------------------------------------------------------------------------------------------------ |
| `paper`  | #F4F1EA    | Default background                                                                               |
| `ink`    | #111111    | Text, dark sections                                                                              |
| `teal`   | #629FA9    | Her brand. Labels, rules, small accents, Contact background                                      |
| `orange` | #FF7828    | Her brand. **Only** for: Decision highlight, hover states, one key number per section, selection |
| `muted`  | #6E6A63    | Secondary text                                                                                   |
| `line`   | ink at 14% | 1px rules                                                                                        |

No other colours. No gradients. No shadows. Images carry their own brand colours.

**Type**

- Display: **Gloock** (`font-display`). Names, headings, big numbers, statements. Tight leading (0.9–1.0), letter-spacing -0.02em.
- Text: **Schibsted Grotesk** (`font-sans`). Body, labels, nav.
- Labels: `text-label`, uppercase, tracking 0.12em, often teal, prefixed with a number: `01 — Challenge`.
- Scale: `text-mega`, `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-body`, `text-label`.
- Max line length for paragraphs: 62ch.

**Grid**

- 12 columns, gutter `clamp(16px, 2vw, 32px)`, page margin `clamp(20px, 4vw, 64px)`. Full-bleed allowed for images and the name.
- Generous vertical space: sections `py-[clamp(96px,14vw,220px)]`.
- 1px `line` rules to separate rows, like a document. Use them often; it's part of the identity.

## Page rhythm

`Cover (paper) → About (paper) → Projects 01–03 (paper) → Project 04 Work Drama (bg transitions to ink) → Listen & Watch (ink) → Approach (paper) → Contact (teal) → Footer (teal)`

Background colour changes happen with a scroll-scrubbed transition on `body`/section, not hard cuts.

## Sections

### Header (fixed)

Left: "LMF" in Gloock. Right: anchor links `Work`, `Listen`, `Approach`, `Contact`. `mix-blend-difference` with white text so it works on every background. Hides on scroll down, shows on scroll up. On mobile: just "LMF" and a "Menu" text button opening a full-screen ink overlay with the links in `text-h1`.

### Intro (first load only, built)

Ink panel with labels, an `LMF` mark, a large 000 to 100 counter and an orange rule filling (her name is NOT shown, so it doesn't repeat the cover). The whole panel then slides **up** and the cover rises in **from below** (name lines from masks, portrait clip reveal). Once per session; skipped with reduced motion. Don't change it unless asked.

### Cover (100svh)

- Top row (labels, between rules): left `Brand Strategy & Brand Storytelling`, right `Selected Work 2019–2026`.
- Name in `text-mega` Gloock across two lines: `Lizbeth` / `Marquez-Flores`. **The full name must always be fully legible. Nothing may overlap the letters.** (Her old site's photo cut her name into "FLO RES". This is the most important rule on the page.) On mobile, `Marquez-Flores` may break as `Marquez-` / `Flores`.
- Portrait (`coverPortrait`) in a tall narrow frame (aspect 3/4, ~22vw desktop) placed in the space beside/below the name, never on top of it.
- Bottom row: index of the four case files as anchor links (`01 Locks of Liz` …) + small "Scroll" label.
- Scroll: portrait frame scales 1 → 1.08 with inner image parallax; first name line drifts left, second drifts right (max 6vw). Scrubbed.

### About

- Statement `I build brands that know what they are.` in `text-display`, words fade from 0.15 → 1 opacity scrubbed as you scroll through.
- Below, 12-col: portrait (`about.portrait`) cols 1–5 with clip-path reveal from bottom; paragraphs cols 7–12 in `text-lead` (first) and `text-body` (second).
- Credentials as two rows separated by rules, teal label `Credentials`.

### Projects ("Selected Work")

Section intro: label `Selected Work`, heading `Case Files` is NOT allowed (invented copy); use the label only plus a big `01–04` counter.

Each project is a **case file** block:

1. **Header row** (between rules): `Case 01 / 04` label, title in `text-h1`, role, location/status, disciplines joined with `·`.
2. **Four beats** (desktop: left column sticky with the big project number in `text-mega` + title; right column scrolls through beats). Each beat is a row: label (`Challenge`, `Decision`, `Work`, `Results`/`Status`) + text.
   - **Decision** beat is set larger (`text-h3` Gloock) with an orange marker underline that draws left-to-right as it enters. This is the signature moment; repeat it identically in all four projects.
3. **Evidence gallery**: images from the project. Desktop: horizontal scroll strip pinned for its width (ScrollTrigger pin + x translate). Mobile: vertical stack. Images have clip-path reveal and small captions (alt text, muted, label size).
4. **Links** (if any): text links with arrow icon, underline grows on hover.

Project specifics:

- **01 Locks of Liz**: add a press row after Results: wordmarks set in text (NBC Connecticut · NPR · CT Insider), muted, from `press`.
- **02 Wholeness**: two evidence pieces. (1) Bio before/after component titled "Profile positioning and bio rewrite" (exact label): rows `Before` / `After`, After wipes in over Before on scroll. (2) A "One month later" block: `profile-before` and `profile-after-1-month` side by side (labelled `Before` / `One month later`) plus `insights-30-days`. Client wants the follower growth shown, but only through her screenshots: **don't write growth numbers, percentages or claims in copy.** Status beat, not Results.
- **03 Boss Babes & Brunch**: `stat` shown as a display number `50 → 130+` in `text-mega`, counting up when it enters, `130+` in orange. NBC + FOX61 links.
- **04 Work Drama**: background transitions to ink as this case enters. Prominent "Listen to Work Drama" link styled as a large text link with a circular play icon, not a pill button.

### Listen & Watch (ink background)

Purpose: hiring manager must find it instantly (the job asks to see/hear her interview). Header link `Listen` points here.

- Heading `Listen & Watch` in `text-display`.
- Four full-width rows separated by rules (NBC first, larger, with a small orange `Featured` label). Each row: index number, title (Gloock `text-h2`), outlet + kind (label), arrow icon right.
- Hover (desktop): row text shifts right 12px, arrow rotates -45°, and a small image preview follows the cursor (Locks of Liz → `product-collection`, Work Drama → `host-49`, TV rows → `boss-babes/brand-kit`).

### Approach: The Diagnosis (paper)

- Label `Approach`, heading `The Diagnosis` in `text-display`.
- First paragraph as a statement (`text-lead`), rest as body.
- Four pillars in a 4-column row (2x2 mobile) separated by vertical rules: number + pillar name in Gloock. A thin orange line draws across them on scroll, ending at a `72h` display number labelled `Turnaround`.
- Image `portrait/lizbeth-04` (hands on audit pages) large, and the Done Right Plumbing brand kit smaller with caption `Identity example — Done Right Plumbing`.
- Closer: the three short sentences `Find the gap. Name it plainly. Fix the thing that matters most.` each on its own line in `text-h1`, revealed line by line.

### Contact (teal background, ink text)

- Label `Contact`. Her name in `text-display`.
- Email as a huge link (`text-h1`, wraps safely on mobile), underline draws on hover.
- Rows with rules: Phone, LinkedIn, Website. Clean. No form.

### Footer (teal, continues contact)

`© 2026 Lizbeth Marquez-Flores` left, `Back to top` right (Lenis scrollTo 0).

### Cursor (desktop, pointer: fine only)

12px ink dot (mix-blend-difference) with lerped follow. Grows to 64px with a label (`Open`, `Listen`, `Watch`) on links that have `data-cursor`. Hidden on touch devices.

## Banned (instant redo if you see it)

- Centered hero with headline + subtext + two buttons
- Cards with rounded corners, shadows, icon-on-top grids, bento grids
- Gradients, blobs, glassmorphism, glows, noise overlays everywhere
- Pill buttons as the main CTA style
- The same fade-up on every element; animations that run on everything
- Emoji, Lucide-style icons, icon decorations next to every heading
- Inter, Poppins, Roboto, Montserrat
- Outline/stroke text, rotating text badges, marquee of generic words
- Invented copy, stats, logos, testimonials, client names (only numbers already in `src/content/` or visible in her screenshots)
- Anything overlapping her name on the cover

## Accessibility & performance

- Contrast: ink on paper, ink on teal, paper on ink. Orange only on ink/paper for large text or decorative lines.
- `next/image` with correct `width`/`height` and `sizes`. Cover portrait `priority`.
- Lighthouse performance ≥ 85 on desktop.
