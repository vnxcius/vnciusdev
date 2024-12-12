"use client"

import clsx from "clsx";

interface Props {
  className?: string;
};

export default function Separator({ className }: Props) {
  return (
    <hr
      className={clsx(
        "border-neutral-200 dark:border-baltic-sea duration-150", className
      )}
    />
  )
};