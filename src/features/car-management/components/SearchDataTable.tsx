import { getTranslations } from 'next-intl/server';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaFilter } from "react-icons/fa";
import { MdClear } from "react-icons/md";

export default async function SearchDataTable() {
    const t = await getTranslations('Dashboard');

    return (
        <article className="shadow-[-5px_0px_0px_0px_#E00501,0px_0px_15px_-5px_#000000] rounded-lg p-10 border">
            <div className="flex gap-10 flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col md:flex-row md:items-center gap-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-5">
                        <Label htmlFor="brand">{t('brand')}</Label>
                        <Input type="text" id="brand" placeholder={t('placeholderBrand')} className="w-full" required />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-5">
                        <Label htmlFor="model">{t('model')}</Label>
                        <Input type="text" id="model" placeholder={t('placeholderModel')} className="w-full" required />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-5">
                        <Label htmlFor="year">{t('year')}</Label>
                        <Input type="text" id="year" placeholder={t('placeholderYear')} className="w-full" required />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <Button className="cursor-pointer">
                        <FaFilter size={15} />
                        {t('filterButton')}
                    </Button>

                    <Button className="cursor-pointer text-white hover:text-white bg-neutral-500 hover:bg-neutral-600 focus:ring-neutral-300" variant={'outline'}>
                        <MdClear size={15} />
                        {t('clearButton')}
                    </Button>
                </div>
            </div>
        </article>
    )
}