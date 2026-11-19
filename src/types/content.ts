export type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type LinkItem = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  role: string;
  disciplines: string[];
  location?: string;
  status?: string;
  challenge: string;
  decision: string;
  work: string;
  /** "Results" for finished work, "Status" for in-progress work */
  outcomeLabel: "Results" | "Status";
  outcome: string;
  stat?: { from: string; to: string; label: string };
  images: Img[];
  links?: LinkItem[];
  note?: string;
};

export type MediaItem = {
  title: string;
  outlet: string;
  description: string;
  href: string;
  kind: "podcast-host" | "podcast-guest" | "tv";
  featured?: boolean;
};
