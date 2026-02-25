"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getTranslations } from 'next-intl/server';

export async function authorizedFetch(endpoint: string, options: RequestInit = {}) {
    const t = await getTranslations('login');
    const session = await getServerSession(authOptions);
    const token = session?.user?.accessToken;
    const baseUrl = "http://localhost:8080/api/v1";

    if (!token) {
        throw new Error(t("errors.unauthorized"));
    }

    const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
            "Authorization": `Bearer ${token}`,
        },
    });

    return response;
}