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


export default async function RegisterPage() {
  const t = await getTranslations('register');

  return (
    <main className="min-h-screen min-w-full flex items-center justify-center">
      <Card className="w-115 py-10 px-15 hover:shadow-lg transition-shadow duration-300">
        <form>
          <FieldSet>
            <FieldLegend className="text-center">{t('title')}</FieldLegend>
            <FieldDescription className="text-center">{t('description')}</FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
                <Input type="text" id="email" placeholder={t('email')} className="w-full" />
              </Field>

              <Field>
                <FieldLabel htmlFor="name">{t('name')}</FieldLabel>
                <Input type="text" id="name" placeholder={t('name')} className="w-full" />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
                <Input type="password" id="password" placeholder={t('password')} className="w-full" />
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">{t('confirmPassword')}</FieldLabel>
                <Input type="password" id="confirmPassword" placeholder={t('confirmPassword')} className="w-full mb-5" />
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
          <Link href="/login" className="block text-center text-primary hover:underline transition duration-300">
            {t('registerLink')}
          </Link>
        </p>
      </Card>
    </main>
  )
}