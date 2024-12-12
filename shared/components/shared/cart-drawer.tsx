'use client';

import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/shared/components/ui/sheet';
import { getCartItemDetails } from '@/shared/hooks/get-cart-item-details';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { Button } from '../ui';
import { CartDrawerItem } from './cart-drawer-item';

interface Props {
    className?: string;
    children: ReactNode;
}

export const CartDrawer: FC<Props> = ({ className, children }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <SheetHeader>
                    <SheetTitle>
                        В корзине
                        <span className="font-bold">3 товара</span>
                    </SheetTitle>
                </SheetHeader>

                <div className="-mx-6 mt-5 overflow-auto flex-1">
                    <div className="mb-2">
                        <CartDrawerItem
                            id={1}
                            imageUrl={
                                'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp'
                            }
                            details={getCartItemDetails(2, 30, [
                                {
                                    id: 1,
                                    name: 'Цыпленок',
                                },
                                {
                                    id: 2,
                                    name: 'Mоцарелла',
                                },
                            ])}
                            name={'Пепперони фреш'}
                            price={350}
                            quantity={1}
                        />
                    </div>
                </div>

                <SheetFooter className="-mx-6 bg-white p-8">
                    <div className="w-full">
                        <div className="flex mb-4">
                            <span className="flex flex-1 text-lg text-neutral-500">
                                Итого
                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                            </span>

                            <span className="font-bold text-lg">1000 ₽</span>
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
