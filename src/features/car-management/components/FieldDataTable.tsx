"use client"
import { useTranslations } from "next-intl";
import DataTable from "@/features/car-management/components/DataTable"
import RowActions from "@/features/car-management/components/RowActions"
import { useCars } from "@/features/car-management/hooks/use-cars"
import { useState } from "react";
import { CarResponse } from "../schemas/car";
import { Spinner } from "@/components/ui/spinner";

export default  function FieldDataTable() {
    const t =  useTranslations('Dashboard');

    const [filters, setFilters] = useState({});

    const { carsQuery } = useCars(filters);

    const { data: rawData, isLoading, isError } = carsQuery;

    const cars = (rawData as CarResponse[]) || [];

    return (
        <article className="shadow-[0px_-7px_0px_-2px_#E00501,0px_0px_15px_-5px_#000000] rounded-lg p-5 border">
            <h2 className='flex items-center gap-2 text-xl mb-7 font-semibold'>
                <span className='bg-primary py-2 px-5 rounded-full text-white text-lg'>
                    {isLoading ? <Spinner className="size-6"/> : cars.length || '0'}
                </span>

                {t('titleTable')}
            </h2>

            {isError && (
                <div className="text-red-500 mb-4">Erro ao carregar os dados.</div>
            )}

            <DataTable 
                columns={[
                    { 
                        accessorKey: "model", 
                        header: `${t('model')}`,   
                        meta: {className: "font-semibold"},
                    }, 
                    { 
                        accessorKey: "brand", 
                        header: `${t('brand')}`,
                    }, 
                    { 
                        accessorKey: "color", 
                        header: `${t('color')}`, 
                        meta: {className: "font-semibold"}
                    }, 
                    { accessorKey: "year", header: `${t('year')}` },
                    {
                        accessorKey: "options",
                        header: `${t('options')}`,
                        size: 80,
                        minSize: 60,
                        maxSize: 100,
                        cell: ({ row }) => (
                            <RowActions
                                id={row.original.id}
                                carData={row.original}
                            />
                        ),
                    },
                ]} 
                data={cars} 
            />
        </article>
    );
}