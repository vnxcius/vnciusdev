import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Locale, routing } from '@/i18n/routing';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import clsx from "clsx";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import Header from "./header";
import Github from '@/assets/icons/components/github';
import "@/app/globals.css";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon-32x32.png",
  },
  title: "Minecraft Tools",
  description: "Minecraft useful tools for a better gaming experience.",
};

const mojangles = localFont({
  src: "../../../fonts/Minecraft-Seven_v2.woff2",
  variable: "--font-mojangles",
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "variable",
});

export default async function MinecraftLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      className="scroll-smooth"
      lang={locale}
      suppressHydrationWarning
    >
      <body
        className={clsx(
          "text-neutral-700 dark:text-gray-200 transition-colors px-3",
          "duration-150 mx-auto max-sm:max-w-sm max-w-screen-md",
          mojangles.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <NextIntlClientProvider messages={messages}>
            <main
              className="mx-auto w-full py-16"
            >
              <Header />
              <section className="my-10">
                {children}
              </section>
              <ScrollToTop />
            </main>
            <footer className={clsx(
              "pb-5 w-fit mx-auto text-xs text-gray-400",
              inter.className
            )}>
              <p>
                &copy; 2024. Made with love by{' '}
                <Link
                  href="/"
                  target="_blank"
                  className="hover:underline"
                >
                  Vinicius Hilton.
                </Link>
              </p>
              <div
                className={clsx(
                  "w-fit mx-auto flex items-center gap-2 leading-3",
                  "divide-x divide-gray-500"
                )}
              >
                <Link
                  className="my-3 flex items-center gap-1 hover:underline"
                  href={"https://github.com/vnxcius/vnciusdev"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github Repo
                  <SquareArrowOutUpRightIcon className="size-3" />
                </Link>
                <Link
                  className="pl-2 hover:underline"
                  href={"/minecraft/changelog"}
                >
                  Changelog
                </Link>
              </div>
            </footer>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};