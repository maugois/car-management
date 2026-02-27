'use client'

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { Spinner } from "./ui/spinner"
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
import { useCars } from "@/features/car-management/hooks/use-cars"
import { Car } from "@/features/car-management/types/car";

interface CarModalProps {
  car?: Car;
  trigger?: React.ReactNode;
}

export function CarFormModal({ car, trigger }: CarModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const isEditing = Boolean(car);
    const t =  useTranslations('Dialogs');
    const schema = useCarFormSchema();

    const { createMutation, editMutation } = useCars();

    const {
        register,
        handleSubmit,
        formState: { errors },
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

    useEffect(() => {
        if (car) {
            reset({
                brand: car.brand,
                model: car.model,
                color: car.color,
                year: String(car.year),
            });
        }
    }, [car, reset]);

    const onSubmit = async (formData: CarFormData) => {
        try {
            if (isEditing && car?.id) {
                await editMutation.mutateAsync({ 
                    id: car.id, 
                    data: formData 
                });
                toast.success(t('successUpdate'));
            } else {
                await createMutation.mutateAsync(formData);
                toast.success(t('successCreate'));
            }
        
            setIsOpen(false);
            reset();         
        } catch (error: any) {
            toast.error(t('errorServer') || error.message);
        }
    };

  return (
    <Dialog 
        open={isOpen} 
        onOpenChange={
            (val) => {
            setIsOpen(val);
            if (!val) reset();
        }}
    >
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

                    <Button 
                        type="submit"
                        className="cursor-pointer" 
                        disabled={createMutation.isPending || editMutation.isPending}
                    >
                    {
                        (createMutation.isPending || editMutation.isPending) 
                        ? <Spinner className="size-4" /> 
                        : (isEditing ? t('saveChanges') : t('createCar'))
                    }
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}