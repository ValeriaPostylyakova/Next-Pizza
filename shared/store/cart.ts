import { create } from 'zustand';
import { CartStateItem, getCartDetails } from '../lib/get-cart-details';
import { Api } from '../services/api-client';

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    cartItems: CartStateItem[];
    fetchCartItems: () => Promise<void>;
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;
    addCartItem: (values: any) => Promise<void>;
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
    loading: false,
    error: false,
    totalAmount: 0,
    cartItems: [],

    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.fetchCartItems();
            set(getCartDetails(data));
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
