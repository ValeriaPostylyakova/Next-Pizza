'use client';

import { useEffect, useState } from 'react';
import { Ingredient } from '@prisma/client';
import { Api } from '@/services/api-client';

export const useFilterIngredients = () => {
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
