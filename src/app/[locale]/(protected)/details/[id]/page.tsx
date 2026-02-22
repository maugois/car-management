import { getTranslations } from 'next-intl/server';
import { Button } from "@/components/ui/button";
import { CarFormModal } from "@/components/UserFormModal";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import { MdEdit } from "react-icons/md";
import { IoLogoModelS, IoIosColorFill  } from "react-icons/io";
import { SiBrandfolder } from "react-icons/si";
import { RiSortNumberDesc } from "react-icons/ri";
import Link from "next/link";

interface DetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DetailsPage({ params }: DetailsProps) {
    const t = await getTranslations('Details');
    const { id } = await params;

    const car = {
        id: id,
        model: "Civic",
        brand: "Honda",
        color: "Prata",
        year: "2024"
    };

    return (
        <main className="min-h-screen min-w-full p-20 flex flex-col gap-10">
            <header>
                <Link href={'/dashboard'}>
                  <Button variant={'outline'} className='mb-10 flex items-center cursor-pointer font-semibold shadow-md'>
                      <IoMdArrowRoundBack />
                      {t('back')}
                  </Button>
                </Link>
                <h1 className="flex items-center gap-2 text-3xl font-bold"><TbListDetails />{t('title')}</h1>
                <p className="text-lg mt-2">{t('welcome')}</p>
            </header>

            <section className='flex flex-col justify-between gap-5'>
                <div className='flex justify-end'>
                    <CarFormModal
                        car={car} 
                        trigger={
                            <Button className="flex items-center gap-2 cursor-pointer">
                                <MdEdit className='size-7'/>
                                {t('edit')}
                            </Button>
                        }
                    />
                </div>
                
                <div className="shadow-[-5px_0px_0px_0px_#E00501,0px_0px_15px_-5px_#000000] rounded-lg p-10 border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                      <InfoField label={t('labels.model')} value={car.model} icon={<IoLogoModelS className='size-5' />} />
                      <InfoField label={t('labels.brand')} value={car.brand} icon={<SiBrandfolder className='size-5' />} />
                      <InfoField label={t('labels.color')} value={car.color} icon={<IoIosColorFill className='size-5' />} />
                      <InfoField label={t('labels.year')} value={car.year} icon={<RiSortNumberDesc className='size-5' />} />
                  </div>
                </div>
            </section>
        </main>
    )
}

function InfoField({ label, value, icon, }: { label: string; value: string; icon: React.ReactNode; }) {
  return (
    <div className="group flex flex-col gap-1.5 border-b border-secondary/60 pb-4 transition-colors hover:border-primary/40">
      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-primary transition-transform duration-200 group-hover:scale-110">
          {icon}
        </span>
        {label}
      </span>

      <span className="text-lg font-semibold leading-tight text-foreground sm:text-xl">
        {value}
      </span>
    </div>
  );
}