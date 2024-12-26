import { Button } from '@/shared/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FormInput } from '../../form/form-input';
import { Title } from '../../title';
import { formLoginSchema, TFormLogin } from './schema';

export interface Props {
    onClose?: () => void;
}

export const LoginForm: FC<Props> = ({ onClose }) => {
    const form = useForm<TFormLogin>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (data: TFormLogin) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (!resp?.ok) {
                return toast.error('Неправильный логин или пароль');
            }

            toast.success('Вы успешно вошли в аккаунт');

            onClose?.();
        } catch (error) {
            console.error(error);
            toast.error('Не удалось войти в аккаунт');
        }
    };

    return (
        <FormProvider {...form}>
            <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <Title
                            text="Вход в аккаунт"
                            size="md"
                            className="font-bold"
                        />
                        <p className="text-gray-400">
                            Введите свою почту, чтобы войти в свой аккаунт
                        </p>
                    </div>
                    <img
                        src="/assets/images/phone-icon.png"
                        alt="phone-icon"
                        width={60}
                        height={60}
                    />
                </div>

                <FormInput
                    name="email"
                    label="E-Mail"
                    placeholder="Введите почту"
                    required
                />
                <FormInput
                    name="password"
                    label="Пароль"
                    type="password"
                    placeholder="Введите пароль"
                    required
                />

                <Button
                    loading={form.formState.isSubmitting}
                    className="h-12 text-base"
                    type="submit"
                >
                    Войти
                </Button>
            </form>
        </FormProvider>
    );
};
