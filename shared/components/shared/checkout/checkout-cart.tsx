import { PizzaSize, PizzaType } from '@/shared/constants/prisma';
import { getCartItemDetails } from '@/shared/hooks/get-cart-item-details';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { FC } from 'react';
import { Skeleton } from '../../ui';
import { CheckoutCartItem } from '../checkout-cart-item';
import { WhiteBlock } from '../white-block';

export interface Props {
    className?: string;
    items: CartStateItem[];
    loading?: boolean;
    onClickCountButton: (
        id: number,
        quantity: number,
        type: 'plus' | 'minus'
    ) => void;
    removeCartItem: (id: number) => void;
}

export const CheckoutCart: FC<Props> = ({
    className,
    items,
    loading,
    onClickCountButton,
    removeCartItem,
}) => {
    return (
        <WhiteBlock className={className} title="1. Корзина">
            <div className="flex flex-col gap-5">
                {loading &&
                    [...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-10 rounded-sm" />
                    ))}
                {!loading &&
                    items.length > 0 &&
                    items.map((item) => (
                        <CheckoutCartItem
                            key={item.id}
                            name={item.name}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            quantity={item.quantity}
                            details={getCartItemDetails(
                                item.pizzaType as PizzaType,
                                item.pizzaSize as PizzaSize,
                                item.ingredients
                            )}
                            disabled={loading}
                            onClickCountButton={(type) =>
                                onClickCountButton(item.id, item.quantity, type)
                            }
                            onClickRemove={() => removeCartItem(item.id)}
                        />
                    ))}
            </div>
        </WhiteBlock>
    );
};
