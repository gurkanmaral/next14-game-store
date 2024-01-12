"use server";

import { RegisterSchema } from "@/schemas/registerSchema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserbyEmail } from "@/data/auth/user";



export const register = async (values:z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return {error: "Invalid Fields!"};
    }

    const {email, password, name} = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserbyEmail(email);

    if(existingUser) {
        return {error: "Email already in use!"};
    }

    await db.user.create({
        data:{
            name,
            email,
            password: hashedPassword,
        }
    });

    return {success: "Account created!"};
}