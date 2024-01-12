import { UserRole } from "@prisma/client";
import NextAuth,{DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
}


declare module "next-auth" {
     /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
     interface Session {
        user: ExtendedUser;
    }
    
}
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    /** OpenID ID Token */
    interface JWT {
        role?:UserRole;
    }
}