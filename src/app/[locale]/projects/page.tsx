import { GitBranchIcon, GlobeIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getDictionary, hasLocale } from "@/dictionaries";
import type { Locale } from "@/i18n.config";

interface Project {
  name: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  url: string;
  technologies: ReactNode;
  locale: Locale;
}

function ProjectCard({
  name,
  description,
  imageUrl,
  githubUrl,
  url,
  technologies,
  locale,
}: Project) {
  return (
    <div className="dark:zinc-500 flex-col divide-y divide-zinc-400 overflow-hidden rounded-sm ring-1 ring-zinc-400 dark:divide-zinc-500 dark:ring-zinc-500">
      <div className="flex items-center justify-between gap-4 p-4 max-sm:flex-col">
        <h2 className="text-xl">{name}</h2>
        {technologies}
      </div>
      <div>
        <p className="p-4">{description}</p>
      </div>
      <Image
        alt="Logo for css2wind website"
        height={630}
        src={imageUrl}
        width={1200}
      />
      <div className="flex w-full justify-between divide-x divide-zinc-400 dark:divide-zinc-500">
        <a
          className="flex grow items-center justify-center gap-2 py-4 transition-transform sm:hover:bg-zinc-100 sm:dark:hover:bg-zinc-800"
          href={url}
          target="_blank"
        >
          <GlobeIcon className="size-5" strokeWidth={1.4} />{" "}
          {locale === "pt" ? "Visitar site" : "Visit website"}
        </a>
        <a
          className="flex grow items-center justify-center gap-2 py-4 transition-transform sm:hover:bg-zinc-100 sm:dark:hover:bg-zinc-800"
          href={githubUrl}
          target="_blank"
        >
          <GitBranchIcon className="size-5" strokeWidth={1.4} />{" "}
          {locale === "pt" ? "Ver código" : "View code"}
        </a>
      </div>
    </div>
  );
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  const projects: Project[] = [
    {
      locale,
      name: dict.projects.projects.minecraftTools.name,
      description: dict.projects.projects.minecraftTools.description,
      url: "https://vncius.dev/minecraft",
      imageUrl: "/projects/minecraft_tools.png",
      githubUrl: "https://github.com/vnxcius/blog",
      technologies: (
        <div className="flex items-center gap-x-3">
          <span className="rounded-full bg-[#007ACC] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
            TypeScript
          </span>
          <span className="rounded-full bg-[#38BDF9] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
            TailwindCSS
          </span>
          <span className="rounded-full bg-black px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
            Next.js
          </span>
        </div>
      ),
    },
    {
      locale,
      name: dict.projects.projects.softSkillsCheck.name,
      description: dict.projects.projects.softSkillsCheck.description,
      url: "https://softskillscheck.app.br/",
      imageUrl: "/projects/soft_skills_check.png",
      githubUrl: "https://github.com/senac-volunteers/soft-skills-app",
      technologies: (
        <div className="flex items-center gap-x-3">
          <span className="rounded-full bg-[#007ACC] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
            TypeScript
          </span>
          <span className="rounded-full bg-[#38BDF9] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
            TailwindCSS
          </span>
          <span className="rounded-full bg-black px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
            Next.js
          </span>
        </div>
      ),
    },
    {
      locale,
      name: dict.projects.projects.mcPanelBackend.name,
      description: dict.projects.projects.mcPanelBackend.description,
      url: "https://github.com/vnxcius/mcpanel-back",
      imageUrl: "/projects/mcpanel_back.png",
      githubUrl: "https://github.com/vnxcius/mcpanel-back",
      technologies: (
        <div className="flex items-center gap-x-3">
          <span className="rounded-full bg-[#00ADD8] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-inherit dark:ring-1 dark:ring-zinc-500">
            Go
          </span>
        </div>
      ),
    },
    {
      locale,
      name: dict.projects.projects.ecommerce.name,
      description: dict.projects.projects.ecommerce.description,
      url: "https://github.com/vnxcius/ecommerce-go",
      imageUrl: "/projects/ecommerce_go.png",
      githubUrl: "https://github.com/vnxcius/ecommerce-go",
      technologies: (
        <div className="flex items-center gap-x-3">
          <span className="rounded-full bg-[#00ADD8] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-inherit dark:ring-1 dark:ring-zinc-500">
            Go
          </span>
          <span className="rounded-full bg-[#38BDF9] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
            TailwindCSS
          </span>
        </div>
      ),
    },
  ];
  return (
    <>
      <h1 className="mt-4 mb-16 text-center text-5xl max-sm:text-4xl">
        {dict.projects.title}
      </h1>
      <div className="space-y-20">
        {projects.map((project) => (
          <ProjectCard key={project.url} {...project} />
        ))}
      </div>
    </>
  );
}
