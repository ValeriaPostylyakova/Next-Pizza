import { PizzaSize, PizzaType } from '@/shared/constants/prisma';
import { getCartItemDetails } from '@/shared/hooks/get-cart-item-details';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { FC } from 'react';
import { CheckoutCartItem } from './checkout-cart-item';
import { WhiteBlock } from './white-block';

export interface Props {
    loading: boolean;
    onClickCountButton?: (type: 'plus' | 'minus') => void;
    removeCartItem?: () => void;
    items: CartStateItem[];
}

export const CheckoutCartBlock: FC<Props> = ({
    loading,
    items,
    onClickCountButton,
    removeCartItem,
}) => {
    return (
        <WhiteBlock title="1. Корзина">
            {items.map((item) => (
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
        </WhiteBlock>
    );
};
