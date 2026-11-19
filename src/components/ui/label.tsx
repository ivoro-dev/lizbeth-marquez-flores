import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

type LabelProps = ComponentProps<"span"> & {
  /** Optional index shown before the text, e.g. "01" → "01 · Challenge" */
  number?: string;
  /** teal (default), muted, or inherit the surrounding text colour */
  tone?: "teal" | "muted" | "current";
  as?: ElementType;
};

const tones = {
  teal: "text-teal-text",
  muted: "text-muted",
  current: "",
} as const;

/** Small uppercase label, optionally numbered: `01 · Challenge`. */
export function Label({
  number,
  tone = "teal",
  as: Tag = "span",
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <Tag
      className={cn(
        "text-label inline-block font-sans leading-none font-medium tracking-[0.12em] uppercase",
        tones[tone],
        className,
      )}
      {...props}
    >
      {number && (
        <>
          <span className="tabular-nums">{number}</span>
          <span aria-hidden="true"> · </span>
        </>
      )}
      {children}
    </Tag>
  );
}
