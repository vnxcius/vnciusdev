"use client";

import { GlobeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/dictionaries";
import { i18n, LocaleLabel } from "@/i18n.config";
import { useLocaleChange } from "@/src/hooks/use-locale-change";
import { cn } from "@/src/lib/cn";

export default function LocaleSwitcher({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { changeLocale } = useLocaleChange(currentLocale);

  const openDropdownMenu = () => {
    setOpen((v) => {
      const next = !v;
      if (next && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const viewport = window.innerHeight;
        const dropdownHeight = 160;

        const fitsDown = rect.bottom + dropdownHeight <= viewport;
        setDropUp(!fitsDown);
      }
      return next;
    });
  };

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };

    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("click", clickHandler);
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("click", clickHandler);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={openDropdownMenu}
        className="relative flex cursor-pointer items-center gap-1"
      >
        <GlobeSimpleIcon
          size={24}
          className="rounded-md bg-zinc-200/70 p-1 text-emerald-700 dark:bg-zinc-800/70"
        />
        <p>{LocaleLabel[currentLocale]}</p>
      </button>

      {open && (
        <ul
          className={cn(
            "absolute left-0 z-10 mt-2 space-y-1 rounded-lg border bg-zinc-50 p-2 shadow-md dark:border-zinc-800 dark:bg-zinc-900",
            dropUp ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          {i18n.locales.map((locale) => (
            <li className="w-26" key={locale}>
              <button
                type="button"
                className={cn(
                  "block w-full rounded px-2 py-1 text-left hover:bg-zinc-200/80 hover:dark:bg-zinc-700/70",
                  locale === currentLocale &&
                    "bg-zinc-200/50 font-semibold dark:bg-zinc-800",
                )}
                onClick={() => {
                  if (locale === currentLocale) return;
                  setOpen(false);
                  changeLocale(locale);
                }}
              >
                {LocaleLabel[locale]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
