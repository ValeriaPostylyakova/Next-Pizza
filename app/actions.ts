'use server';

import { prisma } from '@/prisma/prisma-client';
import { TCheckoutFormSchema } from '@/shared/components/shared/checkout/checkout-form-schema';
import { EmailTemplate } from '@/shared/components/shared/email-temaples/prepare-order';
import { sendEmail } from '@/shared/lib/send-email';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';

export async function createOrder(data: TCheckoutFormSchema) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            throw new Error('Cart token not found');
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                token,
            },
            include: {
                user: true,
                cartItems: {
                    include: {
                        ingredients: true,
                        productVariation: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });

        if (!userCart) {
            throw new Error('Cart not found');
        }

        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty');
        }

        const order = await prisma.order.create({
            data: {
                token,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                adress: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENGIND,
                items: JSON.stringify(userCart.cartItems),
            },
        });

        await prisma.cart.update({
            data: {
                totalAmount: 0,
            },
            where: {
                id: userCart.id,
            },
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        });

        await sendEmail(
            data.email,
            'Next Pizza | Оплата заказа',
            EmailTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                payUrl: 'https://resend.com/docs/send-with-nextjs',
            })
        );
    } catch (err) {
        console.error(err);
    }
}
