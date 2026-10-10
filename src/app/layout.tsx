import "./globals.css";
import { Geist, Nothing_You_Could_Do } from "next/font/google";
import { headers } from "next/headers";

import { i18n } from "@/i18n.config";
import { cn } from "@/lib/cn";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const signature = Nothing_You_Could_Do({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
});

// Sets the theme class before first paint. It lives in the root layout, which
// is never re-rendered on navigation, so React only sees it on the server.
const themeScript = `
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
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The proxy forwards the locale of the URL; the locale switcher keeps the
  // attribute in sync after client-side navigation.
  const locale = (await headers()).get("x-locale") ?? i18n.defaultLocale;

  return (
    <html
      className={cn(geist.variable, signature.variable, "antialiased")}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {children}
    </html>
  );
}
