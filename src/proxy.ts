import createMiddleware from 'next-intl/middleware';
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const publicPages = ['/', '/login', '/register'];
const authOnlyPages = ['/login', '/register'];

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    const pathnameWithoutLocale = pathname.replace(/^\/(?:pt|en)/, '') || '/';
    if (token && authOnlyPages.includes(pathnameWithoutLocale)) {
      const locale = pathname.split('/')[1] || 'pt';
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
    }

    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        const pathnameWithoutLocale = pathname.replace(/^\/(?:pt|en)/, '') || '/';
        
        const isPublicPage = publicPages.includes(pathnameWithoutLocale);

        if (isPublicPage) return true;
        
        return !!token;
      }
    },
    pages: {  
      signIn: `/pt/login`,
    },
  }
);

export const config = {
  matcher: ['/((?!api|auth|_next|.*\\..*).*)']
};