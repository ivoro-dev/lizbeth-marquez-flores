"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, PrinterIcon } from "@phosphor-icons/react";
import {
  about,
  approach,
  coverPortrait,
  media,
  press,
  projects,
  site,
} from "@/content";

export default function PdfPortfolio() {
  const locksOfLiz = projects.find((p) => p.slug === "locks-of-liz")!;
  const wholeness = projects.find((p) => p.slug === "wholeness-acupuncture")!;
  const bossBabes = projects.find((p) => p.slug === "boss-babes-brunch")!;
  const workDrama = projects.find((p) => p.slug === "work-drama")!;

  return (
    <div className="bg-[#e8e4dc] text-ink min-h-screen print:bg-white print:p-0">
      {/* Print / Navigation Action Bar (Hidden on print) */}
      <aside
        aria-label="PDF controls"
        className="bg-ink/90 text-paper sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 backdrop-blur-md print:hidden"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hover:text-orange text-label flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeftIcon weight="bold" className="size-4" />
            Back to Website
          </Link>
          <span className="text-paper/30">|</span>
          <span className="font-display text-sm tracking-wide">
            {site.name} · Landscape Portfolio
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-orange text-ink hover:bg-white text-label flex items-center gap-2 rounded-full px-4 py-2 font-medium tracking-wide uppercase transition-colors"
          >
            <PrinterIcon weight="bold" className="size-4" />
            Print / Save as PDF
          </button>
        </div>
      </aside>

      {/* Slide Container Deck */}
      <main className="mx-auto flex flex-col items-center gap-10 py-10 print:m-0 print:gap-0 print:p-0">
        {/* ========================================================== */}
        {/* SLIDE 1: COVER */}
        {/* ========================================================== */}
        <section className="pdf-slide bg-paper flex flex-col justify-between p-12 print:p-10">
          <div className="flex items-start justify-between border-b border-ink/15 pb-4">
            <div>
              <p className="text-label text-teal tracking-[0.15em] uppercase font-semibold">
                Brand Strategy &amp; Brand Storytelling
              </p>
              <p className="text-muted text-xs mt-1">Portfolio &amp; Case Files</p>
            </div>
            <p className="text-label text-muted tracking-[0.12em] uppercase">
              {site.range}
            </p>
          </div>

          <div className="grid grid-cols-12 gap-8 items-end my-auto py-4">
            <div className="col-span-8">
              <h1 className="font-display text-[5.5rem] leading-[0.9] tracking-[-0.02em] text-ink">
                <span>{site.firstName}</span>
                <br />
                <span className="text-orange">Marquez</span>-Flores
              </h1>
              <p className="font-sans text-lead text-muted mt-6 max-w-[42ch]">
                Diagnosing what's broken, defining strategic positioning, and building brands with clinical clarity.
              </p>
            </div>

            <div className="col-span-4 relative aspect-[3/4] w-full max-h-[380px] overflow-hidden border border-ink/10 shadow-sm">
              <Image
                src={coverPortrait.src}
                alt={coverPortrait.alt}
                fill
                priority
                className="object-cover object-[50%_20%]"
              />
            </div>
          </div>

          <div className="flex items-end justify-between border-t border-ink/15 pt-4 text-xs text-muted">
            <div className="flex gap-8">
              <span>01 Locks of Liz</span>
              <span>02 Wholeness Acupuncture</span>
              <span>03 Boss Babes &amp; Brunch</span>
              <span>04 Work Drama</span>
            </div>
            <p className="font-display text-sm tracking-wide text-ink">LMF</p>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SLIDE 2: ABOUT & DIAGNOSTIC PHILOSOPHY */}
        {/* ========================================================== */}
        <section className="pdf-slide bg-paper flex flex-col justify-between p-12 print:p-10">
          <div className="flex items-center justify-between border-b border-ink/15 pb-4">
            <span className="text-label text-teal tracking-[0.15em] uppercase font-semibold">
              01 · Background &amp; Philosophy
            </span>
            <span className="text-label text-muted">About</span>
          </div>

          <div className="grid grid-cols-12 gap-10 my-auto py-2">
            <div className="col-span-5 relative aspect-[3/4] w-full max-h-[390px] overflow-hidden border border-ink/10">
              <Image
                src={about.portrait.src}
                alt={about.portrait.alt}
                fill
                className="object-cover"
              />
            </div>

            <div className="col-span-7 flex flex-col justify-center">
              <h2 className="font-display text-h2 leading-[1.05] tracking-[-0.015em] text-ink">
                {about.headline}
              </h2>

              <p className="text-body text-ink/90 mt-5 leading-relaxed">
                {about.paragraphs[0]}
              </p>
              <p className="text-body text-ink/80 mt-4 leading-relaxed">
                {about.paragraphs[1]}
              </p>

              <div className="mt-6 pt-5 border-t border-ink/10">
                <span className="text-label text-teal tracking-wider uppercase font-semibold block mb-2">
                  Credentials
                </span>
                <ul className="text-xs text-muted space-y-1.5">
                  {about.credentials.map((c) => (
                    <li key={c}>• {c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-ink/15 pt-3 text-xs text-muted">
            <span>The Brand Formula</span>
            <span>Diagnostic Strategy</span>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SLIDE 3: CASE 01 — LOCKS OF LIZ */}
        {/* ========================================================== */}
        <section className="pdf-slide bg-paper flex flex-col justify-between p-12 print:p-10">
          <div className="flex items-center justify-between border-b border-ink/15 pb-4">
            <span className="text-label text-teal tracking-[0.15em] uppercase font-semibold">
              Case 01 / 04 · DTC &amp; Retail Packaging
            </span>
            <span className="text-label text-muted">Patented Consumer Goods</span>
          </div>

          <div className="grid grid-cols-12 gap-8 my-auto py-2">
            <div className="col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-h1 leading-none text-ink">
                  {locksOfLiz.title}
                </h2>
                <p className="text-xs text-muted mt-2">
                  {locksOfLiz.role} · {locksOfLiz.location} · {locksOfLiz.disciplines.join(" · ")}
                </p>

                <div className="mt-5 space-y-3.5 text-xs">
                  <div>
                    <span className="font-semibold text-teal tracking-wider uppercase block mb-1">
                      01 · Challenge
                    </span>
                    <p className="text-ink/80 leading-relaxed">{locksOfLiz.challenge}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-teal tracking-wider uppercase block mb-1">
                      02 · Decision
                    </span>
                    <p className="font-display text-sm text-ink leading-snug border-l-2 border-orange pl-2.5">
                      {locksOfLiz.decision}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-teal tracking-wider uppercase block mb-1">
                      03 · Work
                    </span>
                    <p className="text-ink/80 leading-relaxed">{locksOfLiz.work}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-teal tracking-wider uppercase block mb-1">
                      04 · {locksOfLiz.outcomeLabel}
                    </span>
                    <p className="text-ink/80 leading-relaxed">{locksOfLiz.outcome}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-ink/10 flex items-center justify-between">
                <div className="text-xs text-muted flex gap-4 items-center">
                  <span className="font-semibold text-ink">Press:</span>
                  {press
                    .filter((p) => p.outlet !== "FOX61")
                    .map((p) => (
                      <a
                        key={p.outlet}
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-orange text-ink/80"
                      >
                        {p.outlet}
                      </a>
                    ))}
                </div>
                {locksOfLiz.links?.[0] && (
                  <a
                    href={locksOfLiz.links[0].href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-orange underline font-medium"
                  >
                    {locksOfLiz.links[0].label} ↗
                  </a>
                )}
              </div>
            </div>

            <div className="col-span-5 grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-ink/10">
                <Image
                  src="/images/locks-of-liz/product-collection.webp"
                  alt="Locks of Liz product line"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-ink/10">
                <Image
                  src="/images/locks-of-liz/label-lock-length-oil.webp"
                  alt="Product packaging label"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-ink/15 pt-3 text-xs text-muted">
            <span>Case File 01</span>
            <span>Locks of Liz Haircare</span>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SLIDE 4: CASE 02 — WHOLENESS ACUPUNCTURE */}
        {/* ========================================================== */}
        <section className="pdf-slide bg-paper flex flex-col justify-between p-12 print:p-10">
          <div className="flex items-center justify-between border-b border-ink/15 pb-4">
            <span className="text-label text-teal tracking-[0.15em] uppercase font-semibold">
              Case 02 / 04 · Clinical Practice Positioning
            </span>
            <span className="text-label text-muted">Positioning &amp; Social Strategy</span>
          </div>

          <div className="grid grid-cols-12 gap-8 my-auto py-2">
            <div className="col-span-6 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-h2 leading-tight text-ink">
                  {wholeness.title}
                </h2>
                <p className="text-xs text-muted mt-1.5">
                  {wholeness.role} · {wholeness.location} · {wholeness.disciplines.join(" · ")}
                </p>

                <div className="mt-4 space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-teal tracking-wider uppercase block mb-1">
                      01 · Challenge
                    </span>
                    <p className="text-ink/80 leading-relaxed">{wholeness.challenge}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-teal tracking-wider uppercase block mb-1">
                      02 · Decision
                    </span>
                    <p className="font-display text-sm text-ink leading-snug border-l-2 border-orange pl-2.5">
                      {wholeness.decision}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-teal tracking-wider uppercase block mb-1">
                      03 · Work
                    </span>
                    <p className="text-ink/80 leading-relaxed">{wholeness.work}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-teal tracking-wider uppercase block mb-1">
                      04 · Status
                    </span>
                    <p className="text-ink/80 leading-relaxed">{wholeness.outcome}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-6 flex flex-col justify-between gap-4">
              <div className="border border-ink/10 bg-white p-3 rounded-none">
                <span className="text-[10px] text-teal font-semibold uppercase tracking-wider block mb-2">
                  Profile Positioning &amp; Bio Rewrite
                </span>
                <div className="space-y-2">
                  <div>
                    <span className="text-[9px] text-muted uppercase font-bold block">Before</span>
                    <div className="relative aspect-[1179/281] w-full border border-ink/5">
                      <Image
                        src="/images/wholeness/bio-before.webp"
                        alt="Bio before rewrite"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] text-teal uppercase font-bold block">After</span>
                    <div className="relative aspect-[1179/261] w-full border border-ink/5">
                      <Image
                        src="/images/wholeness/bio-after.webp"
                        alt="Bio after rewrite"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-ink/10 bg-white p-3">
                <span className="text-[10px] text-teal font-semibold uppercase tracking-wider block mb-2">
                  1-Month Performance Proof (Client Screenshots)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative aspect-[1179/613] w-full border border-ink/5">
                    <Image
                      src="/images/wholeness/profile-before.webp"
                      alt="Profile before"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative aspect-[1179/613] w-full border border-ink/5">
                    <Image
                      src="/images/wholeness/profile-after-1-month.webp"
                      alt="Profile 1 month later"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-ink/15 pt-3 text-xs text-muted">
            <span>Case File 02</span>
            <span>Wholeness Acupuncture Center</span>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SLIDE 5: CASE 03 — BOSS BABES & BRUNCH */}
        {/* ========================================================== */}
        <section className="pdf-slide bg-paper flex flex-col justify-between p-12 print:p-10">
          <div className="flex items-center justify-between border-b border-ink/15 pb-4">
            <span className="text-label text-teal tracking-[0.15em] uppercase font-semibold">
              Case 03 / 04 · Community &amp; Event Brand
            </span>
            <span className="text-label text-muted">Identity &amp; Growth</span>
          </div>

          <div className="grid grid-cols-12 gap-8 my-auto py-2">
            <div className="col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-h1 leading-tight text-ink">
                  {bossBabes.title}
                </h2>
                <p className="text-xs text-muted mt-1.5">
                  {bossBabes.role} · {bossBabes.location} · {bossBabes.disciplines.join(" · ")}
                </p>

                <div className="mt-5 space-y-3.5 text-xs">
                  <div>
                    <span className="font-semibold text-teal tracking-wider uppercase block mb-1">
                      01 · Challenge
                    </span>
                    <p className="text-ink/80 leading-relaxed">{bossBabes.challenge}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-teal tracking-wider uppercase block mb-1">
                      02 · Decision
                    </span>
                    <p className="font-display text-sm text-ink leading-snug border-l-2 border-orange pl-2.5">
                      {bossBabes.decision}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-teal tracking-wider uppercase block mb-1">
                      03 · Work
                    </span>
                    <p className="text-ink/80 leading-relaxed">{bossBabes.work}</p>
                  </div>
                </div>

                {bossBabes.stat && (
                  <div className="mt-5 pt-3 border-t border-ink/10">
                    <p className="font-display text-4xl text-ink">
                      {bossBabes.stat.from} → <span className="text-orange">{bossBabes.stat.to}</span>
                    </p>
                    <p className="text-xs text-muted mt-0.5">{bossBabes.stat.label}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-ink/10 flex gap-6 text-xs">
                {bossBabes.links?.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-orange font-medium"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>

            <div className="col-span-5 relative aspect-[3/4] w-full max-h-[390px] overflow-hidden border border-ink/10">
              <Image
                src="/images/boss-babes/brand-kit.webp"
                alt="Boss Babes brand kit"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-ink/15 pt-3 text-xs text-muted">
            <span>Case File 03</span>
            <span>Boss Babes &amp; Brunch</span>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SLIDE 6: CASE 04 — WORK DRAMA */}
        {/* ========================================================== */}
        <section className="pdf-slide bg-ink text-paper flex flex-col justify-between p-12 print:p-10">
          <div className="flex items-center justify-between border-b border-paper/15 pb-4">
            <span className="text-label text-orange tracking-[0.15em] uppercase font-semibold">
              Case 04 / 04 · Podcast &amp; Verbal Identity
            </span>
            <span className="text-label text-paper/60">Storytelling in Practice</span>
          </div>

          <div className="grid grid-cols-12 gap-8 my-auto py-2">
            <div className="col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-h1 leading-tight text-paper">
                  {workDrama.title}
                </h2>
                <p className="text-xs text-paper/60 mt-1.5">
                  {workDrama.role} · {workDrama.location} · {workDrama.disciplines.join(" · ")}
                </p>

                <div className="mt-5 space-y-3.5 text-xs">
                  <div>
                    <span className="font-semibold text-orange tracking-wider uppercase block mb-1">
                      01 · Challenge
                    </span>
                    <p className="text-paper/80 leading-relaxed">{workDrama.challenge}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-orange tracking-wider uppercase block mb-1">
                      02 · Decision
                    </span>
                    <p className="font-display text-sm text-paper leading-snug border-l-2 border-orange pl-2.5">
                      {workDrama.decision}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-orange tracking-wider uppercase block mb-1">
                      03 · Work
                    </span>
                    <p className="text-paper/80 leading-relaxed">{workDrama.work}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-orange tracking-wider uppercase block mb-1">
                      04 · {workDrama.outcomeLabel}
                    </span>
                    <p className="text-paper/80 leading-relaxed">{workDrama.outcome}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-paper/15 flex gap-6 text-xs">
                {workDrama.links?.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-orange font-medium"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>

            <div className="col-span-5 grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-paper/10">
                <Image
                  src="/images/work-drama/host-49.webp"
                  alt="Work Drama podcast host in studio"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-paper/10">
                <Image
                  src="/images/work-drama/spotify-show-page.webp"
                  alt="Spotify show page evidence"
                  fill
                  className="object-contain bg-black/40"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-paper/15 pt-3 text-xs text-paper/60">
            <span>Case File 04</span>
            <span>Work Drama Podcast</span>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SLIDE 7: LISTEN & WATCH */}
        {/* ========================================================== */}
        <section className="pdf-slide bg-ink text-paper flex flex-col justify-between p-12 print:p-10">
          <div className="flex items-center justify-between border-b border-paper/15 pb-4">
            <span className="text-label text-orange tracking-[0.15em] uppercase font-semibold">
              Media, Broadcast &amp; Spoken Storytelling
            </span>
            <span className="text-label text-paper/60">Hear &amp; See Her</span>
          </div>

          <div className="my-auto py-2">
            <h2 className="font-display text-4xl leading-tight mb-2">
              Listen &amp; Watch
            </h2>
            <p className="text-xs text-paper/70 mb-6 max-w-[50ch]">
              Direct clickable broadcast interviews, guest appearances, and podcast episodes demonstrating verbal presence, interview agility, and message delivery.
            </p>

            <ul className="border-t border-paper/15 divide-y divide-paper/15">
              {media.map((m, i) => (
                <li key={m.href} className="py-4 flex items-center justify-between gap-6">
                  <div className="flex items-baseline gap-4">
                    <span className="text-label text-orange font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      {m.featured && (
                        <span className="text-[10px] text-orange tracking-widest uppercase font-semibold block mb-0.5">
                          Featured Broadcast
                        </span>
                      )}
                      <a
                        href={m.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-display text-xl text-paper hover:text-orange underline transition-colors"
                      >
                        {m.title} ↗
                      </a>
                    </div>
                  </div>
                  <span className="text-xs text-paper/60 whitespace-nowrap">
                    {m.outlet} · {m.kind}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between border-t border-paper/15 pt-3 text-xs text-paper/60">
            <span>Broadcast &amp; Podcast Links</span>
            <span>Click any title to open</span>
          </div>
        </section>

        {/* ========================================================== */}
        {/* SLIDE 8: THE DIAGNOSIS & CONTACT */}
        {/* ========================================================== */}
        <section className="pdf-slide bg-teal text-ink flex flex-col justify-between p-12 print:p-10">
          <div className="flex items-center justify-between border-b border-ink/15 pb-4">
            <span className="text-label text-ink tracking-[0.15em] uppercase font-semibold">
              Methodology &amp; Contact
            </span>
            <span className="text-label text-ink/70">The Diagnosis</span>
          </div>

          <div className="grid grid-cols-12 gap-8 my-auto py-2">
            <div className="col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-4xl leading-tight text-ink">
                  {approach.name}
                </h2>
                <p className="text-xs text-ink/80 mt-2 leading-relaxed">
                  {approach.paragraphs[0]}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-ink/15">
                  {approach.pillars.map((p, i) => (
                    <div key={p} className="border-l border-ink/20 pl-2.5">
                      <span className="text-[10px] text-ink/60 font-mono block">
                        0{i + 1}
                      </span>
                      <span className="font-display text-sm font-semibold text-ink">
                        {p}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-ink/15 flex items-baseline gap-3">
                  <span className="font-display text-3xl text-orange">72h</span>
                  <span className="text-xs text-ink/75">Diagnostic Turnaround</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-ink/15 space-y-1">
                <p className="font-display text-lg font-bold text-ink">
                  Find the gap. Name it plainly. Fix the thing that matters most.
                </p>
              </div>
            </div>

            <div className="col-span-5 bg-paper/60 border border-ink/15 p-5 flex flex-col justify-between">
              <div>
                <span className="text-label text-ink tracking-widest uppercase font-semibold block mb-3">
                  Direct Inquiries
                </span>
                <p className="font-display text-2xl text-ink leading-tight mb-4">
                  {site.name}
                </p>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-ink/60 block font-semibold">Email:</span>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-ink underline font-medium hover:text-orange"
                    >
                      {site.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-ink/60 block font-semibold">Phone:</span>
                    <a
                      href={`tel:${site.phone.replace(/\D/g, "")}`}
                      className="text-ink underline font-medium hover:text-orange"
                    >
                      {site.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-ink/60 block font-semibold">LinkedIn:</span>
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink underline font-medium hover:text-orange"
                    >
                      linkedin.com/in/marquezlizbeth ↗
                    </a>
                  </div>
                  <div>
                    <span className="text-ink/60 block font-semibold">Website:</span>
                    <a
                      href={site.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink underline font-medium hover:text-orange"
                    >
                      thebrandformula.com ↗
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-ink/60 mt-4 border-t border-ink/10 pt-2">
                Available for Brand Manager &amp; Brand Storytelling leadership roles.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-ink/15 pt-3 text-xs text-ink/70">
            <span>© 2026 Lizbeth Marquez-Flores</span>
            <span>thebrandformula.com</span>
          </div>
        </section>
      </main>

      {/* Slide Deck CSS */}
      <style jsx global>{`
        .pdf-slide {
          width: 1000px;
          height: 625px; /* 16:10 landscape presentation aspect */
          box-shadow: 0 10px 35px -5px rgba(0, 0, 0, 0.15);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        @media print {
          @page {
            size: landscape;
            margin: 0;
          }
          body {
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .pdf-slide {
            width: 100vw !important;
            height: 100vh !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            break-after: page !important;
            page-break-after: always !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}

