'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"

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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl";
import { useCarFormSchema, type CarFormData } from "@/features/car-management/schemas/car"

interface Car extends CarFormData {
  id?: string;
}

interface CarModalProps {
  car?: Car;
  trigger?: React.ReactNode;
}

export function CarFormModal({ car, trigger }: CarModalProps) {
    const isEditing = Boolean(car);
    const t =  useTranslations('Dialogs');
    const schema = useCarFormSchema();


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<CarFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            brand: car?.brand || "",
            model: car?.model || "",
            color: car?.color || "",
            year: car?.year ? String(car.year) : "",
        }
    });

    const onSubmit = async (data: CarFormData) => {
        try {
            console.log("Dados validados:", data);
            
            if (isEditing) {

                toast.success(t('successUpdate'));
            } else {

                toast.success(t('successCreate'));
            }
            
        } catch (error) {
            toast.error(t('errorServer'));
        }
    };

  return (
    <Dialog onOpenChange={(open) => !open && reset()}>
        <DialogTrigger asChild>
            {trigger || (
            <Button variant="outline">
                {isEditing ? t('editCar') : t('newCar')}
            </Button>
            )}
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogHeader>
                    <DialogTitle>
                        {isEditing 
                            ? t('editTitle', { model: car?.model || '' })
                            : t('addTitle')}
                    </DialogTitle>
                    
                    <DialogDescription>
                        {isEditing ? t('editDescription') : t('addDescription')}
                    </DialogDescription>
                </DialogHeader>

                <FieldGroup className="py-4 space-y-4">
                    <Field>
                        <Label htmlFor="model">{t('model')}</Label>
                        <Input 
                            id="model" 
                            {...register("model")}
                            placeholder={t('placeholderModel')}
                            className={errors.model ? "border-red-500" : ""}
                        />
                        {errors.model && <span className="text-red-500 text-xs">{errors.model.message}</span>}
                    </Field>

                    <Field>
                        <Label htmlFor="brand">{t('brand')}</Label>
                        <Input 
                            id="brand" 
                            {...register("brand")}
                            placeholder={t('placeholderBrand')}
                            className={errors.brand ? "border-red-500" : ""}
                        />
                        {errors.brand && <span className="text-red-500 text-xs">{errors.brand.message}</span>}
                    </Field>

                    <Field>
                        <Label htmlFor="color">{t('color')}</Label>
                        <Input 
                            id="color" 
                            {...register("color")}
                            placeholder={t('placeholderColor')}
                            className={errors.color ? "border-red-500" : ""}
                        />
                        {errors.color && <span className="text-red-500 text-xs">{errors.color.message}</span>}
                    </Field>

                    <Field>
                        <Label htmlFor="year">{t('year')}</Label>
                        <Input 
                            id="year" 
                            {...register("year")}
                            placeholder={t('placeholderYear')}
                            maxLength={4}
                            className={errors.year ? "border-red-500" : ""}
                        />
                        {errors.year && <span className="text-red-500 text-xs">{errors.year.message}</span>}
                    </Field>
                </FieldGroup>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" type="button" className="cursor-pointer">
                            {t('cancel')}
                        </Button>
                    </DialogClose>

                    <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>
                        {isSubmitting ? "..." : (isEditing ? t('saveChanges') : t('createCar'))}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}