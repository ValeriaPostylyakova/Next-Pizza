import { prisma } from '@/prisma/prisma-client';

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    pizzaTypes?: string;
    sizes?: string;
    priceFrom?: string;
    priceTo?: string;
    ingredients?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
    const sizes = params.sizes?.split(',').map(Number);
    const pizzaType = params.pizzaTypes?.split(',').map(Number);
    const ingredientsArr = params.ingredients?.split(',').map(Number);

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    const categories = await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: 'desc',
                },
                where: {
                    ingredients: ingredientsArr
                        ? {
                              some: {
                                  id: {
                                      in: ingredientsArr,
                                  },
                              },
                          }
                        : undefined,
                    variations: {
                        some: {
                            size: {
                                in: sizes,
                            },
                            pizzaType: {
                                in: pizzaType,
                            },
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        },
                    },
                },
                include: {
                    ingredients: true,
                    variations: {
                        orderBy: {
                            price: 'asc',
                        },
                        where: {
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        },
                    },
                },
            },
        },
    });

    return categories;
};
