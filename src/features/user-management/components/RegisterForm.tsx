'use client'

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/PasswordInput";
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from "@/components/ui/spinner"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import TermsDialog from "@/features/user-management/components/TermsDialog";

import { registerSchema, type RegisterFormData } from "../schemas/register";

export default function RegisterForm() {
    const t = useTranslations('register');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: "", name: "", password: "", confirmPassword: "" }
    });

      function onSubmit(values: RegisterFormData) {
          setLoading(true);
          console.log("kdfhkds")
      }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldLegend className="text-center">{t('title')}</FieldLegend>
            <FieldDescription className="text-center">{t('description')}</FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
                <Input
                  {...register("email")}  
                  type="email" 
                  id="email" 
                  placeholder={t('email')} 
                  className={`w-full ${errors.email ? "border-red-500" : "" }`} 
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </Field>

              <Field>
                <FieldLabel htmlFor="name">{t('name')}</FieldLabel>
                <Input
                  {...register("name")}  
                  type="text" 
                  id="name" 
                  placeholder={t('name')} 
                  className={`w-full ${errors.name ? "border-red-500" : "" }`} 
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
                <PasswordInput 
                  registration={{...register("password")}}
                  id="password" 
                  placeholder={t('password')}
                  className={`${errors.password ? "border-red-500" : "" }`}  
                />
                {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
              </Field>

              <Field className="mb-5">
                <FieldLabel htmlFor="confirmPassword">{t('confirmPassword')}</FieldLabel>
                <PasswordInput
                  registration={{...register("confirmPassword")}} 
                  id="confirmPassword" 
                  placeholder={t('confirmPassword')}
                  className={`${errors.confirmPassword ? "border-red-500" : "" }`}  
                />
                {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
              </Field>
            </FieldGroup>

            <p className="text-center text-sm text-muted-foreground">
              {t('termsPrefix')}{" "}
              <TermsDialog triggerText={t('termsLink')} />.
            </p>

            <Button className="cursor-pointer">
              {t('registerButton')}
            </Button>
          </FieldSet>
        </form>
    )
}