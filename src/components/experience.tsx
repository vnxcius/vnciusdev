"use client";

import {
  BuildingOfficeIcon,
  CaretUpDownIcon,
  GraduationCapIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

import { cn } from "@/lib/cn";

import { buttonVariants, ExternalLink, Mark } from "./ui";

const icons = {
  work: BuildingOfficeIcon,
  education: GraduationCapIcon,
};

export interface ExperienceItem {
  title: string;
  role: string;
  description: string;
  bullets: string[];
  date: string;
  link: string | null;
  kind: keyof typeof icons;
}

function Title({ item, active }: { item: ExperienceItem; active: boolean }) {
  const title = (
    <span
      className={cn(
        "block w-fit text-sm",
        active ? "text-foreground" : "text-foreground-secondary",
      )}
    >
      {item.title}
    </span>
  );
  if (!item.link) return title;
  return (
    <ExternalLink className="block w-fit rounded-sm" href={item.link}>
      {title}
    </ExternalLink>
  );
}

export function Experience({
  heading,
  items,
  labels,
}: {
  heading: string;
  items: ExperienceItem[];
  labels: { seeMore: string; seeLess: string };
}) {
  const [expanded, setExpanded] = useState(false);
  const columns = {
    gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2>{heading}</h2>
        <button
          aria-controls="experience-content"
          aria-expanded={expanded}
          className={cn(buttonVariants.ghost, "-mr-2 max-[569px]:hidden")}
          onClick={() => setExpanded((value) => !value)}
          type="button"
        >
          {expanded ? labels.seeLess : labels.seeMore}
          <CaretUpDownIcon className="size-3.5" />
        </button>
      </div>

      <div id="experience-content">
        {/* Horizontal timeline: wide screens, collapsed */}
        <div
          className={cn(
            "relative hidden animate-enter pb-2",
            !expanded && "min-[570px]:block",
          )}
        >
          <div aria-hidden="true" className="absolute inset-x-0 top-0">
            <div className="absolute top-1 right-2 left-3 h-px -translate-y-1/2 bg-timeline-line" />
            <div className="grid gap-2" style={columns}>
              {items.map((item, index) => (
                <div className="relative" key={item.title}>
                  {index === 0 && (
                    <div className="absolute top-1 left-3 h-px w-[calc(100%+0.5rem)] origin-left -translate-y-1/2 animate-draw bg-[linear-gradient(to_right,var(--brand)_0%,var(--timeline-line)_70%,var(--timeline-line)_100%)]" />
                  )}
                  <div className="relative z-10 -mt-1 ml-1 flex size-4 items-center justify-center rounded-full bg-background">
                    <div className="relative size-2">
                      {index === 0 && (
                        <div className="absolute -inset-1 animate-pulse rounded-full timeline-status-halo" />
                      )}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full",
                          index === 0 ? "bg-brand" : "bg-timeline-dot",
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ol className="grid gap-2" style={columns}>
            {items.map((item, index) => {
              const Icon = icons[item.kind];
              return (
                <li className="min-w-0 pt-6" key={item.title}>
                  <div className="flex min-w-0 flex-col gap-2">
                    <div className="flex min-w-0 items-center gap-x-2.5">
                      <Mark size="sm">
                        <Icon />
                      </Mark>
                      <Title active={index === 0} item={item} />
                    </div>
                    <p className="text-[13px] text-muted-foreground">
                      {item.date}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Detailed list: small screens, or expanded */}
        <ol
          className={cn(
            "animate-enter space-y-5.5",
            !expanded && "min-[570px]:hidden",
          )}
        >
          {items.map((item) => {
            const Icon = icons[item.kind];
            return (
              <li
                className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-2.5 gap-y-2"
                key={item.title}
              >
                <span className="self-center">
                  <Mark>
                    <Icon />
                  </Mark>
                </span>
                <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <span className="min-w-0">
                    <Title active item={item} />
                    <span className="block text-[13px] text-foreground-secondary">
                      {item.role}
                    </span>
                  </span>
                  <span className="text-[13px] whitespace-nowrap text-muted-foreground">
                    {item.date}
                  </span>
                </div>
                <div className="col-start-2 space-y-1 text-[13px] leading-5 text-foreground-tertiary">
                  <p>{item.description}</p>
                  {item.bullets.length > 0 && (
                    <ul className="space-y-1 pl-3.5">
                      {item.bullets.map((bullet) => (
                        <li
                          className="relative before:absolute before:top-2 before:-left-3.5 before:size-1 before:rounded-full before:bg-timeline-dot before:content-['']"
                          key={bullet}
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
