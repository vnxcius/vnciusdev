import { SiGitlab } from "@icons-pack/react-simple-icons";
import {
  createFileRoute,
  notFound,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { useEffect } from "react";

import LocaleSwitcher from "@/components/locale-switcher";
import { Oneko, OnekoToggle } from "@/components/oneko";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants, ExternalLink } from "@/components/ui";
import { getDictionary, hasLocale } from "@/dictionaries";
import { SITE_URL } from "@/i18n.config";
import { greetConsole, useAwayTitle } from "@/lib/easter-eggs";
import { getPreferredLocale, rememberLocale } from "@/lib/locale";

export const Route = createFileRoute("/$locale")({
  // A path without a locale, like /about, gets the visitor's one prepended.
  beforeLoad: async ({ params, location }) => {
    if (hasLocale(params.locale)) return;
    throw redirect({
      href: `/${await getPreferredLocale()}${location.pathname}`,
    });
  },
  loader: async ({ params: { locale } }) => {
    if (!hasLocale(locale)) throw notFound();
    return { locale, dict: await getDictionary(locale) };
  },
  // Pages are the same for everyone, so the CDN serves them and refreshes
  // them in the background once they are an hour old.
  headers: () => ({
    "Cache-Control":
      "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
  }),
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { locale, dict } = loaderData;
    const image = `${SITE_URL}/og/${locale}.png`;
    return {
      meta: [
        { title: dict.meta.title },
        { name: "description", content: dict.meta.description },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "vncius.dev" },
        { property: "og:title", content: dict.meta.title },
        { property: "og:description", content: dict.meta.description },
        { property: "og:url", content: `${SITE_URL}/${locale}` },
        { property: "og:locale", content: locale === "pt" ? "pt_BR" : "en_US" },
        { property: "og:image", content: image },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "Vinícius Simon – vncius.dev" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: dict.meta.title },
        { name: "twitter:description", content: dict.meta.description },
        { name: "twitter:image", content: image },
      ],
    };
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const { locale, dict } = Route.useLoaderData();

  useEffect(() => rememberLocale(locale), [locale]);
  useEffect(greetConsole, []);
  useAwayTitle(dict.away);

  return (
    <>
      <main className="mx-auto flex min-h-svh w-full max-w-page stagger flex-col gap-section px-5 pt-8 sm:px-8 md:pt-14">
        <Outlet />

        <footer className="mt-auto pt-12">
          <div className="-mx-2 flex items-center justify-between">
            <LocaleSwitcher currentLocale={locale} />
            <div className="flex items-center gap-px">
              <ExternalLink
                className={buttonVariants.ghost}
                href="https://gitlab.com/vncius/vnciusdev"
              >
                <SiGitlab className="size-3.5" />
                {dict.footer.code}
              </ExternalLink>
              <OnekoToggle label={dict.footer.cat} />
              <ThemeToggle label={dict.footer.theme} />
            </div>
          </div>
          <p
            aria-hidden="true"
            className="overflow-hidden pt-6 text-center font-signature text-[min(21vw,8.75rem)] leading-[1.1] whitespace-nowrap opacity-(--signature-opacity) select-none"
          >
            vncius.dev
          </p>
        </footer>
      </main>
      <Oneko />
    </>
  );
}
