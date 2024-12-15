'use client';

import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/shared/components/ui/sheet';
import { PizzaSize, PizzaType } from '@/shared/constants/prisma';
import { getCartItemDetails } from '@/shared/hooks/get-cart-item-details';
import { useCartItemsText } from '@/shared/hooks/use-cart-items-text';
import { useCartStore } from '@/shared/store/cart';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactNode, useEffect } from 'react';
import { Button } from '../ui';
import { CartDrawerItem } from './cart-drawer-item';

interface Props {
    children: ReactNode;
}

export const CartDrawer: FC<Props> = ({ children }) => {
    const fetchCartItems = useCartStore((state) => state.fetchCartItems);
    const items = useCartStore((state) => state.items);
    const totalAmount = useCartStore((state) => state.totalAmount);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeCartItem = useCartStore((state) => state.removeCartItem);

    useEffect(() => {
        fetchCartItems();
    }, []);

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
                <SheetHeader>
                    <SheetTitle>
                        В корзине
                        <span className="font-bold ml-1">
                            {useCartItemsText(items)}
                        </span>
                    </SheetTitle>
                </SheetHeader>

                <div className="-mx-6 mt-5 overflow-auto flex-1">
                    <div className="mb-2">
                        {items.map((item) => (
                            <CartDrawerItem
                                key={item.id}
                                id={item.id}
                                imageUrl={item.imageUrl}
                                details={
                                    item.pizzaType
                                        ? getCartItemDetails(
                                              item.pizzaType as PizzaType,
                                              item.pizzaSize as PizzaSize,
                                              item.ingredients
                                          )
                                        : ''
                                }
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
                                onClickRemove={() => removeCartItem(item.id)}
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
                            <Button
                                type="submit"
                                className="w-full h-12 text-base"
                            >
                                Оформить заказ
                                <ArrowRight className="w-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
