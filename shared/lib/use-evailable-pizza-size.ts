'use client';

import { ProductVariation } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';
import { Variant } from '../components/shared/group-variants';
import { PizzaSize, PizzaType } from '../constants/prisma';
import { getAvailablePizzaSizes } from './available-pizza-sizes';

interface ReturnProps {
    sizes: PizzaSize;
    types: PizzaType;
    selectedIngedients: Set<number>;
    currentItemId: number;
    setSizes: (size: PizzaSize) => void;
    setTypes: (type: PizzaType) => void;
    toggle: (id: number) => void;
    availablePizzaSizes: Variant[];
}

export const useEvailablePizzaSize = (
    variation: ProductVariation[]
): ReturnProps => {
    const [sizes, setSizes] = useState<PizzaSize>(20);
    const [types, setTypes] = useState<PizzaType>(1);

    const availablePizzaSizes = getAvailablePizzaSizes(variation, types);
    const currentItemId =
        variation.find(
            (variation) =>
                variation.size === sizes && variation.pizzaType === types
        )?.id || 0;

    const [selectedIngedients, { toggle }] = useSet<number>(new Set([]));

    useEffect(() => {
        const anableSize = availablePizzaSizes?.find((item) => !item.disabled);

        if (anableSize) {
            setSizes(Number(anableSize.value) as PizzaSize);
        }
    }, [types]);

    return {
        sizes,
        types,
        setSizes,
        setTypes,
        selectedIngedients,
        toggle,
        availablePizzaSizes,
        currentItemId,
    };
};
