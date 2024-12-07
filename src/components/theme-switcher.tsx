"use client"

import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        onClick={() => setTheme('light')}
        className="
          block p-2 rounded-md hover:bg-neutral-800/10 duration-300
          dark:hover:bg-neutral-200/10
        "
      >
        <SunMoonIcon className="text-neutral-700 dark:text-neutral-200" />
      </button>
    )
  };

  if (resolvedTheme === 'dark') {
    return (
      <button
        onClick={() => setTheme('light')}
        className="
          block p-2 rounded-md hover:bg-neutral-800/10 duration-300
          dark:hover:bg-neutral-200/10
        "
      >
        <SunIcon className="text-neutral-200" />
      </button>
    )
  };

  if (resolvedTheme === 'light') {
    return (
      <button
        onClick={() => setTheme('dark')}
        className="
          block p-2 rounded-md hover:bg-neutral-800/10 duration-300
          dark:hover:bg-neutral-200/10
        "
      >
        <MoonIcon className="text-neutral-700" />
      </button>
    )
  };

  if (resolvedTheme === 'system') {
    return (
      <button
        onClick={() => setTheme('dark')}
        className="
          block p-2 rounded-md hover:bg-neutral-800/10 duration-300
          dark:hover:bg-neutral-200/10
        "
      >
        <SunMoonIcon className="text-neutral-700" />
      </button>
    )
  };
};