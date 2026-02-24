"use client"

import { useTranslations } from 'next-intl';
import { useState } from "react";
import FieldDataTable from '@/features/car-management/components/FieldDataTable';
import SearchDataTable from '@/features/car-management/components/SearchDataTable';
import { Button } from "@/components/ui/button";
import { IoIosAdd } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import PaginationDataTable from '@/features/car-management/components/PaginationDataTable';
import { CarFormModal } from "@/components/CarFormModal";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

export default function DashboardPage() {
    const t = useTranslations('Dashboard');

    const [totalElements, setTotalElements] = useState(0);
    const [queryParams, setQueryParams] = useState({
        page: 0,
        size: 10,
        brand: "",
        model: "",
        year: ""
    });

    const handleFilter = (filters: any) => {
        setQueryParams(prev => ({ ...prev, ...filters, page: 0 }));
    };

    const handlePageChange = (newPage: number) => {
        setQueryParams(prev => ({ ...prev, page: newPage }));
    };

    const handleSizeChange = (newSize: string) => {
        setQueryParams(prev => ({ ...prev, size: Number(newSize), page: 0 }));
    };

    return (
        <main className="min-h-screen min-w-full p-20 flex flex-col gap-10">
            <header>
                <LogoutButton label={t("logout")} />
                <h1 className="flex items-center gap-2 text-3xl font-bold"><MdSpaceDashboard />{t('title')}</h1>
                <p className="text-lg mt-2">{t('welcome')}</p>
            </header>

            <section className='flex flex-col justify-between gap-5'>
                <div className='flex justify-end'>
                    <CarFormModal 
                        trigger={
                            <Button className="flex items-center gap-2 cursor-pointer">
                                <IoIosAdd className='size-7' />
                                {t('addCar')}
                            </Button>
                        }
                    />
                </div>
                
                <div className='flex flex-col justify-between gap-10'>
                    <SearchDataTable onFilter={handleFilter} />
                    <FieldDataTable queryParams={queryParams} onDataLoaded={(total) => setTotalElements(total)}/>
                    <PaginationDataTable
                        totalElements={totalElements} 
                        currentPage={queryParams.page}
                        pageSize={String(queryParams.size)}
                        onPageChange={handlePageChange}
                        onSizeChange={handleSizeChange}
                    />
                </div>
            </section>
        </main>
    )
}