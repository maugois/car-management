"use client"
import { useTranslations } from "next-intl";
import DataTable from "@/features/car-management/components/DataTable"
import RowActions from "@/features/car-management/components/RowActions"
import { ColumnDef } from "@tanstack/react-table"
import { type CarFormData } from "../schemas/car";
import { useCars } from "@/features/car-management/hooks/use-cars"
import { useMemo, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

interface FieldDataTableProps {
  queryParams: {
    page: number;
    size: number;
    brand: string;
    model: string;
    year: string;
  };
  onDataLoaded: (total: number) => void;
}

export default  function FieldDataTable({ queryParams, onDataLoaded }: FieldDataTableProps) {
    const t =  useTranslations('Dashboard');

    const { carsQuery } = useCars(queryParams);
    const { data: rawData, isLoading, isError } = carsQuery;

    useEffect(() => {
        if (rawData?.totalElements !== undefined) {
            onDataLoaded(rawData.totalElements);
        } else if (Array.isArray(rawData)) {
            onDataLoaded(rawData.length);
        }
    }, [rawData, onDataLoaded]);

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

    const columns = useMemo((): ColumnDef<CarFormData & {id: string}>[] => [
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