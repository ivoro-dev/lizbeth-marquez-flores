import type { MediaItem } from "@/types/content";

/** Listen & Watch. Order matters: NBC first (client asked to lead with it). */
export const media: MediaItem[] = [
  {
    title: "Boss Babes & Brunch on Connecticut in Color",
    outlet: "NBC Connecticut",
    description: "Interview on using brunch to empower female business owners.",
    href: "https://www.nbcconnecticut.com/video/community/connecticut-in-color/entrepreneurs-use-brunch-to-help-empower-female-business-owners/3012440/",
    kind: "tv",
    featured: true,
  },
  {
    title: "Boss Babes & Brunch: making connections over mimosas",
    outlet: "FOX61 Morning Show",
    description: "Live morning-show interview about the event series.",
    href: "https://www.fox61.com/video/news/local/morning-show/boss-babes-and-brunch-making-connections-over-mimosas/520-26991936-97e2-44fe-b469-1b3fc2bac7de",
    kind: "tv",
  },
  {
    title: "Building Locks of Liz",
    outlet: "Podcast interview (guest)",
    description: "Lizbeth as the guest, talking about building the brand.",
    href: "https://youtu.be/8S_R9ZfoBWg",
    kind: "podcast-guest",
  },
  {
    title: "Work Drama",
    outlet: "Podcast (host)",
    description:
      "The show she co-created and co-hosts. Available on all platforms.",
    href: "https://work-drama.castos.com/subscribe",
    kind: "podcast-host",
  },
];

/** Extra press. NBC small-business story and CT Insider article are linked. */
export const press = [
  {
    outlet: "NBC Connecticut",
    href: "https://www.nbcconnecticut.com/news/local/supporting-small-business-dreams-locks-of-liz-offers-all-natural-haircare/2337706/",
  },
  { outlet: "NPR" },
  {
    outlet: "CT Insider",
    href: "https://www.ctinsider.com/business/article/ct-lizbeth-marquez-flores-locks-of-liz-curly-hair-19851435.php",
  },
  { outlet: "FOX61" },
];
