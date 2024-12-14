import { create } from 'zustand';
import { CartStateItem, getCartDetails } from '../lib/get-cart-details';
import { Api } from '../services/api-client';

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];
    fetchCartItems: () => Promise<void>;
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;
    addCartItem: (values: any) => Promise<void>;
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
    loading: false,
    error: false,
    totalAmount: 0,
    items: [],

    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false });
            await Api.cart
                .fetchCartItems()
                .then((res) => set(getCartDetails(res)));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    updateItemQuantity: async () => {},
    addCartItem: async () => {},
    removeCartItem: async () => {},
}));
