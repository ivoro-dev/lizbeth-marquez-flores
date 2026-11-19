import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type RuleProps = ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
};

/**
 * 1px document rule. Uses the current text colour at 14% (same as the `line`
 * token on paper), so it also works on ink and teal sections.
 */
export function Rule({
  orientation = "horizontal",
  className,
  ...props
}: RuleProps) {
  const vertical = orientation === "vertical";
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-current opacity-[0.14]",
        vertical ? "w-px self-stretch" : "h-px w-full",
        className,
      )}
      {...props}
    />
  );
}
