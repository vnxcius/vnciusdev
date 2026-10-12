import type { Locale } from "@/dictionaries";
import { i18n, SITE_URL } from "@/i18n.config";

// Canonical and hreflang links for a page that exists in every locale.
export function localeLinks(locale: Locale, path = "") {
  return [
    { rel: "canonical", href: `${SITE_URL}/${locale}${path}` },
    ...i18n.locales.map((language) => ({
      rel: "alternate",
      hrefLang: language,
      href: `${SITE_URL}/${language}${path}`,
    })),
  ];
}
