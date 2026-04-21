import { Role } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: Role;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}
