"use server";

import { getSelf } from "@/lib/auth";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";


export const updateUser = async (values:Partial<User>) => {

   
        const self = await getSelf();
     
        const validData = {
            name: values.name,
            image:values.image,
          };
        const user = await db.user.update({
          where:{
            id:self.id,
          },
          data: { ...validData }
        })  

        revalidatePath(`/${self.id}`)
       
        return user;
    
}