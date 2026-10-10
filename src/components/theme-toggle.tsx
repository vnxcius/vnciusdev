"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useSyncExternalStore } from "react";

import { buttonVariants } from "./ui";

// The `dark` class on <html> is the source of truth: the inline script in
// the layout sets it before hydration and the toggle below updates it.
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getIsDarkMode() {
  return document.documentElement.classList.contains("dark");
}

function getServerIsDarkMode() {
  return false;
}

export function ThemeToggle({ label }: { label: string }) {
  const isDarkMode = useSyncExternalStore(
    subscribeToTheme,
    getIsDarkMode,
    getServerIsDarkMode,
  );

  const toggleTheme = () => {
    const next = !isDarkMode;
    localStorage.theme = next ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <button
      aria-label={label}
      className={buttonVariants.icon}
      onClick={toggleTheme}
      type="button"
    >
      {isDarkMode ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
