import { getTranslations } from 'next-intl/server';
import FieldDataTable from '@/features/car-management/components/FieldDataTable';
import SearchDataTable from '@/features/car-management/components/SearchDataTable';
import { Button } from "@/components/ui/button";
import { IoIosAdd } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import PaginationDataTable from '@/features/car-management/components/PaginationDataTable';

export default async function DashboardPage() {
    const t = await getTranslations('Dashboard');

    return (
        <main className="min-h-screen min-w-full p-10 pt-20 flex flex-col gap-10">
            <header>
                <h1 className="flex items-center gap-2 text-3xl font-bold"><MdSpaceDashboard />{t('title')}</h1>
                <p className="text-lg mt-2">{t('welcome')}</p>
            </header>

            <section className='flex flex-col justify-between gap-5'>
                <div className='flex justify-end'>
                    <Button className="flex items-center gap-2 cursor-pointer">
                        <IoIosAdd className='size-7' />
                        {t('addCar')}
                    </Button>
                </div>
                
                <div className='flex flex-col justify-between gap-10'>
                    <SearchDataTable />
                    <FieldDataTable />
                    <PaginationDataTable />
                </div>
            </section>
        </main>
    )
}