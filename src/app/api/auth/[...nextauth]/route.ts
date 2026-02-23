import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "@/features/auth/actions/auth-user";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Java Backend",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await authenticateUser(credentials as any);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };