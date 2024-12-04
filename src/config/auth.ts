import { navPaths } from "@/services/navPaths";
import { UserApi } from "@/shared/api/user";
import NextAuth, { AuthOptions, DefaultSession, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await UserApi.loginUser({
          login: credentials.email,
          password: credentials.password,
        });
        if (user) {
          const { password, ...userWithoutPass } = user;
          return { ...userWithoutPass, id: String(userWithoutPass.id) } as User;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: `${navPaths.SIGNIN}`,
  },
  session: {
    strategy: "jwt",
  },
};
