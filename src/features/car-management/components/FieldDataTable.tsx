import { getTranslations } from 'next-intl/server';
import DataTable from "@/features/car-management/components/DataTable"
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default async function FieldDataTable() {
    const t = await getTranslations('Dashboard');

    const mockData = [
        {
            id: 1,
            model: "Civic",
            brand: "Honda",
            color: "Prata",
            year: 2022,
        },
        {
            id: 2,
            model: "Corolla",
            brand: "Toyota",
            color: "Preto",
            year: 2021,
        },
        {
            id: 3,
            model: "Onix",
            brand: "Chevrolet",
            color: "Branco",
            year: 2023,
        },
        {
            id: 4,
            model: "HB20",
            brand: "Hyundai",
            color: "Vermelho",
            year: 2020,
        },
        {
            id: 5,
            model: "Gol",
            brand: "Volkswagen",
            color: "Cinza",
            year: 2019,
        },
    ];

    return (
        <article className="shadow-[0px_-7px_0px_-3px_#E00501,0px_0px_15px_-5px_#000000] rounded-lg p-5 border">
            <h2 className='flex items-center gap-2 text-xl mb-7 font-semibold'>
                <span className='bg-primary py-2 px-5 rounded-full text-white text-lg'>{mockData.length}</span>
                {t('titleTable')}
            </h2>

            <DataTable 
                columns={[
                    { accessorKey: "model", header: `${t('model')}` }, 
                    { accessorKey: "brand", header: `${t('brand')}` }, 
                    { accessorKey: "color", header: `${t('color')}` }, 
                    { accessorKey: "year", header: `${t('year')}` },
                    { accessorKey: "options", header: `${t('options')}` },
                ]} 
                data={mockData} 
            />
        </article>
    );
}