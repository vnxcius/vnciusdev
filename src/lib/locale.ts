import { match } from "@formatjs/intl-localematcher";
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import Negotiator from "negotiator";

import { hasLocale, type Locale } from "@/dictionaries";
import { i18n } from "@/i18n.config";

// The locale for a URL that has none: the one picked before, or the best match
// for the browser's languages.
export const getPreferredLocale = createServerFn().handler((): Locale => {
  const cookieLocale = getCookie("locale");
  if (cookieLocale && hasLocale(cookieLocale)) return cookieLocale;

  const languages = new Negotiator({
    headers: { "accept-language": getRequestHeader("accept-language") },
  }).languages();
  // `match` throws on values like "*", sent when there is no Accept-Language.
  try {
    return match(languages, i18n.locales, i18n.defaultLocale) as Locale;
  } catch {
    return i18n.defaultLocale;
  }
});

export function rememberLocale(locale: Locale) {
  document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  document.documentElement.lang = locale;
}
