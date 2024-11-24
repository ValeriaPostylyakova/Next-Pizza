import { instance } from '@/services/axios';
import { Product } from '@prisma/client';
import { ApiRoutes } from '@/services/constants';

export const search = async (query: string) => {
    const { data } = await instance.get<Product[]>(
        `${ApiRoutes.SEARCH_PRODUCTS}${query}`
    );

    return data;
};
