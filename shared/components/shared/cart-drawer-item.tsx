import { cn } from '@/shared/lib/utils';
import { Trash2Icon } from 'lucide-react';
import { FC } from 'react';
import * as CartItem from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';

interface Props extends CartItemProps {
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    onClickRemove?: () => void;
    disabled?: boolean;
    className?: string;
}

export const CartDrawerItem: FC<Props> = ({
    className,
    imageUrl,
    name,
    price,
    details,
    quantity,
    onClickCountButton,
    onClickRemove,
    disabled,
}) => {
    return (
        <div
            className={cn(
                'flex bg-white p-5 gap-6 mb-2',
                { 'opacity-50 pointer-events-none': disabled },
                className
            )}
        >
            <CartItem.Image src={imageUrl} />

            <div className="flex-1">
                <CartItem.Info name={name} details={details} />

                <hr className="my-3" />

                <div className="flex items-center justify-between">
                    <CartItem.CountButton
                        onClick={onClickCountButton}
                        value={quantity}
                    />

                    <div className="flex items-center gap-3">
                        <CartItem.Price value={price} />
                        <Trash2Icon
                            onClick={onClickRemove}
                            className="text-gray-400 cursor-pointer hover:text-gray-600"
                            size={16}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
