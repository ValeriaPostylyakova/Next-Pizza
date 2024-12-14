import { instance } from './axios';
import { CartDTO } from './dto/cart-dto';

export const fetchCartItems = async (): Promise<CartDTO> => {
    return (await instance.get<CartDTO>('/cart')).data;
};
