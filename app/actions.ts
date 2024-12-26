'use server';

import { prisma } from '@/prisma/prisma-client';
import { TCheckoutFormSchema } from '@/shared/components/shared/checkout/checkout-form-schema';
import { EmailTemplate } from '@/shared/components/shared/email-temaples/prepare-order';
import { VerificationUserTemplate } from '@/shared/components/shared/email-temaples/verification-user';
import { createPayment } from '@/shared/lib/create-payment';
import { getUserSession } from '@/shared/lib/get-user-session';
import { sendEmail } from '@/shared/lib/send-email';
import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
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

        const paymentData = await createPayment({
            amount: Number(order.totalAmount + 250),
            orderId: order.id,
            description: 'Оплата заказа #' + order.id,
        });

        if (!paymentData) {
            throw new Error('Payment error');
        }

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id,
            },
        });

        const paymentUrl = paymentData.confirmation.confirmation_url;

        await sendEmail(
            data.email,
            'Next Pizza | Оплата заказа',
            EmailTemplate({
                orderId: order.id,
                totalAmount: Number(order.totalAmount + 250),
                payUrl: paymentUrl,
            })
        );

        return paymentUrl;
    } catch (err) {
        console.error(err);
    }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error('User not found');
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            },
        });

        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                fullName: body.fullName ? body.fullName : findUser?.fullName,
                email: body.email,
                password: body.password
                    ? hashSync(body.password as string, 10)
                    : findUser?.password,
            },
        });
    } catch (err) {
        console.error(err);
    }
}

export async function registerUser(body: any) {
    try {
        const findUser = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (findUser) {
            if (!findUser.verify) {
                throw new Error('Почта не подтверждена');
            }

            throw new Error('Пользователь существует');
        }

        const createUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password as string, 10),
                role: 'USER',
            },
        });

        const code = Math.floor(100000 + Math.random() * 90000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createUser.id,
            },
        });

        await sendEmail(
            createUser.email,
            'Next Pizza | Подтверждение регистрации',
            VerificationUserTemplate({
                code,
            })
        );
    } catch (err) {
        console.error(err);
    }
}
