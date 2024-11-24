import { instance } from '@/services/axios';
import { Ingredient } from '@prisma/client';
import { ApiRoutes } from '@/services/constants';

export const getAll = async (): Promise<Ingredient[]> => {
    const { data } = await instance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);
    return data;
};
