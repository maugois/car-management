import { getServerSession } from "next-auth/next";

export async function authorizedFetch(endpoint: string, options: RequestInit = {}) {
    const session = await getServerSession();
    const token = session?.user?.accessToken;
    const baseUrl = "http://localhost:8080/api/v1";

    if (token) {
        console.log("✅ Token encontrado na sessão:", token.slice(-10));
    } else {
        console.warn("⚠️ Nenhum token encontrado na sessão do NextAuth.");
    }

    return fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: {
        "Content-Type": "application/json",
        ...options.headers,
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
    });
}