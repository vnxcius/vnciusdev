import type { Metadata } from "next";
import { Karla } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SealCheckIcon } from "@phosphor-icons/react/dist/ssr";
import LocaleSwitcher from "../components/locale-switcher";
import { ScrollToTop } from "../components/scroll-to-top";
import Header from "./[lang]/header";

export const metadata: Metadata = {
  title: "Vinícius Hilton",
  description: "Vinícius Simon G. Hilton's personal website",
};

const karla = Karla({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <html className="min-h-screen" lang="en" suppressHydrationWarning>
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
        <Header />
        <main className="mx-auto max-w-prose pb-4">
          {children}
          <ScrollToTop />
        </main>
        <footer className="mx-auto flex max-w-prose flex-col items-center gap-6 py-6 text-sm text-zinc-700 max-sm:items-start dark:text-zinc-400">
          <div className="flex items-center gap-4 *:decoration-zinc-500 *:underline-offset-4 *:transition-transform *:sm:hover:underline *:dark:decoration-zinc-400">
            <a
              href="https://github.com/vnxcius/blog"
              rel="noopener noreferrer"
              target="_blank"
            >
              Code
            </a>
            <Link href="/rss.xml" target="_blank">
              RSS Feed
            </Link>
            <LocaleSwitcher />
          </div>

          <div className="-mt-4 text-zinc-500">
            <p className="flex items-center gap-1">
              <SealCheckIcon className="-ml-0.5 text-emerald-600" /> vncius.dev
              / {year}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
