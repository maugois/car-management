import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function LoginPage() {
  const t = await getTranslations('login');

    return (
        <main className="min-h-screen min-w-full flex items-center justify-center">
            <Card className="w-115 py-6 px-15 hover:shadow-lg transition-shadow duration-300">
                <Image src="/assets/images/logo-car.jpg" alt="Car Icon" width={115} height={115} className="mx-auto rounded-full shadow-md hover:shadow-lg transition-shadow duration-300" />
                <h2 className="text-center text-2xl font-semibold">{t('welcome')}</h2>
                
                <form>
                    <FieldSet>
                        <FieldLegend className="text-center">{t('title')}</FieldLegend>
                        <FieldDescription className="text-center">{t('description')}</FieldDescription>

                        <FieldGroup>
                            <Field>
                                <FieldLabel>{t('email')}</FieldLabel>
                                <Input type="text" placeholder={t('email')} className="w-full mb-4" />
                            </Field>

                            <Field>
                                <FieldLabel>{t('password')}</FieldLabel>
                                <Input type="password" placeholder={t('password')} className="w-full mb-4" />
                            </Field>
                        </FieldGroup>

                        <Button className="cursor-pointer">
                            {t('loginButton')}
                        </Button>
                    </FieldSet>
                </form>

                <hr />

                <p className="text-center flex justify-center items-center gap-1">
                    {t('noAccount')}
                    <Link href="/register" className="block text-center text-primary hover:underline transition duration-300">
                        {t('registerLink')}
                    </Link>
                </p>
            </Card>
        </main>
    )
}