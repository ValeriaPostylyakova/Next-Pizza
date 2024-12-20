'use client';
import { Container, Title, WhiteBlock } from '@/shared/components/shared';
import { CheckoutCartBlock } from '@/shared/components/shared/checkout-cart-block';
import { CheckoutRightBlock } from '@/shared/components/shared/checkout-right-block';
import { Input, Textarea } from '@/shared/components/ui';
import { useCart } from '@/shared/hooks';

const CheckoutPage = () => {
    const {
        items,
        totalAmount,
        addCartItem,
        removeCartItem,
        updateQuantity,
        loading,
    } = useCart();

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

    return (
        <Container className="mt-10">
            <Title
                text="Оформление заказа"
                className="font-extrabold mb-8 text-[34px]"
            />
            <div className="flex gap-10">
                <div className="flex flex-col gap-10 flex-1 mb-20">
                    <CheckoutCartBlock
                        loading={loading}
                        items={items}
                        onClickCountButton={onClickCountButton}
                        removeCartItem={removeCartItem}
                    />
                    <WhiteBlock title="2. Персональные данные">
                        <div className="grid grid-cols-2 gap-5">
                            <Input
                                name="firstName"
                                className="text-base"
                                placeholder="Имя"
                            />
                            <Input
                                name="lastName"
                                className="text-base"
                                placeholder="Фамилия"
                            />
                            <Input
                                name="email"
                                className="text-base"
                                placeholder="E-Mail"
                            />
                            <Input
                                name="phone"
                                className="text-base"
                                placeholder="Телефон"
                            />
                        </div>
                    </WhiteBlock>
                    <WhiteBlock title="3. Адрес доставки">
                        <div className="flex flex-col gap-5">
                            <Input
                                name="lastName"
                                className="text-base"
                                placeholder="Адрес"
                            />
                            <Textarea
                                rows={5}
                                className="text-base"
                                placeholder="Комментарий к заказу"
                            />
                        </div>
                    </WhiteBlock>
                </div>
                <div className="w-[450px]">
                    <CheckoutRightBlock
                        totalPrice={totalPrice}
                        totalAmount={totalAmount}
                        DELIVERY_PRICE={DELIVERY_PRICE}
                    />
                </div>
            </div>
        </Container>
    );
};

export default CheckoutPage;
