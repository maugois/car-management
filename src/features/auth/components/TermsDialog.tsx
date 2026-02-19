'use client';

import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
  triggerText: string;
};

export default function TermsDialog({ triggerText }: Props) {
    const t = useTranslations('termsDialog');

    return (
        <Dialog>
        <DialogTrigger asChild>
            <button className="text-primary underline hover:opacity-80 transition cursor-pointer">
            {triggerText}
            </button>
        </DialogTrigger>

        <DialogContent className="max-w-xl">
            <DialogHeader>
                <DialogTitle>{t('title')}</DialogTitle>
                <DialogDescription>
                    {t('description')}
                </DialogDescription>
            </DialogHeader>

            <ScrollArea className="h-72 py-5 px-4 mt-2 mb-5 border rounded-md shadow-lg">
                <div className="space-y-4 text-sm text-muted-foreground">
                    <h3 className="font-semibold text-foreground">
                        {t('sections.acceptance.title')}
                    </h3>
                    <p>{t('sections.acceptance.content')}</p>

                    <h3 className="font-semibold text-foreground">
                        {t('sections.usage.title')}
                    </h3>
                    <p>{t('sections.usage.content')}</p>

                    <h3 className="font-semibold text-foreground">
                        {t('sections.account.title')}
                    </h3>
                    <p>{t('sections.account.content')}</p>

                    <h3 className="font-semibold text-foreground">
                        {t('sections.privacy.title')}
                    </h3>
                    <p>{t('sections.privacy.content')}</p>

                    <h3 className="font-semibold text-foreground">
                        {t('sections.liability.title')}
                    </h3>
                    <p>{t('sections.liability.content')}</p>

                    <h3 className="font-semibold text-foreground">
                        {t('sections.changes.title')}
                    </h3>
                    <p>{t('sections.changes.content')}</p>

                    <h3 className="font-semibold text-foreground">
                        {t('sections.general.title')}
                    </h3>
                    <p>{t('sections.general.content')}</p>
                </div>
            </ScrollArea>

            <DialogFooter>
                <DialogClose asChild>
                    <Button className="w-full cursor-pointer">{t('closeButton')}</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
}
