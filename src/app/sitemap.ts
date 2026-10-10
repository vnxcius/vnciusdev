import type { MetadataRoute } from "next";

import { i18n, SITE_URL } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about"].flatMap((path) =>
    i18n.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((language) => [
            language,
            `${SITE_URL}/${language}${path}`,
          ]),
        ),
      },
    })),
  );
}
