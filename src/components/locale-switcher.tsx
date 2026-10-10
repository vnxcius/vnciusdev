"use client";

import type { Locale } from "@/dictionaries";
import { useLocaleChange } from "@/hooks/use-locale-change";
import { i18n, LocaleLabel } from "@/i18n.config";
import { cn } from "@/lib/cn";

import { buttonVariants } from "./ui";

export default function LocaleSwitcher({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  const { changeLocale } = useLocaleChange(currentLocale);

  return (
    <div className="flex items-center gap-px">
      {i18n.locales.map((locale) => (
        <button
          aria-current={locale === currentLocale ? "true" : undefined}
          aria-label={LocaleLabel[locale]}
          className={cn(
            buttonVariants.ghost,
            "uppercase aria-[current=true]:text-foreground",
          )}
          key={locale}
          onClick={() => changeLocale(locale)}
          type="button"
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
