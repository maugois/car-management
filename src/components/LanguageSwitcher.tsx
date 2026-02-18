'use client';

import { useTransition } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';

const LANGUAGES = [
  { code: 'pt', label: 'BR' },
  { code: 'en', label: 'US' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (code: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: code });
    });
  };

  return (
    <div className="flex gap-1">
      {LANGUAGES.map(({ code, label }) => (
        <Button
          key={code}
          variant={currentLocale === code ? 'default' : 'ghost'}
          size="icon"
          onClick={() => handleLanguageChange(code)}
          disabled={isPending}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}