import { useEffect } from 'react';
import { CartStateItem } from '../lib/get-cart-details';
import { useCartStore } from '../store/cart';

export interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
    updateQuantity: (id: number, quantity: number) => Promise<void>;
    removeCartItem: (id: number) => Promise<void>;
    addCartItem: (values: any) => Promise<void>;
    loading: boolean;
}

export const useCart = (): ReturnProps => {
    const cartState = useCartStore((state) => state);

    useEffect(() => {
        cartState.fetchCartItems();
    }, []);

    return cartState;
};
