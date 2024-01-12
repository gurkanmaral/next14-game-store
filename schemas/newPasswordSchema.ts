import * as z from "zod";

export const NewPasswordSchema = z.object({
    password: z.string().min(6,{
        message:"Mininum 6 characters required"
    }),
});