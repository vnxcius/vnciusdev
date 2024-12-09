import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Link from "next/link";
import Header from "./header";
import { ThemeProvider } from "next-themes";
import "@/app/globals.css";
import { ScrollToTop } from "@/components/scroll-to-top";
import clsx from "clsx";

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
  return (
    <html
      className="scroll-smooth"
      lang={locale}
      suppressHydrationWarning
    >
      <body
        className={clsx(
          "text-neutral-700 dark:text-neutral-200 transition-colors px-3",
          "duration-150 mx-auto max-sm:max-w-sm max-w-screen-md",
          mojangles.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <main
            className="mx-auto w-full py-16"
          >
            <Header />
            <section className="my-10">
              {children}
            </section>
            <ScrollToTop />
          </main>
          <footer className="pb-5 text-center text-xs text-neutral-400">
            <p className={`${inter.className}`}>
              &copy; 2024. Made with love by{' '}
              <Link
                href="/"
                target="_blank"
                className="hover:underline"
              >
                Vinicius Hilton.
              </Link>
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
};