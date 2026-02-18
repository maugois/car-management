import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'pt'],
 
  // pathnames: {
  //   login: {
  //     en: '/login',
  //     pt: '/entrar',
  //   },
  //   register: {
  //     en: '/register',
  //     pt: '/register',
  //   },
  // },

  // Used when no locale matches
  defaultLocale: 'pt'
});