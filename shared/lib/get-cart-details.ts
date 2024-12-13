import { CartDTO } from '../services/dto/cart-dto';
import { calcCartItemPrice } from './calc-cart-item-price';

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    disabled?: boolean;
    pizzaSize?: number | null;
    pizzaType?: number | null;
    ingredients: Array<{ name: string; price: number }>;
};

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.cartItems.map((item) => ({
        id: item.id,
        quantity: item.quanty,
        name: item.productItem.product.name,
        imageUrl: item.productItem.product.imageUrl,
        price: calcCartItemPrice(item),
        pizzaSize: item.productItem.size,
        pizzaType: item.productItem.pizzaType,
        ingredients: item.ingredients.map((ingredient) => ({
            name: ingredient.name,
            price: ingredient.price,
        })),
    }));

    return {
        totalAmount: data.totalAmount,
        items,
    };
};
