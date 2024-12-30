'use client';

import { registerUser } from '@/app/actions';
import { Button } from '@/shared/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FormInput } from '../../form/form-input';
import { formRegisterSchema, TFormRegister } from './schema';

export interface Props {
    onClose?: () => void;
}

export const RegisterForm: FC<Props> = ({ onClose }) => {
    const form = useForm<TFormRegister>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            fullName: '',
            confirmPassword: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (data: TFormRegister) => {
        try {
            await registerUser({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
            });

            toast.success('Регистрация прошла успешно! 📝');

            onClose?.();
        } catch (error) {
            return toast.error('Неверный E-Mail или пароль');
        }
    };
    return (
        <FormProvider {...form}>
            <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormInput
                    name="email"
                    label="E-Mail"
                    placeholder="Введите вашу почту"
                    required
                />
                <FormInput
                    name="fullName"
                    label="Полное имя"
                    required
                    placeholder="Введите имя и фамилию"
                />
                <FormInput
                    name="password"
                    label="Пароль"
                    type="password"
                    required
                    placeholder="Придумайте пароль"
                />
                <FormInput
                    name="confirmPassword"
                    label="Подтвердите пароль"
                    type="password"
                    required
                    placeholder="Подтвердите пароль"
                />

                <Button
                    loading={form.formState.isSubmitting}
                    className="h-12 text-base"
                    type="submit"
                >
                    Зарегистрироваться
                </Button>
            </form>
        </FormProvider>
    );
};
