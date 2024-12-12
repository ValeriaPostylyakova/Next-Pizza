import { prisma } from '@/prisma/prisma-client';
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
