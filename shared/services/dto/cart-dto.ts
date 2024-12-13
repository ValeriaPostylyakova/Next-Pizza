import {
    Cart,
    CartItem,
    Ingredient,
    Product,
    ProductVariation,
} from '@prisma/client';

export type CartItemDTO = CartItem & {
    productItem: ProductVariation & {
        product: Product;
    };

    ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
    cartItems: CartItemDTO[];
}