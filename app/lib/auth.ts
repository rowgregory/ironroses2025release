import prisma from "@/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { handleGoogleCallback } from "./callbacks/handleGoogleCallback";
import { createLog } from "./utils/createLog";
import { Role } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: false,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma) as any,
  pages: { error: "/login" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      switch (account?.provider) {
        case "google":
          return handleGoogleCallback(user, account);
        default:
          return true;
      }
    },

    async jwt({ token, user }) {
      if (!user?.email) return token;

      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: {
          id: true,
          role: true,
        },
      });

      if (dbUser) {
        token.id = dbUser.id;
        token.role = dbUser.role;
      } else {
        await createLog(
          "error",
          `JWT build failed — user not found: ${user.email}`,
          {
            location: ["auth.ts - jwt"],
            name: "JWTUserNotFound",
            timestamp: new Date().toISOString(),
            email: user.email,
          },
        );
      }

      return token;
    },

    async session({ session, token }) {
      if (token.id && typeof token.id === "string") {
        session.user.id = token.id;
        session.user.role = token.role as Role;
      } else {
        await createLog(
          "error",
          `Session build failed — no userId in token for ${session.user.email}`,
          {
            location: ["auth.ts - session"],
            name: "SessionMissingToken",
            timestamp: new Date().toISOString(),
            email: session.user.email,
          },
        );
      }
      return session;
    },
  },
});
