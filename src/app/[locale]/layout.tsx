import { SiGitlab } from "@icons-pack/react-simple-icons";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LocaleSwitcher from "@/components/locale-switcher";
import { Oneko } from "@/components/oneko";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants, ExternalLink } from "@/components/ui";
import { getDictionary, hasLocale } from "@/dictionaries";
import { i18n, SITE_URL } from "@/i18n.config";

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};

  const { meta } = await getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        i18n.locales.map((language) => [language, `/${language}`]),
      ),
    },
    openGraph: {
      type: "website",
      siteName: "vncius.dev",
      title: meta.title,
      description: meta.description,
      url: `/${locale}`,
      locale: locale === "pt" ? "pt_BR" : "en_US",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function AppLayout({
  children,
  params,
}: LayoutProps<"/[locale]"> & {
  children: React.ReactNode;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <body>
      <main className="mx-auto flex min-h-svh w-full max-w-page stagger flex-col gap-section px-5 pt-8 sm:px-8 md:pt-14">
        {children}

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
    </body>
  );
}
