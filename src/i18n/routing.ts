import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// Solves lint error: Unexpected any. Specify a different type. 
export type Locale = typeof routing.locales[number];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'pt'],

  // Used when no locale matches
  defaultLocale: 'en',
  localeCookie: {
    name: 'LOCALE',
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);