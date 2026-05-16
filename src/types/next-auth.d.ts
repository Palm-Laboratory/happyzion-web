import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id?: string;
      email: string;
      username?: string;
      role: "admin";
      accountRole: "SUPER_ADMIN" | "ADMIN";
      adminJwt?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin";
    username?: string;
    accountRole?: "SUPER_ADMIN" | "ADMIN";
    adminJwt?: string;
  }
}
