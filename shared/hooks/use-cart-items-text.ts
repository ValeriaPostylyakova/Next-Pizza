import { CartStateItem } from '../lib/get-cart-details';

export const useCartItemsText = (items: CartStateItem[]) => {
    const textLength = ' товар';

    if (items.length === 1) {
        return `${items.length} ${textLength}`;
    } else if (items.length > 1 && items.length < 5) {
        return `${items.length} ${textLength}а`;
    } else {
        return `${items.length} ${textLength}ов`;
    }
};
