import { Cart, CartItem } from '@prisma/client';

interface ReturnProps {
    items: CartItem[];
    totalAmount: number;
}

export const getCartDetails = (data: Cart): ReturnProps => {
    console.log('1111');
};
