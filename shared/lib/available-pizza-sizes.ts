import { ProductVariation } from '@prisma/client';
import { pizzaSizes, PizzaType } from '../constants/prisma';

export const getAvailablePizzaSizes = (
    variation: ProductVariation[],
    types: PizzaType
) => {
    const availablePizzaTypes = variation.filter(
        (item) => item.pizzaType === types
    );

    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !availablePizzaTypes.some(
            (pizza) => Number(pizza.size) === Number(item.value)
        ),
    }));
};
