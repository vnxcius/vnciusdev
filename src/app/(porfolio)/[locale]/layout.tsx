import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "./header";
import "@/app/globals.css";
import { ScrollToTop } from "@/components/scroll-to-top";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { Locale, routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Vinicius Hilton | Fullstack Developer Jr. Portfolio",
  description: "Portfólio Vinícius Hilton, desenvolvedor web fullstack jr.",
};

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "variable",
});

export default async function RootLayout({
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
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`
          ${sourceSans3.className} text-neutral-700 dark:text-neutral-200
          transition-colors
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <NextIntlClientProvider messages={messages}>
          <main>
            <Header />
            {children}
          </main>
          <ScrollToTop />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
};