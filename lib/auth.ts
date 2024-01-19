import { auth } from "@/auth";
import { db } from "./db";



export const currentUser= async () => {
    const session = await auth();

    return session?.user;
}


export const currentRole = async () => {
    const session = await auth();

    return session?.user?.role;
}


export const getSelf = async () => {
    const self = await currentUser();

    if(!self || !self.name) {
        throw new Error("Unauthorized")
    }

    const user = await db.user.findUnique({
        where: {
            id:self.id,
        }
    })

    if (!user) {
        throw new Error("Not found");
      }
      return user;
}