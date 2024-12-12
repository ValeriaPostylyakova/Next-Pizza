import { Cart } from '@prisma/client';
import { instance } from './axios';

export const getCart = async (): Promise<Cart> => {
    const { data } = await instance.get<Cart>('/cart');

    return data;
};
