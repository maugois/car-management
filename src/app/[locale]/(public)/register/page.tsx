import { Card } from "@/components/ui/card";
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import RegisterForm from "@/features/user-management/components/RegisterForm";


export default async function RegisterPage() {
  const t = await getTranslations('register');

  return (
    <main className="min-h-screen min-w-full flex items-center justify-center">
      <Card className="w-115 py-10 px-15 hover:shadow-lg transition-shadow duration-300">

        <RegisterForm />

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