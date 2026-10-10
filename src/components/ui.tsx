import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

const buttonBase =
  "squircle inline-flex shrink-0 cursor-pointer items-center justify-center border text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,transform] duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.97] [&_svg]:pointer-events-none [&_svg]:shrink-0";

export const buttonVariants = {
  primary: cn(
    buttonBase,
    "h-8 gap-1.5 rounded-lg border-transparent bg-primary px-2.5 text-primary-foreground hover:bg-primary/80",
  ),
  outline: cn(
    buttonBase,
    "h-8 gap-1.5 rounded-lg border-border bg-background px-2.5 hover:bg-muted dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
  ),
  icon: cn(
    buttonBase,
    "size-7 rounded-md border-transparent text-foreground-secondary hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 [&_svg]:size-4",
  ),
  ghost: cn(
    buttonBase,
    "h-7 gap-1 rounded-md border-transparent px-2 text-[13px] font-normal text-foreground-secondary hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
  ),
};

export const inlineLinkClass =
  "underline decoration-brand/50 underline-offset-3 hover:decoration-brand";

export function ExternalLink({ children, ...props }: ComponentProps<"a">) {
  return (
    <a rel="noreferrer" target="_blank" {...props}>
      {children}
    </a>
  );
}

// The small bordered box that holds an icon next to a company or project.
export function Mark({
  children,
  size = "md",
}: {
  children: ReactNode;
  size?: "sm" | "md";
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-mark border border-border bg-accent text-foreground-secondary squircle",
        size === "md" ? "size-8 [&_svg]:size-4.5" : "size-6 [&_svg]:size-3.5",
      )}
    >
      {children}
    </span>
  );
}
