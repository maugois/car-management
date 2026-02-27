import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "@/features/auth/actions/auth-user";
import { LoginFormData } from "@/features/auth/schemas/login";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Java Backend",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        try {
          const result = await authenticateUser(credentials as LoginFormData);
          
          if (result && result.token) {
            return {
              id: String(result.id),
              name: result.name,
              email: result.email,
              accessToken: result.token,
              expiresIn: result.expiresIn,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const expirationInSeconds = (user as any).expiresIn || 1800;

        return {
          ...token,
          id: user.id,
          accessToken: user.accessToken,
          expiresAt: Date.now() + expirationInSeconds * 1000,
        };
      }

      if (Date.now() > (token.expiresAt as number)) {
          return { ...token, error: "TokenExpiredError" };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.accessToken = token.accessToken as string; 
        session.error = token.error as "TokenExpiredError";
      }
      return session;
    },
  },
  pages: {
    signIn: '/pt/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 60,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };