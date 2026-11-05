import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Skip API, Studio, Next internals and any file with an extension.
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)'],
};
