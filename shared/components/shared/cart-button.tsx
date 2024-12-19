'use client';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store/cart';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { FC } from 'react';
import { Button } from '../ui';
import { CartDrawer } from './cart-drawer';

interface Props {
    className?: string;
}

export const CartButton: FC<Props> = ({ className }) => {
    const items = useCartStore((state) => state.items);
    const loading = useCartStore((state) => state.loading);
    const totalAmount = useCartStore((state) => state.totalAmount);
    return (
        <CartDrawer>
            <Button
                loading={loading}
                className={cn(
                    'group relative',
                    { 'w-[105px]': loading },
                    className
                )}
            >
                <b>{totalAmount} ₽</b>
                <span className="h-full w-[1px] bg-white/30 mx-3" />
                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                    <ShoppingCart
                        size={16}
                        className="relative"
                        strokeWidth={2}
                    />
                    <b>{items.length}</b>
                </div>
                <ArrowRight
                    size={20}
                    className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                />
            </Button>
        </CartDrawer>
    );
};
