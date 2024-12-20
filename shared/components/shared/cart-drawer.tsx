'use client';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/shared/components/ui/sheet';
import { PizzaSize, PizzaType } from '@/shared/constants/prisma';
import { useCart } from '@/shared/hooks';
import { getCartItemDetails } from '@/shared/hooks/get-cart-item-details';
import { useCartItemsText } from '@/shared/hooks/use-cart-items-text';
import { cn } from '@/shared/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { Button } from '../ui';
import { CartDrawerItem } from './cart-drawer-item';
import { Title } from './title';

interface Props {
    children: ReactNode;
}

export const CartDrawer: FC<Props> = ({ children }) => {
    const { updateQuantity, totalAmount, items, removeCartItem } = useCart();

    const onClickCountButton = (
        id: number,
        quanty: number,
        type: 'plus' | 'minus'
    ) => {
        const newQuanty = type === 'plus' ? quanty + 1 : quanty - 1;
        updateQuantity(id, newQuanty);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <div
                    className={cn(
                        'flex flex-col h-full',
                        !totalAmount && 'justify-center'
                    )}
                >
                    {totalAmount > 0 && (
                        <SheetHeader>
                            <SheetTitle>
                                В корзине
                                <span className="font-bold ml-1">
                                    {useCartItemsText(items)}
                                </span>
                            </SheetTitle>
                        </SheetHeader>
                    )}

                    {!totalAmount && (
                        <div className="grid place-items-center w-72 mx-auto">
                            <img
                                src="/assets/images/empty-box.png"
                                alt="Empty cart"
                                width={120}
                                height={120}
                            />
                            <Title
                                size="sm"
                                text="Корзина пустая"
                                className="text-center font-bold my-2"
                            />
                            <p className="text-center text-neutral-500 mb-5">
                                Добавьте хотя бы одну пиццу, чтобы совершить
                                заказ
                            </p>

                            <SheetClose>
                                <Button
                                    className="w-56 h-12 text-base"
                                    size="lg"
                                >
                                    <ArrowLeft className="w-5 mr-2" />
                                    Вернуться назад
                                </Button>
                            </SheetClose>
                        </div>
                    )}

                    {totalAmount > 0 && (
                        <>
                            <div className="-mx-6 mt-5 overflow-auto flex-1">
                                <div className="mb-2">
                                    {items.map((item) => (
                                        <CartDrawerItem
                                            disabled={item.disabled}
                                            key={item.id}
                                            id={item.id}
                                            imageUrl={item.imageUrl}
                                            details={getCartItemDetails(
                                                item.pizzaType as PizzaType,
                                                item.pizzaSize as PizzaSize,
                                                item.ingredients
                                            )}
                                            name={item.name}
                                            price={item.price}
                                            quantity={item.quantity}
                                            onClickCountButton={(type) =>
                                                onClickCountButton(
                                                    item.id,
                                                    item.quantity,
                                                    type
                                                )
                                            }
                                            onClickRemove={() =>
                                                removeCartItem(item.id)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>

                            <SheetFooter className="-mx-6 bg-white p-8">
                                <div className="w-full">
                                    <div className="flex mb-4">
                                        <span className="flex flex-1 text-lg text-neutral-500">
                                            Итого
                                            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                        </span>

                                        <span className="font-bold text-lg">
                                            {totalAmount} ₽
                                        </span>
                                    </div>

                                    <Link href="/cart">
                                        <Link href="/checkout">
                                            <Button
                                                type="submit"
                                                className="w-full h-12 text-base"
                                            >
                                                Оформить заказ
                                                <ArrowRight className="w-5 ml-2" />
                                            </Button>
                                        </Link>
                                    </Link>
                                </div>
                            </SheetFooter>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};
