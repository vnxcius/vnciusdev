"use client"

import { icons } from "@/assets/icons";
import Link from "next/link";
import { CopyIcon, DownloadIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import AnimatedIcon from "@/components/ui/animated-icon";
import ProjectCard from "@/components/ui/project-card";
import { Adamina } from "next/font/google";
import Image from "next/image";
import Separator from "@/components/ui/separator";
import { useLocale, useTranslations } from "next-intl";
import data from "@/assets/data/projects.json";

const adamina = Adamina({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-adamina",
})

export default function Home() {
  const t = useTranslations("portfolio");
  const locale = useLocale();
  const projects = data.projects;
  const [clicks, setClicks] = useState(0);
  const easterEgg = () => setClicks(clicks + 1);

  if (clicks >= 19) {
    setClicks(0)
    alert("🐝")
  };

  return (
    <section
      className="
        grid sm:grid-cols-2 gap-10 relative my-14 mx-auto max-w-xs sm:max-w-5xl
      "
    >
      <div
        className="
          sm:sticky top-10 flex flex-col place-self-start items-start gap-10
        "
      >
        <button onClick={easterEgg} className="relative">
          <Image
            src="/img/handsome.webp"
            alt="Vinícius Hilton"
            className="rounded-[36px]"
            width={190}
            height={0}
            style={{ height: 'auto' }}
          />
          <span className="absolute -bottom-2 -left-3 text-4xl">👋</span>
        </button>
        <div className="space-y-2">
          <div className={`${adamina.className} text-3xl`}>
            <span>{t('hi')} Vinícius Hilton</span>
          </div>
          <p className="text-2xl text-neutral-600 dark:text-neutral-400">
            {t('role')}
          </p>
          <a
            href="mailto:contato@vncius.dev"
            className="text-neutral-500 hover:underline"
          >
            contato@vncius.dev
          </a>

          <Separator className="mt-10" />

          <h3
            className={`
            text-neutral-500 text-lg dark:text-neutral-300
            ${adamina.className}
          `}
          >
            {t('socials')}
          </h3>

          <div className="flex space-x-5">
            <Link
              href="/linkedin" title="LinkedIn" target="_blank"
              className="w-fit block"
            >
              <icons.LinkedIn
                className="
                  size-6 fill-neutral-500 hover:brightness-75
                  duration-300 dark:fill-gray-400
                "
              />
            </Link>
            <Link
              href="/github" title="Github" target="_blank"
              className="w-fit block">
              <icons.Github
                className="
                  size-6 fill-neutral-500 hover:brightness-75 duration-300
                  dark:fill-gray-400
                "
              />
            </Link>
            <div className="flex flex-col items-start">
              <icons.Discord
                className="
                  size-6 fill-neutral-500 dark:fill-gray-400
                "
              />
              <div className="inline-flex items-center gap-1 -translate-x-5">
                <p className=" dark:text-gray-400 text-xs">@vncius.dev</p>
                <button
                  onClick={() => navigator.clipboard.writeText('vncius.dev')}
                  className="
                    p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800
                    rounded
                  "
                >
                  <CopyIcon className="size-3 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .5, delay: .5 }}
          >
            <h3
              className={`
                text-neutral-500 text-lg pt-4 dark:text-neutral-300
                ${adamina.className}
              `}
            >
              {t('shortcuts')}
            </h3>

            <ul className="list-disc list-inside text-neutral-500 dark:text-neutral-400">
              <motion.li
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: .5,
                  delay: .8,
                  ease: 'circOut',
                  type: 'spring',
                  stiffness: 100,
                  bounce: true
                }}
              >
                <Link
                  href="#stack"
                  className="underline-offset-2 hover:underline"
                >
                  Stack
                </Link>
              </motion.li>
              <motion.li
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: .5,
                  delay: .9,
                  ease: 'circOut',
                  type: 'spring',
                  stiffness: 100,
                  bounce: true
                }}
              >
                <Link
                  href="#projects"
                  className="underline-offset-2 hover:underline"
                >
                  {t('myProjects')}
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <div className="w-full">
          <motion.hr
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1 }}
            className="border-neutral-200 dark:border-baltic-sea duration-150"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .5, delay: .6 }}
          >
            <h3
              className={`
                text-neutral-500 text-lg dark:text-neutral-300 pt-4
                ${adamina.className}
              `}
            >
              {t('curriculumVitae')}
            </h3>

            <Link
              href={locale === 'pt' ?
                'vinicius-hilton-cv-pt.pdf'
                :
                'vinicius-hilton-cv.pdf'
              }
              className="
                my-2.5 py-2.5 px-5 flex w-fit items-center bg-neutral-800
                text-neutral-50 dark:bg-neutral-200 dark:text-neutral-800
                hover:bg-neutral-700 dark:hover:bg-neutral-300
              "
              target="_blank"
              rel="noopener noreferrer"
              download={locale === 'pt' ?
                'vinicius-hilton-cv-pt.pdf'
                :
                'vinicius-hilton-cv.pdf'
              }
            >
              {t('downloadCV')}
              <DownloadIcon className="size-4 ml-2" />
            </Link>
            <p className="text-xs font-medium text-neutral-400">133KB</p>
          </motion.div>
        </div>
      </div>
      <div className="space-y-3">
        <p className={`${adamina.className} text-2xl pb-5`}>
          {t('description')}
        </p>

        <div className="space-x-4 pb-16">
          <Link
            href="mailto:contato@vncius.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-neutral-800 hover:bg-neutral-700 dark:hover:bg-neutral-300
              dark:text-neutral-800 dark:bg-neutral-200 text-neutral-50
              px-5 py-2 text-center inline-flex items-center gap-2 rounded-full
              duration-300 hover:brightness-95 hover:cursor-pointer
            "
          >
            {t('contact')}
          </Link>
          <Link
            href="#projects"
            className="
              bg-transparent hover:bg-neutral-100 dark:hover:bg-cinder/90
              dark:text-gray-300 text-neutral-800 border border-neutral-200
              px-5 py-2 text-center inline-flex items-center gap-2 rounded-full
              duration-300 hover:brightness-95 hover:cursor-pointer
              dark:border-gray-800
            "
          >
            {t('myWork')}
          </Link>
        </div>

        <Separator />

        <section>
          <h2 id="stack" className={`${adamina.className} text-2xl`}>
            Stack
          </h2>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, type: "tween", stiffness: 100 }}
            className="
            text-neutral-700 uppercase font-light text-sm tracking-wider
            dark:text-neutral-400
          "
          >
            {t('stackPrimary')}
          </motion.p>
          <div
            className="
            flex flex-wrap justify-items-center mx-auto w-fit gap-5 my-7
          "
          >
            <AnimatedIcon delay={.10}>
              <icons.Go className="w-14 h-8" />
            </AnimatedIcon>
            <AnimatedIcon delay={.15}>
              <icons.React className="size-8" />
            </AnimatedIcon>
            <AnimatedIcon delay={.20}>
              <icons.Nextjs className="size-8" />
            </AnimatedIcon>
            <AnimatedIcon delay={.25}>
              <icons.Docker className="size-8" />
            </AnimatedIcon>
            <AnimatedIcon delay={.30}>
              <icons.PostgreSQL className="size-8" />
            </AnimatedIcon>
            <AnimatedIcon delay={.35}>
              <icons.TailwindCSS className="size-8" />
            </AnimatedIcon>
          </div>

          <motion.hr
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1 }}
            className="
            border-neutral-200 mb-5 mt-10 max-w-xs duration-150
            mx-auto dark:border-neutral-800
          "
          />

          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.40 }}
            className="
            text-neutral-700 uppercase font-light text-sm tracking-wider
            dark:text-neutral-400
          "
          >
            {t('stackSecondary')}
          </motion.p>

          <div
            className="flex flex-wrap justify-center mx-auto w-fit gap-5 my-7"
          >
            <AnimatedIcon delay={.45}>
              <icons.MySQL className="size-8" />
            </AnimatedIcon>
            <AnimatedIcon delay={.50}>
              <icons.TypeScript className="size-8" />
            </AnimatedIcon>
            <AnimatedIcon delay={.55}>
              <icons.Firebase className="size-8" />
            </AnimatedIcon>
            <AnimatedIcon delay={.60}>
              <icons.Figma className="size-8" />
            </AnimatedIcon>
            <AnimatedIcon delay={.65}>
              <icons.Laravel className="size-8" />
            </AnimatedIcon>
            <AnimatedIcon delay={.70}>
              <icons.Php className="size-8" />
            </AnimatedIcon>
            <AnimatedIcon delay={.80}>
              <icons.JavaScript className="size-8" />
            </AnimatedIcon>
          </div>

          <Separator className="mb-5 mt-10" />

        </section>
        <section>
          <h2 id="projects" className={`${adamina.className} text-2xl mb-7`}>
            {t('myProjects')}
          </h2>
          <div className="space-y-5">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={t(`project${project.id}`)}
                link={project.link}
                image={project.image}
                description={t(`project${project.id}Description`)}
                date={project.date}
                stack={project.stack}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}