export const SITE_URL = "https://vncius.dev";

export const i18n = {
  defaultLocale: "en",
  locales: ["en", "pt"],
} as const;

export const LocaleLabel: Record<Locale, string> = {
  en: "English",
  pt: "Português",
} as const;

export type Locale = (typeof i18n)["locales"][number];
