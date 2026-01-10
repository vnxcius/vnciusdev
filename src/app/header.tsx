"use client";

import { CaretLeftIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function isThemeSetToDark() {
  if (typeof window === "undefined") return;

  return (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

export default function Header() {
  const path = usePathname();
  const isHome = path === "/";
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
    <header className="mx-auto max-w-prose py-8 max-sm:pt-4">
      <nav className="flex items-center justify-between max-sm:flex-col max-sm:gap-6">
        <Link
          aria-label="Back to home"
          className={`group relative -m-12 -my-2 -mr-4 flex items-center rounded-sm py-2 pr-4 pl-12 ${isHome ? "ring-0" : "sm:hover:ring-1"} ring-emerald-500 transition-transform max-sm:text-center dark:ring-emerald-600`}
          href="/"
        >
          <div
            className={`${isHome ? "hidden" : "absolute"} left-1 flex size-4 h-full w-12 items-center px-2`}
          >
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
              Frontend Developer Jr.
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <button
            aria-label="Toggle theme"
            className="group relative flex items-center"
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
          <Link
            aria-current={path === "/projects" ? "page" : undefined}
            aria-label="View projects"
            className="group relative rounded-sm px-2 py-px ring-emerald-500 transition-transform sm:hover:ring-1 dark:ring-emerald-600"
            href="/projects"
          >
            /projects
            <div
              aria-hidden="true"
              className="absolute left-1/3 mx-auto mt-1 hidden size-2 h-0.5 w-1/3 rounded-full bg-emerald-500 text-zinc-800 group-aria-[current=page]:block dark:fill-emerald-600 dark:text-transparent"
            />
          </Link>
          <Link
            aria-current={path.startsWith("/articles") ? "page" : undefined}
            aria-label="View articles"
            className="group relative rounded-sm px-2 py-px ring-emerald-500 transition-transform sm:hover:ring-1 dark:ring-emerald-600"
            href="/articles"
          >
            /articles
            <div
              aria-hidden="true"
              className="absolute left-1/3 mx-auto mt-1 hidden size-2 h-0.5 w-1/3 rounded-full bg-emerald-500 text-zinc-800 group-aria-[current=page]:block dark:fill-emerald-600 dark:text-transparent"
            />
          </Link>
          <Link
            aria-current={path === "/about" ? "page" : undefined}
            aria-label="View about page"
            className="group relative rounded-sm px-2 py-px ring-emerald-500 transition-transform sm:hover:ring-1 dark:ring-emerald-600"
            href="/about"
          >
            /about
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
