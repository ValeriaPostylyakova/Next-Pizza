import { prisma } from '@/prisma/prisma-client';
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart';
import { CreateCartItemValues } from '@/shared/services/dto/cart-dto';
import { NextRequest, NextResponse } from 'next/server';
import { updateCartTotalAmount } from './../../../shared/lib/update-cart-total-amount';

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({
                cart: [],
            });
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        token,
                    },
                ],
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

        return NextResponse.json(userCart);
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('token')?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemValues;

        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
                ingredients: { every: { id: { in: data.ingredients } } },
            },
        });

        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id,
                },
                data: {
                    quanty: findCartItem.quanty + 1,
                },
            });
        }

        if (!findCartItem) {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productItemId,
                    quanty: 1,
                    ingredients: {
                        connect: data.ingredients?.map((id) => ({ id })),
                    },
                },
            });
        }

        const updatedUserCart = updateCartTotalAmount(token);
        const response = NextResponse.json(updatedUserCart);
        response.cookies.set('token', token);
        return response;
    } catch (error) {
        console.log('CART_POST', error);
        return NextResponse.json({
            message: 'Ошибка при создании корзины',
            status: 500,
        });
    }
}

// export async function DELETE(req: NextRequest) {
//     try {
//         const token = req.cookies.get('token')?.value;

//         if (!token) {
//             return NextResponse.json({
//                 message: 'Токен не найден',
//                 status: 401,
//             });
//         }

//         const data = (await req.json()) as { id: number };

//         const cartItem = await prisma.cartItem.findFirst({
//             where: {
//                 id: data.id,
//             },
//         });

//         if (!cartItem) {
//             return NextResponse.json({
//                 message: 'Товар не найден',
//                 status: 500,
//             });
//         }

//         await prisma.cartItem.delete({
//             where: {
//                 id: data.id,
//             },
//         });

//         const updatedUserCart = updateCartTotalAmount(token);
//         return NextResponse.json(updatedUserCart);
//     } catch (error) {
//         console.log('CART_DELETE', error);
//         return NextResponse.json({
//             message: 'Ошибка при удалении товара',
//             status: 500,
//         });
//     }
// }
