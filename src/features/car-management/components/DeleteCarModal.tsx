import { Button } from "@/components/ui/button"
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
import { useTranslations } from "next-intl";

interface DeleteCarModalProps {
  carModel: string;
  onConfirm: () => void;
  trigger: React.ReactNode;
}

export function DeleteCarModal({ carModel, onConfirm, trigger }: DeleteCarModalProps) {
    const t =  useTranslations('Dialogs');

    return (
        <Dialog>
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
                        onClick={onConfirm}
                        className="cursor-pointer"
                    >
                        {t('confirm')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}