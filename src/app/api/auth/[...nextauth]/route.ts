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
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          accessToken: user.accessToken,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id ?? "",
          name: token.name ?? "",
          email: token.email ?? "",
          accessToken: token.accessToken ?? "",
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/pt/login',
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };