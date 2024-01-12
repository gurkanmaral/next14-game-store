import * as z from "zod"


export const createFormSchema = z.object({
    title: z.string(),
    price: z.string(),
    images:z.string().min(1).url(),
    images2:z.string().min(1).url(),
    images3:z.string().min(1).url(),
    images4:z.string().min(1).url(),
    allImages:z.array(z.string()),
    SpecialPrice: z.string(),
    description: z.string(),
    Genres: z.array(z.string()),
    metacritic: z.string(),
    released: z.string(),
    platforms: z.array(z.string()),
    developer: z.string(),
})