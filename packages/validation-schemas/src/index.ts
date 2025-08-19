import { z } from "zod";

export const SignUpSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    phoneNumber: z.string().min(1, 'Phone no. is required').min(10, { message: 'Must be a valid mobile number' }).max(14, { message: 'Must be a valid mobile number' }),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
})
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Password do not match',
    });

export const SignInSchema = z.object({
    credential: z.string().min(5, 'Email or phone is required')
        .refine(
            (val) => /\S+@\S+\.\S+/.test(val) || /^\d{10,15}$/.test(val),
            {
                message: 'Must be a valid email or phone number',
            }
        ),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
})

export const PaymentSchema = z.object({
    token: z.string(),
    userId: z.string(),
    amount: z.string()
})

export const OnRampTxnSchema = z.object({
    provider: z.string().min(1, "Provider is required"),
    amount: z.number().positive("Amount must be greater than zero")
})

export type SignInSchemaType = z.infer<typeof SignInSchema>
export type SignUpSchemaType = z.infer<typeof SignUpSchema>
export type PaymentSchemaType = z.infer<typeof PaymentSchema>
export type OnRampTxnType = z.infer<typeof OnRampTxnSchema>