// src/types/next-auth.d.ts

import type { DefaultSession, User as DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "@auth/core/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      /** ユーザーの一意なID。 */
      id: string;
    } & DefaultSession["user"]; // デフォルトの user プロパティも継承
  }
}

declare module "@auth/core/jwt" {
  interface JWT extends DefaultJWT {
    /** Google の profile.sub を格納するための id プロパティ。 */
    id?: string;
  }
}