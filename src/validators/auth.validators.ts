import z, { email, TypeOf } from "zod";

export const signupSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(4),
    role: z.string()
})

export type signupInput = z.infer<typeof signupSchema>

export const loginSchema = z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(4)
})

export type loginInput = z.infer<typeof loginSchema>