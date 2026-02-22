'use client'

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

interface Car {
  id?: string;
  model: string;
  brand: string;
  color: string;
  year: string;
}

interface CarModalProps {
  car?: Car;
  trigger?: React.ReactNode;
}

export function CarFormModal({ car, trigger }: CarModalProps) {
  const isEditing = Boolean(car);
  const t =  useTranslations('Dialogs');

  return (
    <Dialog>
        <DialogTrigger asChild>
            {trigger || (
            <Button variant="outline">
                {isEditing ? t('editCar') : t('newCar')}
            </Button>
            )}
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
            <form action={async (formData) => {
                console.log("Dados do formulário:", Object.fromEntries(formData));
            }}>
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

                <FieldGroup className="py-4">
                    <Field>
                        <Label htmlFor="model">{t('model')}</Label>
                        <Input 
                            id="model" 
                            name="model" 
                            defaultValue={car?.model || ""} 
                            placeholder={t('placeholderModel')}
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="brand">{t('brand')}</Label>
                        <Input 
                            id="brand" 
                            name="brand" 
                            defaultValue={car?.brand || ""} 
                            placeholder={t('placeholderBrand')}
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="color">{t('color')}</Label>
                        <Input 
                            id="color" 
                            name="color" 
                            defaultValue={car?.color || ""} 
                            placeholder={t('placeholderColor')}
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="year">{t('year')}</Label>
                        <Input 
                            id="year" 
                            name="year" 
                            defaultValue={car?.year || ""} 
                            placeholder={t('placeholderYear')}
                        />
                    </Field>
                </FieldGroup>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" type="button" className="cursor-pointer">
                            {t('cancel')}
                        </Button>
                    </DialogClose>

                    <Button type="submit" className="cursor-pointer">
                        {isEditing ? t('saveChanges') : t('createCar')}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}