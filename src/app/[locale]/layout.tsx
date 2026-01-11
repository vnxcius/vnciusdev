import { SealCheckIcon } from "@phosphor-icons/react/dist/ssr";
import { Karla } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/dictionaries";
import LocaleSwitcher from "../../components/locale-switcher";
import { ScrollToTop } from "../../components/scroll-to-top";
import Header from "./header";

const karla = Karla({
  subsets: ["latin"],
  weight: "400",
});

export default async function AppLayout({
  children,
  params,
}: LayoutProps<"/[locale]"> & {
  children: React.ReactNode;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: No problem
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                  if (theme === 'dark' || (!theme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${karla.className} min-h-full px-6`}>
        <Header dict={dict} />
        <main className="mx-auto max-w-prose pb-4">
          {children}
          <ScrollToTop text={dict.backToTop} />
        </main>
        <footer className="mx-auto mb-32 flex max-w-prose flex-col items-center gap-6 py-6 text-sm text-zinc-700 max-sm:items-start dark:text-zinc-400">
          <div className="flex items-center gap-4 *:decoration-zinc-500 *:underline-offset-4 *:transition-transform *:sm:hover:underline *:dark:decoration-zinc-400">
            <LocaleSwitcher currentLocale={locale} />
            <a
              href="https://github.com/vnxcius/vnciusdev"
              rel="noopener noreferrer"
              target="_blank"
            >
              {dict.footer.code}
            </a>
            <Link href="/rss.xml" target="_blank">
              RSS Feed
            </Link>
          </div>

          <div className="-mt-4 text-zinc-500">
            <p className="flex items-center gap-1">
              <SealCheckIcon className="-ml-0.5 text-emerald-600" /> vncius.dev
              / {year}
            </p>
          </div>
        </footer>
      </body>
    </>
  );
}
