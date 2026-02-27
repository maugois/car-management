"use client";

import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { CarFormModal } from "@/components/CarFormModal";
import { DeleteCarModal } from "./DeleteCarModal";
import { useTranslations } from "next-intl";
import { useCars } from "@/features/car-management/hooks/use-cars";
import { toast } from "react-toastify";
import { Car } from "../types/car";

interface RowActionsProps {
  id: string | number;
  carData?: Car;
}

export default function RowActions({
  id,
  carData,
}: RowActionsProps) {
    const t =  useTranslations('Dashboard');
    const { deleteMutation } = useCars();

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync(id);
            toast.success(t('deleteSuccess'));
        } catch (error) {
            toast.error(t('deleteError'));
            throw error; 
        }
    };

    return (
        <div className="flex items-center justify-end gap-2 w-fit">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href={`/details/${id}`}>
                            <Button
                                size="icon"
                                aria-label="Visualizar"
                                className="cursor-pointer bg-blue-500 hover:bg-blue-600"
                            >
                                <FaEye />
                            </Button>
                        </Link>
                    </TooltipTrigger>

                    <TooltipContent>
                        <p>{t('view')}</p>
                    </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                    <CarFormModal 
                        car={carData} 
                        trigger={
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    aria-label="Editar"
                                    className="cursor-pointer bg-yellow-500 hover:bg-amber-600"
                                >
                                    <MdEdit />
                                </Button>
                            </TooltipTrigger>
                        }
                    />
                    <TooltipContent>
                        <p>{t('edit')}</p>
                    </TooltipContent>
                </Tooltip>
            
                <Tooltip>
                    <DeleteCarModal
                        carModel={carData?.model || ""}
                        onConfirm={handleDelete}
                        isLoading={deleteMutation.isPending}
                        trigger={
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    aria-label="Excluir"
                                    className="cursor-pointer bg-red-600 hover:bg-red-700 text-white"
                                >
                                    <MdDelete />
                                </Button>
                            </TooltipTrigger>
                        }
                    />
                    <TooltipContent>
                        <p>{t('delete')}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
