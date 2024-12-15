import { instance } from './axios';
import { CartDTO } from './dto/cart-dto';

export const fetchCartItems = async (): Promise<CartDTO> => {
    return (await instance.get<CartDTO>('/cart')).data;
};

export const updateItemQuanty = async (
    id: number,
    quanty: number
): Promise<CartDTO> => {
    const { data } = await instance.patch<CartDTO>('/cart/' + id, {
        quanty,
    });

    return data;
};

export const fetchRemoveCartItem = async (id: number): Promise<CartDTO> => {
    return (await instance.delete<CartDTO>('/cart/' + id)).data;
};
