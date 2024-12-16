import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Skip all internal paths
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|img|sounds|pdf|models).*)',
  ],
};