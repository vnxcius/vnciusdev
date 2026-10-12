import {
  ArrowUpRightIcon,
  CaretDownIcon,
  CubeIcon,
  DownloadSimpleIcon,
  GameControllerIcon,
  GitBranchIcon,
  HardDrivesIcon,
  ProhibitIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

import { cn } from "@/lib/cn";

import { buttonVariants, ExternalLink, Mark } from "./ui";

const config = {
  minecraftTools: {
    icon: CubeIcon,
    site: "https://minecraft-tools.cc",
    code: "https://gitlab.com/vncius/minecraft-tools",
    image: { src: "/projects/minecraft_tools.png", width: 1200, height: 630 },
    stack: ["TypeScript", "React", "Tailwind CSS"],
  },
  vndl: {
    icon: DownloadSimpleIcon,
    site: "https://dl.vncius.dev",
    code: "https://gitlab.com/vncius/vndl",
    image: { src: "/projects/vndl.png", width: 1200, height: 630 },
    stack: ["Go", "React", "Tailwind CSS"],
  },
  mcManager: {
    icon: HardDrivesIcon,
    site: null,
    code: "https://gitlab.com/vncius/mc-selfhosted-manager",
    image: null,
    stack: ["TypeScript", "React", "Bun"],
  },
  ultimateTrainer: {
    icon: GameControllerIcon,
    site: null,
    code: "https://gitlab.com/vncius/payday-2-ultimate-trainer",
    image: {
      src: "/projects/ultimate_trainer_7.png",
      width: 1000,
      height: 660,
    },
    stack: ["Rust", "Lua", "React"],
  },
  siteBlocker: {
    icon: ProhibitIcon,
    site: null,
    code: "https://gitlab.com/vncius/simple-site-blocker",
    image: null,
    stack: ["TypeScript", "Vite"],
  },
};

export type ProjectId = keyof typeof config;

export interface ProjectContent {
  name: string;
  description: string;
  details: string;
}

export function Projects({
  heading,
  projects,
  labels,
}: {
  heading: string;
  projects: Record<ProjectId, ProjectContent>;
  labels: { visit: string; viewCode: string };
}) {
  const [open, setOpen] = useState<ProjectId | null>(null);
  const ids = Object.keys(config) as ProjectId[];

  return (
    <section aria-labelledby="projects-heading" className="flex flex-col gap-5">
      <h2 id="projects-heading">{heading}</h2>
      <ul className="space-y-5.5">
        {ids.map((id) => {
          const { icon: Icon, site, code, image, stack } = config[id];
          const project = projects[id];
          const isOpen = open === id;
          return (
            <li key={id}>
              <button
                aria-controls={`project-${id}`}
                aria-expanded={isOpen}
                className="relative grid w-full min-w-0 cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2.5 text-left outline-none before:absolute before:-inset-x-3 before:-inset-y-2 before:rounded-xl before:transition-colors before:duration-200 before:content-[''] before:squircle hover:before:bg-timeline-hover focus-visible:before:bg-timeline-hover [&>*]:relative"
                onClick={() => setOpen(isOpen ? null : id)}
                type="button"
              >
                <Mark>
                  <Icon />
                </Mark>
                <span className="min-w-0">
                  <span className="block text-sm">{project.name}</span>
                  <span className="block text-[13px] text-foreground-secondary">
                    {project.description}
                  </span>
                </span>
                <CaretDownIcon
                  className={cn(
                    "size-3.5 text-muted-foreground transition-transform duration-300 ease-out",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              <div
                className={cn(
                  "grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-out",
                  isOpen
                    ? "visible grid-rows-[1fr] opacity-100"
                    : "invisible grid-rows-[0fr] opacity-0",
                )}
                id={`project-${id}`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-3 pt-4 pl-10.5">
                    <p className="text-[13px] leading-5 text-foreground-tertiary">
                      {project.details}
                    </p>
                    {image && (
                      <img
                        alt={project.name}
                        className="h-auto w-full rounded-xl border border-border squircle"
                        decoding="async"
                        height={image.height}
                        loading="lazy"
                        src={image.src}
                        width={image.width}
                      />
                    )}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <ul className="flex flex-wrap gap-1.5">
                        {stack.map((technology) => (
                          <li
                            className="rounded-md border border-border bg-accent px-1.5 py-0.5 text-[12px] text-foreground-secondary"
                            key={technology}
                          >
                            {technology}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {site && (
                          <ExternalLink
                            className={buttonVariants.primary}
                            href={site}
                          >
                            {labels.visit}
                            <ArrowUpRightIcon className="size-3.5" />
                          </ExternalLink>
                        )}
                        <ExternalLink
                          className={buttonVariants.outline}
                          href={code}
                        >
                          <GitBranchIcon className="size-3.5" />
                          {labels.viewCode}
                        </ExternalLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
