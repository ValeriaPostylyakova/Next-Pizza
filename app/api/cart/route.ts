import { prisma } from '@/prisma/prisma-client';
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';
import { CreateCartItemValues } from '@/shared/services/dto/cart-dto';
import { NextRequest, NextResponse } from 'next/server';

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

        const userCart = await findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemValues;

        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart?.id,
                productItemId: data.productItemId,
                ingredients: {
                    every: {
                        id: { in: data.ingredients },
                    },
                },
            },
            orderBy: {
                createAt: 'desc',
            },
        });

        // Если товар был найден, делаем +1
        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id,
                },
                data: {
                    quanty: findCartItem.quanty + 1,
                },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart?.id,
                    productItemId: data.productItemId,
                    quanty: 1,
                    ingredients: {
                        connect: data.ingredients?.map((id) => ({ id })),
                    },
                },
            });
        }

        const updatedUserCart = await updateCartTotalAmount(token);

        const resp = NextResponse.json(updatedUserCart);
        resp.cookies.set('token', token);
        return resp;
    } catch (error) {
        console.log('[CART_POST] Server error', error);
        return NextResponse.json(
            { message: 'Не удалось создать корзину' },
            { status: 500 }
        );
    }
}
