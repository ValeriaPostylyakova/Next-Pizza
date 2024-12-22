'use client';
import { createOrder } from '@/app/actions';
import { Container, Title } from '@/shared/components/shared';
import { CheckoutRightBlock } from '@/shared/components/shared/checkout-right-block';
import { CheckoutAddress } from '@/shared/components/shared/checkout/checkout-address';
import { CheckoutCart } from '@/shared/components/shared/checkout/checkout-cart';
import { CheckoutForm } from '@/shared/components/shared/checkout/checkout-form';
import {
    checkoutFormSchema,
    TCheckoutFormSchema,
} from '@/shared/components/shared/checkout/checkout-form-schema';
import { useCart } from '@/shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
    const { items, totalAmount, removeCartItem, updateQuantity, loading } =
        useCart();

    const [submitting, setSubmitting] = useState(false);

    const onClickCountButton = (
        id: number,
        quanty: number,
        type: 'plus' | 'minus'
    ) => {
        const newQuanty = type === 'plus' ? quanty + 1 : quanty - 1;
        updateQuantity(id, newQuanty);
    };

    const DELIVERY_PRICE = 250;
    const totalPrice = DELIVERY_PRICE + totalAmount;

    const form = useForm<TCheckoutFormSchema>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            comment: '',
        },
        resolver: zodResolver(checkoutFormSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: TCheckoutFormSchema) => {
        setSubmitting(true);
        try {
            const url = await createOrder(data);
            toast.success('Заказ успешно оформлен! Переход на оплату...');

            if (url) {
                location.href = url;
            }
        } catch (error) {
            toast.error('Не удалось создать заказ');
            console.error(error);
            setSubmitting(false);
        }
    };

    return (
        <Container className="mt-10">
            <Title
                text="Оформление заказа"
                className="font-extrabold mb-8 text-[34px]"
            />
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                items={items}
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                loading={loading}
                            />
                            <CheckoutForm
                                className={
                                    loading
                                        ? 'opacity-40 pointer-events-none'
                                        : ''
                                }
                            />
                            <CheckoutAddress
                                className={
                                    loading
                                        ? 'opacity-40 pointer-events-none'
                                        : ''
                                }
                            />
                        </div>
                        <div className="w-[450px]">
                            <CheckoutRightBlock
                                totalPrice={totalPrice}
                                totalAmount={totalAmount}
                                DELIVERY_PRICE={DELIVERY_PRICE}
                                loading={loading}
                                submit={submitting}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
};

export default CheckoutPage;
