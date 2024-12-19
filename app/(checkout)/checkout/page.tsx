import { Container, Title, WhiteBlock } from '@/shared/components/shared';
import { CheckoutItemDetails } from '@/shared/components/shared/checkout-item-details';
import { Button, Input, Textarea } from '@/shared/components/ui';
import { ArrowRight, Package, Truck } from 'lucide-react';

const CheckoutPage = () => {
    return (
        <Container className="mt-10">
            <Title
                text="Оформление заказа"
                className="font-extrabold mb-8 text-[34px]"
            />
            <div className="flex gap-10">
                <div className="flex flex-col gap-10 flex-1 mb-20">
                    <WhiteBlock title="1. Корзина">Корзина</WhiteBlock>
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
                    <WhiteBlock className="p-6 sticky top-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xl">Итого:</span>
                            <span className="h-11 text-[34px] font-extrabold mb-10">
                                1300 ₽
                            </span>
                        </div>
                        <CheckoutItemDetails
                            title={
                                <div className="flex items-center gap-1">
                                    <Package
                                        size={18}
                                        className="mr-2 text-gray-400"
                                    />
                                    Стоиомость корзины:
                                </div>
                            }
                            value={1000}
                        />

                        <CheckoutItemDetails
                            title={
                                <div className="flex items-center gap-1">
                                    <Truck
                                        size={18}
                                        className="mr-2 text-gray-400"
                                    />
                                    Стоимость доставки:
                                </div>
                            }
                            value={300}
                        />

                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
                        >
                            Перейти к оплате
                            <ArrowRight className="w-5 ml-2" />
                        </Button>
                    </WhiteBlock>
                </div>
            </div>
        </Container>
    );
};

export default CheckoutPage;
