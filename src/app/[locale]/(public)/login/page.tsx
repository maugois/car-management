import Image from "next/image";
import { Card } from "@/components/ui/card";
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import LoginForm from "@/features/auth/components/LoginForm";

export default async function LoginPage() {
  const t = await getTranslations('login');

    return (
        <main className="min-h-screen min-w-full flex items-center justify-center">
            <Card className="w-115 py-6 px-15 hover:shadow-lg transition-shadow duration-300">
                <Image src="/assets/images/logo-car.jpg" alt="Car Icon" width={115} height={115} className="mx-auto rounded-full shadow-md hover:shadow-lg transition-shadow duration-300" />
                <h2 className="text-center text-2xl font-semibold">{t('welcome')}</h2>

                <LoginForm />

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