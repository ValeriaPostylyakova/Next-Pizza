'use client';
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
import { FormProvider, useForm } from 'react-hook-form';

const CheckoutPage = () => {
    const { items, totalAmount, removeCartItem, updateQuantity, loading } =
        useCart();

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

    const onSubmit = (data: TCheckoutFormSchema) => {
        console.log(data);
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
                            <CheckoutForm />
                            <CheckoutAddress />
                        </div>
                        <div className="w-[450px]">
                            <CheckoutRightBlock
                                totalPrice={totalPrice}
                                totalAmount={totalAmount}
                                DELIVERY_PRICE={DELIVERY_PRICE}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
};

export default CheckoutPage;
