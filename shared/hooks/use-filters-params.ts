import { PriceProps, QueryFilters } from '@/shared/components/shared/filters';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useSet } from 'react-use';

export const useFiltersParams = (values?: string[]) => {
    const searchParams = useSearchParams() as unknown as Map<
        keyof QueryFilters,
        string
    >;
    const [selectedId, { toggle }] = useSet(new Set<string>(values));
    const [sizes, { toggle: setSizes }] = useSet(
        new Set<string>(
            searchParams.has('sizes')
                ? searchParams.get('sizes')?.split(',')
                : []
        )
    );
    const [pizzaTypes, { toggle: setPizzaTypes }] = useSet(
        new Set<string>(
            searchParams.has('pizzaTypes')
                ? searchParams.get('pizzaTypes')?.split(',')
                : []
        )
    );

    const [price, setPrice] = useState<PriceProps>({
        priceFrom: searchParams.has('priceFrom')
            ? Number(searchParams.get('priceFrom'))
            : undefined,
        priceTo: searchParams.has('priceTo')
            ? Number(searchParams.get('priceTo'))
            : undefined,
    });

    const updatePrice = (value: PriceProps) => {
        setPrice(value);
    };

    return useMemo(
        () => ({
            selectedId,
            onToggleId: toggle,
            sizes,
            setSizes,
            pizzaTypes,
            setPizzaTypes,
            price,
            updatePrice,
        }),
        [selectedId, sizes, pizzaTypes, price]
    );
};
