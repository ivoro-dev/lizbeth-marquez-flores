import type { Img } from "@/types/content";

export const about = {
  headline: "I build brands that know what they are.",
  paragraphs: [
    "My background is unusual on purpose. Seventeen years in clinical healthcare taught me how people actually decide what to trust about their own bodies. Seven years founding and running a patented consumer brand taught me what happens when strategy meets a purchase order. Today I run The Brand Formula, a brand strategy practice for established business owners who are good at what they do and invisible in their market.",
    "I work diagnostically. Before I recommend anything, I find out what's actually broken positioning, voice, visual direction, audience alignment and I say so plainly. Most brands don't need more content. They need to decide who they are first.",
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
  src: "/images/portrait/lizbeth-06.webp",
  alt: "Lizbeth Marquez-Flores leaning on a wooden table with a laptop",
  width: 1024,
  height: 1535,
};
