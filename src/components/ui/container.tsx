import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Page-width wrapper with the design's page margins. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1920px] px-[clamp(20px,4vw,64px)]",
        className,
      )}
      {...props}
    />
  );
}
