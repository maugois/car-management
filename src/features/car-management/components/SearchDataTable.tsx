'use client'

import { useTranslations } from 'next-intl';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaFilter } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { filterSchema, type FilterData } from "../schemas/filter";

export default function SearchDataTable() {
    const t = useTranslations('Dashboard');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FilterData>({
        resolver: zodResolver(filterSchema),
        defaultValues: { brand: "", model: "", year: "" }
    });

    const onSubmit = (data: FilterData) => {
        console.log("Filtros aplicados:", data);

    };

    return (
        <article className="shadow-[-5px_0px_0px_0px_#E00501,0px_0px_15px_-5px_#000000] rounded-lg p-10 border">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-10 flex-col md:flex-row md:items-center md:justify-between mb-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-10">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col md:flex-row md:items-center gap-5">
                                <Label htmlFor="brand">{t('brand')}</Label>
                                <Input 
                                    {...register("brand")}
                                    type="text" 
                                    id="brand" 
                                    placeholder={t('placeholderBrand')} 
                                    className={`w-full ${errors.brand ? "border-red-500" : ""}`} 
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col md:flex-row md:items-center gap-5">
                                <Label htmlFor="model">{t('model')}</Label>
                                <Input 
                                    {...register("model")}
                                    type="text" 
                                    id="model" 
                                    placeholder={t('placeholderModel')} 
                                    className="w-full" 
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col md:flex-row md:items-center gap-5">
                                <Label htmlFor="year">{t('year')}</Label>
                                <Input 
                                    {...register("year")}
                                    type="text" 
                                    id="year" 
                                    placeholder={t('placeholderYear')} 
                                    className="w-full" 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5">
                            <Button type="submit" className="cursor-pointer">
                                <FaFilter size={15} />
                                {t('filterButton')}
                            </Button>

                            <Button 
                                type="button"
                                onClick={() => reset()}
                                className="cursor-pointer text-white hover:text-white bg-neutral-500 hover:bg-neutral-600 focus:ring-neutral-300" 
                                variant={'outline'}
                            >
                                <MdClear size={15} />
                                {t('clearButton')}
                            </Button>
                    </div>
                </div>

                {errors.brand && (
                    <span className="text-red-500 text-sm font-medium">
                        {errors.brand.message}
                    </span>
                )}
            </form>
        </article>
    )
}