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
  PaperPlaneTiltIcon,
} from "@phosphor-icons/react/ssr";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getDictionary, hasLocale } from "../../dictionaries";
import ExperienceTimeline from "./_components/timeline";

interface Link {
  name: string;
  url: string;
  icon?: ReactNode;
}

const ExternalLink = (link: Link) => {
  return (
    <a
      className="flex items-center justify-between gap-3 rounded-full py-1 pr-3 pl-4 ring ring-zinc-700 hover:bg-muted dark:hover:bg-zinc-900"
      href={link.url}
      key={link.url}
      target="_blank"
    >
      <span className="flex items-center gap-3">
        {link.icon} {link.name}
      </span>
      <ArrowUpRightIcon
        className="shrink-0 text-zinc-800 dark:text-zinc-200"
        strokeWidth={1.4}
        size={16}
      />
    </a>
  );
};

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  const externalLinks: Link[] = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/vinicius-hilton",
      icon: (
        <SiLinkedin size={16} className="fill-[#0077B5] dark:fill-zinc-200" />
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/vnxcius",
      icon: <SiGithub size={16} />,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/vncius.ts",
      icon: (
        <SiInstagram size={16} className="fill-[#FF0069] dark:fill-zinc-200" />
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-6 overflow-y-auto p-1">
      <div className="my-3 flex flex-col">
        <h2 className="font-semibold">{dict.landing.knowMe}</h2>
        <div className="mb-5 flex select-all items-center gap-1 transition-transform dark:text-zinc-500">
          {dict.landing.email}
          <a
            className="rounded p-1 dark:hover:bg-zinc-600/30"
            href="mailto:contact@vncius.dev"
          >
            <PaperPlaneTiltIcon className="size-4" strokeWidth={1.4} />
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {externalLinks.map((link: Link) => (
            <ExternalLink key={link.url} {...link} />
          ))}
        </div>
      </div>

      <hr className="dark:border-[#1b202a]" />

      <div>
        <h2 className="mb-1.5 font-semibold">{dict.landing.who}</h2>
        <div className="flex flex-col *:flex *:items-center *:gap-1">
          <p>{dict.landing.whoContent}</p>
          <div className="my-3.5 flex flex-wrap space-x-1 *:flex *:items-center *:gap-1 *:font-medium">
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
          <p>{dict.landing.whoOthers}</p>
        </div>
      </div>

      <div>
        <h2 className="font-semibold">{dict.landing.experience}</h2>
        <p className="mb-4 text-muted-foreground text-sm">
          {dict.landing.journey}
        </p>
        <ExperienceTimeline locale={locale} />
      </div>
    </div>
  );
}
