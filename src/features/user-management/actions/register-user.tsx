"use server";

import { RegisterFormData } from "../schemas/register";
import { getTranslations } from 'next-intl/server';

export async function registerUser(data: RegisterFormData) {
  const t = await getTranslations('register');

  try {
    const response = await fetch("http://localhost:8080/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(t("errors.fetch_failed"));
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: t("errors.fetch_failed") };
  }
}