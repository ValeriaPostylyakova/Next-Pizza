import { create } from 'zustand';
import { CartStateItem, getCartDetails } from '../lib/get-cart-details';
import { Api } from '../services/api-client';
import { CreateCartItemValues } from '../services/dto/cart-dto';

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];
    fetchCartItems: () => Promise<void>;
    updateQuantity: (id: number, quantity: number) => Promise<void>;
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
    updateQuantity: async (id: number, quanty: number) => {
        try {
            set({ loading: true, error: false });
            await Api.cart
                .updateItemQuanty(id, quanty)
                .then((res) => set(getCartDetails(res)));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    addCartItem: async (values: CreateCartItemValues) => {
        try {
            set({ loading: true, error: false });
            await Api.cart
                .addCartItem(values)
                .then((res) => set(getCartDetails(res)));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    removeCartItem: async (id: number) => {
        try {
            set({ loading: true, error: false });
            await Api.cart
                .fetchRemoveCartItem(id)
                .then((res) => set(getCartDetails(res)));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
}));
