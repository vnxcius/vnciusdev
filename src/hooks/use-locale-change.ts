"use client";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/dictionaries";
import { setLocaleCookie } from "../app/actions/set-locale";

export function useLocaleChange(currentLocale: Locale) {
  const router = useRouter();
  const pathname = usePathname();

  const redirectPath = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const changeLocale = async (locale: Locale) => {
    if (locale === currentLocale) return;
    await setLocaleCookie(locale);
    router.push(redirectPath(locale), { scroll: false });
  };

  return { changeLocale };
}
