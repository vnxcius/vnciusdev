import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { type NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/i18n.config";

const locales = ["en", "pt"];
const defaultLocale = "en";

function getLocale(request: NextRequest) {
  const negotiatorHeaders = Object.fromEntries(request.headers);
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, defaultLocale);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const currentPathLocale = pathname.split("/")[1] as Locale | undefined;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );

  if (hasLocale && currentPathLocale) {
    const res = NextResponse.next();
    res.cookies.set("locale", currentPathLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
    return res;
  }

  const cookieLocale = request.cookies.get("locale")?.value;
  const locale = locales.includes(cookieLocale as Locale)
    ? cookieLocale
    : getLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
