import { z } from "zod";

export default z;

export const signUpSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    phone: z.string().min(1, 'Phone no. is required').min(10, { message: 'Must be a valid mobile number' }).max(14, { message: 'Must be a valid mobile number' }),
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

export const signInSchema = z.object({
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