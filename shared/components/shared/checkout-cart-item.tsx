'use client';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { FC } from 'react';
import { CartItemDetailsCountButton } from './cart-item-details/cart-item-details-count-button';
import { CartItemDetailsImage } from './cart-item-details/cart-item-details-image';
import { CartItemDetailsPrice } from './cart-item-details/cart-item-details-price';
import { CartItemInfo } from './cart-item-details/cart-item-info';

export interface Props {
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
    details: string;
    className?: string;
    disabled?: boolean;
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    onClickRemove?: () => void;
}

export const CheckoutCartItem: FC<Props> = ({
    name,
    price,
    imageUrl,
    quantity,
    details,
    className,
    disabled,
    onClickCountButton,
    onClickRemove,
}) => {
    return (
        <div
            className={cn(
                'mb-4 flex items-center justify-between',
                {
                    'opacity-50 pointer-events-none': disabled,
                },
                className
            )}
        >
            <div className="flex items-center gap-5 flex-1">
                <CartItemDetailsImage src={imageUrl} />
                <CartItemInfo name={name} details={details} />
            </div>

            <CartItemDetailsPrice value={price} />

            <div className="flex items-center gap-5 ml-20">
                <CartItemDetailsCountButton
                    onClick={onClickCountButton}
                    value={quantity}
                />
                <button onClick={onClickRemove} type="button">
                    <X
                        className="text-gray-400 cursor-pointer hover:text-gray-600"
                        size={20}
                    />
                </button>
            </div>
        </div>
    );
};
