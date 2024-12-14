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
        name: item.productVariation.product.name,
        imageUrl: item.productVariation.product.imageUrl,
        price: calcCartItemPrice(item),
        pizzaSize: item.productVariation.size,
        pizzaType: item.productVariation.pizzaType,
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
