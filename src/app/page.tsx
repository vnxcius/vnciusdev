import {
  SiGithub,
  SiGo,
  SiGoHex,
  SiInstagram,
  SiLinkedin,
  SiNextdotjs,
  SiNextdotjsHex,
  SiPostgresql,
  SiPostgresqlHex,
  SiPython,
  SiPythonHex,
  SiReact,
  SiReactHex,
  SiTailwindcss,
  SiTailwindcssHex,
  SiTypescript,
  SiTypescriptHex,
} from "@icons-pack/react-simple-icons";
import {
  ArrowUpRightIcon,
  DownloadSimpleIcon,
  PaperPlaneTiltIcon,
} from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";

interface Link {
  name: string;
  description?: string;
  url: string;
  icon?: ReactNode;
}

const externalLinks: Link[] = [
  {
    name: "LinkedIn",
    description: "follow my career",
    url: "https://www.linkedin.com/in/vinicius-hilton",
    icon: <SiLinkedin className="fill-[#0077B5] dark:fill-zinc-200" />,
  },
  {
    name: "GitHub",
    description: "steal my code",
    url: "https://github.com/vnxcius",
    icon: <SiGithub />,
  },
  {
    name: "Instagram",
    description: "see my handsome face",
    url: "https://instagram.com/vncius.ts",
    icon: <SiInstagram className="fill-[#FF0069] dark:fill-zinc-200" />,
  },
];

const ExternalLink = (link: Link) => {
  return (
    <a
      className="group flex items-center justify-between p-4 transition-transform sm:hover:bg-zinc-100 sm:dark:hover:bg-zinc-800"
      href={link.url}
      key={link.description}
      target="_blank"
    >
      <span className="group flex items-center gap-4">
        {link.icon} {link.name}
        <span className="-translate-x-4 text-zinc-500 opacity-0 transition-transform group-hover:translate-x-0 max-sm:hidden sm:group-hover:opacity-100 dark:text-zinc-400">
          {link.description}
        </span>
      </span>
      <ArrowUpRightIcon
        className="size-5 shrink-0 text-zinc-800 dark:text-zinc-200"
        strokeWidth={1.4}
      />
    </a>
  );
};

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="mb-1.5 font-semibold">Who are you, dude?</h2>
        <div className="flex flex-col *:flex *:items-center *:gap-1">
          <p>
            I&lsquo;m random guy that happens to love coding. I work mostly as
            frontend developer, but I love building stuff in Go too. My main
            knowledge:
          </p>
          <div className="my-3.5 space-x-1 *:flex *:items-center *:gap-1">
            <span>
              <SiTypescript fill={SiTypescriptHex} className="size-4" />
              TypeScript,
            </span>
            <span>
              <SiReact fill={SiReactHex} className="size-4" /> React,
            </span>
            <span>
              <SiNextdotjs
                fill={SiNextdotjsHex}
                className="size-4 dark:fill-zinc-100"
              />
              Next.js,
            </span>
            <span>
              <SiTailwindcss fill={SiTailwindcssHex} className="size-4" />
              TailwindCSS,
            </span>
            <span>
              <SiGo fill={SiGoHex} className="size-4" /> Go,
            </span>
            <span>
              <SiPostgresql
                fill={SiPostgresqlHex}
                className="size-4 dark:brightness-150"
              />{" "}
              SQL,
            </span>
            <span>
              <SiPython fill={SiPythonHex} className="size-4" /> Python
            </span>{" "}
          </div>
          <p>and other tools.</p>
        </div>
      </div>
      <div>
        <h2 className="mb-1.5 font-semibold">Get to know me</h2>
        <div className="divide-y divide-zinc-400 overflow-hidden rounded-sm ring-1 ring-zinc-400 dark:divide-zinc-500 dark:ring-zinc-500">
          {externalLinks.map((link: Link) => (
            <ExternalLink key={link.url} {...link} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-6 max-sm:flex-col-reverse sm:justify-between">
        <div className="flex flex-col justify-center max-sm:items-center">
          <div className="-m-8 flex select-all items-center gap-1 p-8 transition-transform">
            contact@vncius.dev
            <a
              className="rounded p-1 text-zinc-800 hover:bg-zinc-800/5 dark:text-zinc-200"
              href="mailto:contact@vncius.dev"
            >
              <PaperPlaneTiltIcon className="size-4" strokeWidth={1.4} />
            </a>
          </div>
          <span className="inline-flex w-fit items-center gap-1 rounded-full text-green-600 text-sm">
            <div className="size-2 animate-pulse rounded-full bg-green-500 dark:bg-emerald-500" />
            Online
          </span>
        </div>

        <a
          className="flex flex-row items-center justify-center gap-3 rounded-lg bg-emerald-100 px-4 py-2 text-emerald-700 ring-1 ring-emerald-500/80 transition-transform sm:hover:bg-emerald-200 dark:bg-inherit dark:text-emerald-500 dark:ring-emerald-500 sm:sm:dark:hover:bg-zinc-800"
          download="Vinicius-Hilton-CV.pdf"
          href="/cv-vinicius-hilton-2026-en.pdf"
        >
          <span className="text-nowrap">Download my CV</span>
          <DownloadSimpleIcon
            className="size-5 max-sm:hidden"
            strokeWidth={1.4}
          />
        </a>
      </div>
    </div>
  );
}
