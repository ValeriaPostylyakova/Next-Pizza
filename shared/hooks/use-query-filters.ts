import { PriceProps } from '@/shared/components/shared/filters';
import { useRouter } from 'next/navigation';
import QueryString from 'qs';
import { useEffect } from 'react';

interface QueryFiltersProps {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedId: Set<string>;
    price: PriceProps;
}

export const useQueryFilters = (params: QueryFiltersProps) => {
    const router = useRouter();
    useEffect(() => {
        const filters = {
            ...params.price,
            sizes: Array.from(params.sizes),
            pizzaTypes: Array.from(params.pizzaTypes),
            ingredients: Array.from(params.selectedId),
        };
        const query = QueryString.stringify(filters, {
            arrayFormat: 'comma',
        });

        router.push(`?${query}`, { scroll: false });
    }, [params, router]);
};
