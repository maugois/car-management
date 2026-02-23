import createMiddleware from 'next-intl/middleware';
import { withAuth } from "next-auth/middleware";
import { NextRequest } from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const publicPages = ['/', '/login', '/register'];

export default withAuth(
  function middleware(req: NextRequest) {
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