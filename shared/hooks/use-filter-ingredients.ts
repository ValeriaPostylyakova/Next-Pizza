'use client';

import { Api } from '@/shared/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';

interface ReturnProps {
    items: Ingredient[];
    loading: boolean;
}

export const useFilterIngredients = (): ReturnProps => {
    const [items, setItems] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        Api.ingredients
            .getAll()
            .then((res: Ingredient[]) => setItems(res))
            .catch((err: Error) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return { items, loading };
};
