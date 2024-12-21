import { z } from 'zod';

export const checkoutFormSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: 'Имя должно быть больше 2 символов' }),
    lastName: z
        .string()
        .min(2, { message: 'Фамилия должна быть больше 2 символов' }),
    email: z.string().email({ message: 'Некорректный email' }),
    phone: z.string().min(4, { message: 'Некорректный номер телефона' }),
    address: z.string().min(3, { message: 'Неккоректный адрес' }),
    comment: z.string().optional(),
});

export type TCheckoutFormSchema = z.infer<typeof checkoutFormSchema>;
