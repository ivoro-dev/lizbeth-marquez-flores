import type { ComponentProps } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

type TextLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  /** Label the custom cursor shows on hover, e.g. "Open", "Listen", "Watch" */
  cursor?: string;
  /** Hide the arrow icon */
  noIcon?: boolean;
};

/**
 * Text link with an arrow and an underline that draws on hover/focus.
 * External URLs open in a new tab.
 */
export function TextLink({
  href,
  cursor,
  noIcon,
  className,
  children,
  ...props
}: TextLinkProps) {
  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      data-cursor={cursor}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "group focus-visible:outline-orange inline-flex items-baseline gap-[0.35em] focus-visible:outline-2 focus-visible:outline-offset-4",
        className,
      )}
      {...props}
    >
      <span className="group-hover:text-orange bg-[linear-gradient(var(--color-teal),var(--color-teal))] bg-[length:100%_0.06em] bg-left-bottom bg-no-repeat pb-[0.08em] transition-[background-size,color] duration-500 ease-[var(--ease-out-expo)] group-hover:bg-[length:100%_0.12em] group-focus-visible:bg-[length:100%_0.12em]">
        {children}
      </span>
      {!noIcon && (
        <ArrowUpRightIcon
          aria-hidden="true"
          weight="light"
          className="text-teal-text group-hover:text-orange size-[0.9em] shrink-0 translate-y-[0.1em] transition-[transform,color] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-[0.12em] group-hover:-translate-y-[0.02em]"
        />
      )}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
