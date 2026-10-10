import { GitBranchIcon, GlobeIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getDictionary, hasLocale } from "@/dictionaries";
import { cn } from "@/lib/cn";

const technologyColors = {
  TypeScript: "bg-[#007ACC] text-zinc-100",
  React: "bg-[#61DAFB] text-zinc-950",
  TailwindCSS: "bg-[#38BDF9] text-zinc-950",
  Go: "bg-[#00ADD8] text-zinc-950",
  Rust: "bg-[#DEA584] text-zinc-950",
  Lua: "bg-[#000080] text-zinc-100",
};

type Technology = keyof typeof technologyColors;

interface Project {
  name: string;
  description: string;
  image?: { src: string; width: number; height: number };
  codeUrl: string;
  url?: string;
  technologies: Technology[];
}

function ProjectCard({
  name,
  description,
  image,
  codeUrl,
  url,
  technologies,
  labels,
}: Project & { labels: { visit: string; viewCode: string } }) {
  return (
    <div className="dark:zinc-500 divide-y divide-zinc-400 overflow-hidden rounded-sm ring-1 ring-zinc-400 dark:divide-zinc-500 dark:ring-zinc-500">
      <div className="flex items-center justify-between gap-4 p-4 max-sm:flex-col">
        <h2 className="text-xl">{name}</h2>
        <div className="flex items-center gap-x-3">
          {technologies.map((technology) => (
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-sm dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500",
                technologyColors[technology],
              )}
              key={technology}
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="p-4">{description}</p>
      </div>
      {image && (
        <Image
          alt={name}
          className="h-auto w-full"
          height={image.height}
          src={image.src}
          width={image.width}
        />
      )}
      <div className="flex w-full justify-between divide-x divide-zinc-400 dark:divide-zinc-500">
        {url && (
          <a
            className="flex grow items-center justify-center gap-2 py-4 transition-transform sm:hover:bg-zinc-100 sm:dark:hover:bg-zinc-800"
            href={url}
            target="_blank"
          >
            <GlobeIcon className="size-5" strokeWidth={1.4} /> {labels.visit}
          </a>
        )}
        <a
          className="flex grow items-center justify-center gap-2 py-4 transition-transform sm:hover:bg-zinc-100 sm:dark:hover:bg-zinc-800"
          href={codeUrl}
          target="_blank"
        >
          <GitBranchIcon className="size-5" strokeWidth={1.4} />{" "}
          {labels.viewCode}
        </a>
      </div>
    </div>
  );
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const { projects: content, visit, viewCode } = dict.projects;

  const projects: Project[] = [
    {
      ...content.minecraftTools,
      url: "https://minecraft-tools.cc",
      image: { src: "/projects/minecraft_tools.png", width: 1200, height: 630 },
      codeUrl: "https://gitlab.com/vncius/minecraft-tools",
      technologies: ["TypeScript", "React", "TailwindCSS"],
    },
    {
      ...content.vndl,
      url: "https://dl.vncius.dev",
      image: { src: "/projects/vndl.png", width: 1200, height: 630 },
      codeUrl: "https://gitlab.com/vncius/vndl",
      technologies: ["Go", "React", "TailwindCSS"],
    },
    {
      ...content.mcManager,
      codeUrl: "https://gitlab.com/vncius/mc-selfhosted-manager",
      technologies: ["TypeScript", "React"],
    },
    {
      ...content.ultimateTrainer,
      image: {
        src: "/projects/ultimate_trainer_7.png",
        width: 1000,
        height: 660,
      },
      codeUrl: "https://gitlab.com/vncius/payday-2-ultimate-trainer",
      technologies: ["Rust", "Lua", "React"],
    },
    {
      ...content.siteBlocker,
      codeUrl: "https://gitlab.com/vncius/simple-site-blocker",
      technologies: ["TypeScript"],
    },
  ];
  return (
    <>
      <h1 className="mt-4 mb-16 text-center text-5xl max-sm:text-4xl">
        {dict.projects.title}
      </h1>
      <div className="flex h-full flex-col overflow-y-auto p-1">
        <div className="space-y-20">
          {projects.map((project) => (
            <ProjectCard
              key={project.codeUrl}
              labels={{ visit, viewCode }}
              {...project}
            />
          ))}
        </div>
      </div>
    </>
  );
}
