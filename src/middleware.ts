import { NextRequest, NextResponse } from "next/server";

const locales = ['en', 'br']

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const preferredLocales = acceptLanguage
    .split(',')
    .map((lang) => lang.split(';')[0]);

  // Find the first supported locale
  return locales.find((locale) => preferredLocales.includes(locale)) ?? 'en'; // Default to 'en'
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Get preferred locale
  const locale = getLocale(request);

  // Clone the URL and set the new pathname
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(newUrl);
};

export const config = {
  matcher: [
    // Skip all internal paths
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|img|sounds|pdf).*)',
  ],
};