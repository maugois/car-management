import { getTranslations } from 'next-intl/server';
import FieldDataTable from '@/features/car-management/components/FieldDataTable';
import SearchDataTable from '@/features/car-management/components/SearchDataTable';

export default async function DashboardPage() {
    const t = await getTranslations('Dashboard');

    return (
        <main className="min-h-screen min-w-full p-10 pt-20 flex flex-col gap-10">
            <header>
                <h1 className="text-3xl font-bold">{t('title')}</h1>
                <p className="text-lg mt-2">{t('welcome')}</p>
            </header>

            <section className='flex flex-col justify-between gap-10'>
                <SearchDataTable />
                <FieldDataTable />
            </section>
        </main>
    )
}