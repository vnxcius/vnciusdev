import { SiGithub } from "@icons-pack/react-simple-icons";
import {
  DownloadSimpleIcon,
  SealCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Karla } from "next/font/google";
import Image from "next/image";
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
      <body className={`${karla.className} h-svh px-6`}>
        <div className="mx-auto max-w-4xl flex-col gap-10 sm:flex sm:flex-row">
          <aside className="top-10 mx-auto my-5 flex h-full w-full max-w-xs flex-col space-y-4 sm:sticky">
            <Header dict={dict} />
            <Image
              className="h-[60svh] w-full object-cover"
              src="/adam.jpg"
              alt=""
              loading="eager"
              width={400}
              height={800}
            />
            <footer className="mx-auto flex max-w-prose flex-col items-center gap-6 text-sm text-zinc-700 max-sm:items-start dark:text-zinc-400">
              <div className="flex flex-wrap items-center justify-center gap-4 *:decoration-zinc-500 *:underline-offset-4 *:transition-transform *:sm:hover:underline *:dark:decoration-zinc-400">
                <LocaleSwitcher currentLocale={locale} />
                <Link
                  className="flex items-center gap-1"
                  href="https://github.com/vnxcius/vnciusdev"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <SiGithub className="size-3.5" />
                  {dict.footer.code}
                </Link>
                <Link
                  className="flex items-center gap-1"
                  download="Vinicius-Hilton-CV.pdf"
                  href="/cv-vinicius-hilton-2026-en.pdf"
                >
                  <DownloadSimpleIcon className="size-3.5" />
                  <span className="text-nowrap">{dict.landing.download}</span>
                </Link>
              </div>

              <div className="text-zinc-500">
                <p className="flex items-center gap-1">
                  <SealCheckIcon className="-ml-0.5 text-emerald-600" />{" "}
                  vncius.dev / {year}
                </p>
              </div>
            </footer>
          </aside>
          <main className="m-auto flex h-svh max-w-prose flex-1 flex-col py-16">
            {children}
            <ScrollToTop text={dict.backToTop} />
          </main>
        </div>
      </body>
    </>
  );
}
