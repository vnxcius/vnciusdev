"use client";

import { CaretLeftIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { Roboto_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { dictionaries } from "@/dictionaries";
import { i18n } from "@/i18n.config";
import { cn } from "@/lib/cn";

const robotoMono = Roboto_Mono({ weight: "variable", subsets: ["latin"] });

function isThemeSetToDark() {
  if (typeof window === "undefined") return;

  return (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

export default function Header({
  dict,
}: {
  dict: Awaited<ReturnType<(typeof dictionaries)["en"]>>;
}) {
  const path = usePathname();
  const isHome = i18n.locales.some((locale) => path === `/${locale}`);
  const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>(false);

  const toggleTheme = () => {
    const next = !isDarkMode;
    if (next) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }
    document.documentElement.classList.toggle("dark", next);
    setIsDarkMode(next);
  };

  useEffect(() => {
    const dark = isThemeSetToDark();
    document.documentElement.classList.toggle("dark", dark);
    setIsDarkMode(dark);
  }, []);
  return (
    <header className="mx-auto max-w-prose">
      <nav className="flex flex-col gap-4">
        <Link
          aria-label="Back to home"
          className={cn(
            "group relative flex items-center rounded-sm py-2 ring-emerald-500 transition-transform max-sm:text-center dark:ring-emerald-600",
            isHome ? "ring-0" : "sm:hover:ring-1",
          )}
          href="/"
        >
          <div className={cn(`mr-4 size-4 h-full`, isHome ? "hidden" : "")}>
            <CaretLeftIcon strokeWidth={1.4} />
          </div>
          <div className="flex flex-col max-sm:items-center">
            <div className="flex items-center gap-1.5">
              <Image
                alt="quack"
                className="size-5 rounded-full"
                height={40}
                src={"/quack.webp"}
                width={40}
              />
              <p>Vinícius Simon G. Hilton</p>
            </div>
            <span className="text-zinc-500 dark:text-zinc-400">
              {dict.header.role}
            </span>
          </div>
        </Link>

        <div className={cn("flex items-center gap-2", robotoMono.className)}>
          <button
            aria-label="Toggle theme"
            className="group relative flex cursor-pointer items-center rounded-lg p-1.5 hover:bg-foreground/15"
            onClick={() => toggleTheme()}
            type="button"
          >
            {isDarkMode ? (
              <MoonIcon
                className="size-5 fill-gray-300 transition-transform"
                strokeWidth={1.4}
              />
            ) : (
              <SunIcon
                className="size-5 fill-amber-500 transition-transform sm:hover:rotate-45"
                strokeWidth={1.4}
                weight="duotone"
              />
            )}
          </button>
          <div className="h-5 w-px bg-muted" />
          <Link
            aria-current={path.includes("/projects") ? "page" : undefined}
            aria-label="View projects"
            className="group relative rounded-sm px-2 py-px font-medium text-sm tracking-tighter ring-emerald-500 transition-transform sm:hover:ring-1 dark:ring-emerald-600"
            href="/projects"
          >
            /{dict.header.projects}
            <div
              aria-hidden="true"
              className="absolute left-1/3 mx-auto mt-1 hidden size-2 h-0.5 w-1/3 rounded-full bg-emerald-500 text-zinc-800 group-aria-[current=page]:block dark:fill-emerald-600 dark:text-transparent"
            />
          </Link>
          <Link
            aria-current={path.includes("/articles") ? "page" : undefined}
            aria-label="View articles"
            className="group relative rounded-sm px-2 py-px font-medium text-sm tracking-tighter ring-emerald-500 transition-transform sm:hover:ring-1 dark:ring-emerald-600"
            href="/articles"
          >
            /{dict.header.articles}
            <div
              aria-hidden="true"
              className="absolute left-1/3 mx-auto mt-1 hidden size-2 h-0.5 w-1/3 rounded-full bg-emerald-500 text-zinc-800 group-aria-[current=page]:block dark:fill-emerald-600 dark:text-transparent"
            />
          </Link>
          <Link
            aria-current={path.includes("/about") ? "page" : undefined}
            aria-label="View about page"
            className="group relative rounded-sm px-2 py-px font-medium text-sm tracking-tighter ring-emerald-500 transition-transform sm:hover:ring-1 dark:ring-emerald-600"
            href="/about"
          >
            /{dict.header.about}
            <div
              aria-hidden="true"
              className="absolute left-1/3 mx-auto mt-1 hidden size-2 h-0.5 w-1/3 rounded-full bg-emerald-500 text-zinc-800 group-aria-[current=page]:block dark:fill-emerald-600 dark:text-transparent"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
