import { z } from "zod";


export const packageSchema = z.object({
    name:z.enum(['Basic','Standard','Premium']),
    price:z.number().min(0),
    duration:z.number().min(0),
    delivery_days: z.number().min(0),
    revisions:z.number().min(0),
    features:z.array(z.string()),
    type:z.enum(["short_video","talking_head","podcast","thumbnail"])
})