import { z } from 'zod';

export const formLoginSchema = z.object({
    email: z.string().email({ message: 'Введите корректную почту' }),
    password: z
        .string()
        .min(4, { message: 'Пароль должен содержать не менее 4 символов' }),
});

const passwordSchema = z.string().optional();

export const formRegisterSchema = z
    .object({
        email: z.string().email({ message: 'Введите корректную почту' }),
        fullName: z.string().min(2, { message: 'Введите корректное имя' }),
        password: z
            .string()
            .min(4, { message: 'Пароль должен содержать не менее 4 символов' }),
        confirmPassword: z
            .string()
            .min(4, { message: 'Пароль должен содержать не менее 4 символов' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export const formProfileSchema = z
    .object({
        email: z.string().email({ message: 'Введите корректную почту' }),
        fullName: z.string().min(2, { message: 'Введите корректное имя' }),
        password: passwordSchema,
        confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export type TFormLogin = z.infer<typeof formLoginSchema>;
export type TFormRegister = z.infer<typeof formRegisterSchema>;
export type TFormProfile = z.infer<typeof formProfileSchema>;
