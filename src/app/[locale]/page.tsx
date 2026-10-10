import {
  SiAnthropic,
  SiBun,
  SiDocker,
  SiGithub,
  SiGitlab,
  SiGo,
  SiInstagram,
  SiLinkedin,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiReactquery,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiZedindustries,
} from "@icons-pack/react-simple-icons";
import {
  CodeIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Activity } from "@/components/activity";
import { Experience, type ExperienceItem } from "@/components/experience";
import { Now } from "@/components/now";
import { Projects } from "@/components/projects";
import { buttonVariants, ExternalLink, inlineLinkClass } from "@/components/ui";
import { getDictionary, hasLocale } from "@/dictionaries";

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const { landing, projects: projectsDict } = dict;
  const cvUrl = `/cv-vinicius-hilton-2026-${locale}.pdf`;
  const emailUrl = `mailto:${landing.email}`;

  const socialLinks = [
    { name: "GitLab", url: "https://gitlab.com/vncius", icon: SiGitlab },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/vinicius-hilton",
      icon: SiLinkedin,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/vncius.ts",
      icon: SiInstagram,
    },
    { name: "Email", url: emailUrl, icon: EnvelopeSimpleIcon },
    { name: "CV", url: cvUrl, icon: FileTextIcon },
  ];

  const experiences: ExperienceItem[] = [
    { ...landing.experiences[0], kind: "work" },
    { ...landing.experiences[1], kind: "education" },
  ];

  const skills = [
    {
      category: landing.skills.language,
      items: [
        {
          name: "TypeScript",
          url: "https://www.typescriptlang.org",
          icon: SiTypescript,
        },
        { name: "Go", url: "https://go.dev", icon: SiGo },
        { name: "Python", url: "https://www.python.org", icon: SiPython },
      ],
    },
    {
      category: landing.skills.frontend,
      items: [
        { name: "React", url: "https://react.dev", icon: SiReact },
        { name: "Next.js", url: "https://nextjs.org", icon: SiNextdotjs },
        {
          name: "Tailwind CSS",
          url: "https://tailwindcss.com",
          icon: SiTailwindcss,
        },
        { name: "shadcn/ui", url: "https://ui.shadcn.com", icon: SiShadcnui },
        { name: "TanStack", url: "https://tanstack.com", icon: SiReactquery },
        { name: "Vite", url: "https://vite.dev", icon: SiVite },
      ],
    },
    {
      category: landing.skills.backend,
      items: [
        { name: "Bun", url: "https://bun.sh", icon: SiBun },
        {
          name: "PostgreSQL",
          url: "https://www.postgresql.org",
          icon: SiPostgresql,
        },
        { name: "Docker", url: "https://www.docker.com", icon: SiDocker },
      ],
    },
    {
      category: landing.skills.workflow,
      items: [
        { name: "GitLab", url: "https://gitlab.com", icon: SiGitlab },
        { name: "GitHub", url: "https://github.com", icon: SiGithub },
        { name: "Zed", url: "https://zed.dev", icon: SiZedindustries },
        {
          name: "VS Code",
          url: "https://code.visualstudio.com",
          icon: CodeIcon,
        },
      ],
    },
    {
      category: landing.skills.ai,
      items: [{ name: "Claude", url: "https://claude.ai", icon: SiAnthropic }],
    },
  ];

  return (
    <>
      <section aria-label="Hero" className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 font-medium">
              Vinícius Simon
              <Image
                alt=""
                className="size-5 rounded-full"
                height={40}
                src="/quack.webp"
                width={40}
              />
            </h1>
            <p className="mt-1 text-muted-foreground">{dict.role}</p>
          </div>
          <nav aria-label="Social links">
            <ul className="flex flex-wrap gap-px">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <ExternalLink
                    aria-label={link.name}
                    className={buttonVariants.icon}
                    href={link.url}
                  >
                    <link.icon />
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-6 space-y-2.5 text-foreground-secondary">
          <p>{landing.bio.intro}</p>
          <p>
            {landing.bio.freeTime}{" "}
            <ExternalLink
              className={inlineLinkClass}
              href="https://minecraft-tools.cc"
            >
              Minecraft Tools
            </ExternalLink>{" "}
            {landing.bio.and}{" "}
            <ExternalLink
              className={inlineLinkClass}
              href="https://dl.vncius.dev"
            >
              vndl
            </ExternalLink>
            . {landing.bio.more}{" "}
            <Link className={inlineLinkClass} href={`/${locale}/about`}>
              {landing.bio.aboutLink}
            </Link>
            .
          </p>
        </div>

        <Now label={landing.now} locale={locale} />

        <div className="mt-5.5 flex flex-wrap gap-2">
          <a
            className={buttonVariants.primary}
            download={`Vinicius-Hilton-CV-${locale}.pdf`}
            href={cvUrl}
          >
            {landing.download}
          </a>
          <a className={buttonVariants.outline} href={emailUrl}>
            {landing.sendEmail}
          </a>
        </div>
      </section>

      <Activity
        heading={landing.activity}
        label={landing.contributions}
        locale={locale}
      />

      <Experience
        heading={landing.experience}
        items={experiences}
        labels={{ seeMore: landing.seeMore, seeLess: landing.seeLess }}
      />

      <section aria-labelledby="skills-heading" className="flex flex-col gap-5">
        <h2 id="skills-heading">{landing.skills.title}</h2>
        <div className="space-y-4">
          {skills.map((group) => (
            <div
              className="grid grid-cols-[clamp(6.4rem,20vw,8rem)_minmax(0,1fr)] gap-2"
              key={group.category}
            >
              <h3 className="text-[13px] text-foreground-tertiary">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-x-3 gap-y-1.5 sm:gap-x-4 sm:gap-y-2">
                {group.items.map((skill) => (
                  <li key={skill.name}>
                    <ExternalLink
                      className="flex items-center gap-1.5 text-[13px] text-foreground-secondary hover:text-foreground"
                      href={skill.url}
                    >
                      <skill.icon
                        aria-hidden="true"
                        className="size-[13px] shrink-0 opacity-70 sm:size-3.5"
                        color="currentColor"
                      />
                      {skill.name}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Projects
        heading={projectsDict.title}
        labels={{ visit: projectsDict.visit, viewCode: projectsDict.viewCode }}
        projects={projectsDict.projects}
      />
    </>
  );
}
