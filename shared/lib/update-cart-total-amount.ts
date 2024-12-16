// import { prisma } from '@/prisma/prisma-client';
// import { calcCartItemPrice } from './calc-cart-item-price';

// export const updateCartTotalAmount = async (token: string) => {
//     const userCart = await prisma.cart.findFirst({
//         where: {
//             token,
//         },
//         include: {
//             cartItems: {
//                 include: {
//                     productVariation: {
//                         include: {
//                             product: true,
//                         },
//                     },
//                     ingredients: true,
//                 },
//             },
//         },
//     });

//     if (!userCart) {
//         return;
//     }

//     const totalAmount = userCart.cartItems.reduce((acc, item) => {
//         return acc + calcCartItemPrice(item);
//     }, 0);

//     await prisma.cart.update({
//         where: {
//             id: userCart.id,
//         },
//         data: {
//             totalAmount,
//         },
//         include: {
//             cartItems: {
//                 include: {
//                     productVariation: {
//                         include: {
//                             product: true,
//                         },
//                     },
//                     ingredients: true,
//                 },
//             },
//         },
//     });
// };

import { prisma } from '@/prisma/prisma-client';
import { calcCartItemPrice } from './calc-cart-item-price';

export const updateCartTotalAmount = async (token: string) => {
    const userCart = await prisma.cart.findFirst({
        where: {
            token,
        },
        include: {
            cartItems: {
                orderBy: {
                    createAt: 'desc',
                },
                include: {
                    productVariation: {
                        include: {
                            product: true,
                        },
                    },
                    ingredients: true,
                },
            },
        },
    });

    if (!userCart) {
        return;
    }

    const totalAmount = userCart.cartItems.reduce((acc, item) => {
        return acc + calcCartItemPrice(item);
    }, 0);

    return await prisma.cart.update({
        where: {
            id: userCart.id,
        },
        data: {
            totalAmount,
        },
        include: {
            cartItems: {
                orderBy: {
                    createAt: 'desc',
                },
                include: {
                    productVariation: {
                        include: {
                            product: true,
                        },
                    },
                    ingredients: true,
                },
            },
        },
    });
};
