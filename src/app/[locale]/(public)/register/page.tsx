import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/PasswordInput";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import TermsDialog from "@/features/auth/components/TermsDialog";
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
                <Input type="email" id="email" placeholder={t('email')} className="w-full" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="name">{t('name')}</FieldLabel>
                <Input type="text" id="name" placeholder={t('name')} className="w-full" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
                <PasswordInput id="password" placeholder={t('password')} />
              </Field>

              <Field className="mb-5">
                <FieldLabel htmlFor="confirmPassword">{t('confirmPassword')}</FieldLabel>
                <PasswordInput id="confirmPassword" placeholder={t('confirmPassword')} />
              </Field>
            </FieldGroup>

            <p className="text-center text-sm text-muted-foreground">
              {t('termsPrefix')}{" "}
              <TermsDialog triggerText={t('termsLink')} />.
            </p>

            <Button className="cursor-pointer">
              {t('registerButton')}
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