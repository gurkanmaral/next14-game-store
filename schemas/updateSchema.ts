import * as z from "zod";

export const UpdateSchema = z.object({
    name: z.string().min(3,{
        message:"Name should be at least 3 characters"
    }),
    image: z.string().url(),
});
