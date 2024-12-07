"use client"

interface Props {
  className?: string;
};

export default function Separator({ className }: Props) {
  return (
    <hr
      className={`border-neutral-200 dark:border-baltic-sea duration-150 ${className}`}
    />
  )
};