import { SquareArrowOutUpRight } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link";
import { Adamina } from "next/font/google";
import Image from "next/image";
import { icons } from "@/assets/icons";
import { SVGProps, JSX } from "react";

type Props = {
  image: string;
  title: string;
  link?: string;
  repo?: string;
  description: string;
  date: string;
  stack: string[];
};

const adamina = Adamina({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-adamina",
});
interface IconsList {
  [key: string]: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

const iconsList: IconsList = {
  react: icons.React,
  nextjs: icons.Nextjs,
  go: icons.Go,
  postgresql: icons.PostgreSQL,
  tailwindcss: icons.TailwindCSS,
  mysql: icons.MySQL,
  typescript: icons.TypeScript,
  firebase: icons.Firebase,
  figma: icons.Figma,
  laravel: icons.Laravel,
  php: icons.Php,
  java: icons.Java,
  javascript: icons.JavaScript,
  linkedin: icons.LinkedIn,
  github: icons.Github,
  cobol: icons.Cobol,
  discord: icons.Discord,
  prisma: icons.Prisma,
  html: icons.HTML5,
  bluesky: icons.Bluesky,
};

function Icon({ icon }: { icon: string }) {
  const SelectedIcon = iconsList[icon];
  if (!SelectedIcon) {
    return <span>Icon not found</span>
  };

  return <SelectedIcon className={`${icon === "prisma" && "dark:fill-white"} size-6`} />
};

export default function ProjectCard(props: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="
        bg-white border p-5 pb-8 rounded-3xl dark:bg-zinc-900
        dark:border-neutral-800
      "
    >
      <Link href={props.link!} target="_blank">
        <Image
          src={props.image}
          alt={props.title}
          className="
            rounded-xl sm:h-72 h-36 object-cover border
            dark:border-neutral-800
          "
          width={500}
          height={288}
        />
      </Link>
      <div
        className="
          flex items-center gap-5 my-2 bg-neutral-50 border w-fit
          mx-auto py-1.5 px-5 rounded-full dark:bg-neutral-900
          dark:border-neutral-800
        ">
        {props.stack.map((stack) => {
          // Dynamically render icon
          const icon = Icon({ icon: stack.toLowerCase() });
          return (
            <div key={stack}>
              {icon}
            </div>
          )
        })}
      </div>
      <hr className="mb-6 dark:border-neutral-800" />
      <Link href={props.link!} target="_blank"
        className="flex items-center gap-2 w-fit underline-offset-2 hover:underline">
        <h3 className={`${adamina.className} text-lg`}>{props.title}</h3>
        <SquareArrowOutUpRight className="size-4" />
      </Link>
      <p className="text-neutral-500">{props.description}</p>
      <p className="text-neutral-400 text-xs my-1">Feito em {props.date}</p>
      {props.repo && (
        <Link href={props.repo} target="_blank" className="w-fit block mt-2">
          <icons.Github
            className="fill-neutral-400 hover:fill-neutral-500 size-6"
          />
        </Link>
      )}
    </motion.div>
  )
};