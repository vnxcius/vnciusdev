import "@/globals.css";
import geistFont from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url";
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useParams,
} from "@tanstack/react-router";

import { inlineLinkClass } from "@/components/ui";
import { hasLocale } from "@/dictionaries";
import { i18n } from "@/i18n.config";

// Sets the theme class before first paint, so React only ever hydrates over it.
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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: geistFont,
        crossOrigin: "anonymous",
      },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  // The locale layout keeps the attribute in sync after client-side navigation.
  const { locale } = useParams({ strict: false });

  return (
    <html
      className="antialiased"
      lang={locale && hasLocale(locale) ? locale : i18n.defaultLocale}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-page flex-col justify-center gap-2.5 px-5 sm:px-8">
      <h1 className="font-medium">This page doesn&apos;t exist.</h1>
      <Link
        className={`${inlineLinkClass} w-fit text-foreground-secondary`}
        to="/"
      >
        Just take me back already...
      </Link>
    </main>
  );
}
