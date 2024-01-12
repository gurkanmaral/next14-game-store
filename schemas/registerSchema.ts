import * as z from "zod";

export const RegisterSchema = z.object({
    email: z.string().email({
        message:"Email is invalid"
    }),
    password: z.string().min(6, {
        message: "Mininum 6 characters required",
    }),
    name: z.string().min(1,{
        message:"Name field is required",
    })
});