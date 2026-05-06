import NextAuth from "next-auth";

import { adminAuthOptions } from "@/auth";

const authHandler = NextAuth(adminAuthOptions);

export { authHandler as GET, authHandler as POST };
