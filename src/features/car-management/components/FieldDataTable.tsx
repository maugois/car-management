"use client"
import { useTranslations } from "next-intl";
import DataTable from "@/features/car-management/components/DataTable"
import RowActions from "@/features/car-management/components/RowActions"
import { ColumnDef } from "@tanstack/react-table"
import { CarResponse } from "../schemas/car";
import { useCars } from "@/features/car-management/hooks/use-cars"
import { useMemo, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default  function FieldDataTable() {
    const t =  useTranslations('Dashboard');
    const [filters, setFilters] = useState({});

    const { carsQuery } = useCars(filters);
    const { data: rawData, isLoading, isError } = carsQuery;

    const errorMessage = useMemo(() => {
        if (isError) return t('errors.generic');
        if (rawData?.error) return t('errors.generic');
        return null;
    }, [isError, rawData, t]);

    const cars = useMemo(() => {
        if (!rawData) return [];
        if (Array.isArray(rawData)) return rawData;
        if (rawData.content && Array.isArray(rawData.content)) return rawData.content;
        return [];
    }, [rawData]);

    const totalItems = useMemo(() => {
        if (rawData?.totalElements !== undefined) return rawData.totalElements;
        return cars.length;
    }, [rawData, cars]);

    const columns = useMemo((): ColumnDef<CarResponse>[] => [
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
            cell: ({ row }) => (
                <RowActions
                    id={row.original.id}
                    carData={row.original}
                />
            ),
        },
    ], [t]);

    return (
        <article className="shadow-[0px_-7px_0px_-2px_#E00501,0px_0px_15px_-5px_#000000] rounded-lg p-5 border">
            <h2 className='flex items-center gap-2 text-xl mb-7 font-semibold'>
                <span className='bg-primary py-2 px-5 rounded-full text-white text-lg'>
                    {isLoading ? <Spinner className="size-6 text-white"/> : totalItems}
                </span>

                {t('titleTable')}
            </h2>

            <div>
                {errorMessage && (
                    <div className="text-red-500 mb-4">{errorMessage}</div>
                )}

                {isLoading ? 
                    <Spinner className="size-6 text-white mx-auto"/> 
                    :
                    <DataTable 
                        columns={columns} 
                        data={cars} 
                    />
                }
            </div>
        </article>
    );
}