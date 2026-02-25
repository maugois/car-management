import { Button } from "@/components/ui/button"
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";

interface DeleteCarModalProps {
  carModel: string;
  onConfirm: () => Promise<void>;
  trigger: React.ReactNode;
  isLoading?: boolean;
}

export function DeleteCarModal({ carModel, onConfirm, trigger, isLoading }: DeleteCarModalProps) {
    const [open, setOpen] = useState(false);
    const t =  useTranslations('Dialogs');

    const handleConfirmInternal = async () => {
        try {
            await onConfirm();
            setOpen(false); 
        } catch (error) {
            console.error("Erro ao confirmar:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>{t('deleteTitle', { model: carModel })}</DialogTitle>
                    <DialogDescription>
                        {t('deleteDescription', { model: carModel })}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" type="button" className="cursor-pointer">
                        {t('cancel')}
                        </Button>
                    </DialogClose>

                    <Button  
                        onClick={handleConfirmInternal}
                        className="cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading ? (<Spinner className="size-4" />) : t('confirm')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}