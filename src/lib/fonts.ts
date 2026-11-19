import { Gloock, Schibsted_Grotesk } from "next/font/google";

/** Display: high-contrast serif for headlines, names, big numbers. One weight. */
export const fontDisplay = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display-family",
  display: "swap",
});

/** Text: editorial grotesk for body, labels, UI. */
export const fontSans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans-family",
  display: "swap",
});
