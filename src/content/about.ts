import type { Img } from "@/types/content";

export const about = {
  headline: "I build brands that know who they are.",
  paragraphs: [
    "Most brands don’t need more content. They need to decide who they are first.",
    "That’s the work I do: finding what’s actually broken in a brand, naming it plainly, and building the version that makes the business recognizable. Positioning, voice, visual direction, audience alignment. Most of it starts with the words that make a brand understood, trusted, and remembered and I won’t recommend anything before I know what’s wrong.",
    "My background is unusual on purpose. Seventeen years in clinical healthcare and a degree in Biology taught me how people actually decide what to trust about their own bodies and how to read the evidence behind a claim myself. Seven years founding and running a patented consumer brand taught me what happens when strategy meets a purchase order; pricing, packaging, inventory, and a P&L I answered for. Today I run The Brand Formula, a brand strategy practice for established business owners who are good at what they do but invisible in their market.",
  ],
  credentials: [
    "Certified in Brand Management, University of London's London Business School",
    "Bilingual, English and Spanish",
  ],
  portrait: {
    src: "/images/portrait/lizbeth-21.webp",
    alt: "Lizbeth Marquez-Flores standing against a wall, smiling, capturing her photo",
    width: 1024,
    height: 1535,
  } satisfies Img,
};

/** Full-width image between the cover and About. */
export const bandPortrait: Img = {
  src: "/images/portrait/lizbeth-03.webp",
  alt: "Lizbeth Marquez-Flores at a table reviewing printed brand documents",
  width: 1024,
  height: 1535,
};

export const coverPortrait: Img = {
  src: "/images/portrait/lizbeth-09-cutout.webp",
  alt: "Lizbeth Marquez-Flores standing, smiling, in a blue blouse and jeans",
  width: 427,
  height: 1104,
};

/** Cards on the dial under the cover: Lizbeth at work, titled by discipline. */
export const scopeCards: (Img & { title: string })[] = [
  {
    src: "/images/portrait/lizbeth-07.webp",
    alt: "Lizbeth Marquez-Flores at a table with her laptop",
    width: 1024,
    height: 1535,
    title: "Brand Strategy",
  },
  {
    src: "/images/portrait/lizbeth-18.webp",
    alt: "Lizbeth pinning colour swatches and brand cards to a wall",
    width: 1024,
    height: 1535,
    title: "Visual Identity",
  },
  {
    src: "/images/work-drama/host-55.webp",
    alt: "Lizbeth in the Work Drama studio with the red mug",
    width: 1024,
    height: 1535,
    title: "Storytelling",
  },
  {
    src: "/images/portrait/lizbeth-26.webp",
    alt: "Lizbeth on a sofa with her laptop, smiling",
    width: 1024,
    height: 1535,
    title: "Content Strategy",
  },
  {
    src: "/images/work-drama/host-49.webp",
    alt: "Lizbeth at the podcast desk with a microphone",
    width: 1024,
    height: 683,
    title: "Interviewing",
  },
];
