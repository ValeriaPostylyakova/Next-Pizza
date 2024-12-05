'use client';

import { Api } from '@/services/api-client';
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
            .then((res) => setItems(res))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return { items, loading };
};
