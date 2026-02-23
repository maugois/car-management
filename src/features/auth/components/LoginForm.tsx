'use client'

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner"
import PasswordInput from "@/components/PasswordInput";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"

import { loginSchema, type LoginFormData } from "../schemas/login";

export default function LoginForm() {
    const t = useTranslations('login');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" }
    });

    async function onSubmit(values: LoginFormData) {
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (result?.error) {
                toast.error(t('error_invalid_credentials'));
            } else {
                router.push('/dashboard');
                router.refresh();
            }
        } catch (error) {
            toast.error(t('error_server'));
        } finally {
            setLoading(false);
        }
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

                    <Field className="mb-5">
                        <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
                        <PasswordInput
                            registration={{...register("password")}} 
                            id="password" 
                            placeholder={t('password')}
                            className={`${errors.password ? "border-red-500" : "" }`}  
                        />

                        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                    </Field>
                    <ToastContainer position="bottom-right" theme="colored"/>
                </FieldGroup>

                <Button className="cursor-pointer" disabled={loading}>
                    {loading ? (<Spinner className="size-5" />) : t('loginButton')}
                </Button>
            </FieldSet>
        </form>
    )
}