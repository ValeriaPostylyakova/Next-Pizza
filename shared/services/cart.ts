import { instance } from './axios';
import { CartItemDTO } from './dto/cart-dto';

export const fetchCartItems = async (): Promise<CartItemDTO> => {
    const { data } = await instance.get<CartItemDTO>('/cart');

    return data;
};
