import { db } from "@/lib/db"

export const getUserByName = async (id:string) => {

    const user = await db.user.findUnique({
        where:{
            id
        }
    })
}


export const getAllUsers = async () => {

    const users = await db.user.findMany({
        select:{
            id:true,
            image:true,
            name:true,
        }
    })

    return users;
}