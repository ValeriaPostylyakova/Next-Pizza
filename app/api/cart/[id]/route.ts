import { prisma } from '@/prisma/prisma-client';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';
import { NextRequest, NextResponse } from 'next/server';

async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const data = (await req.json()) as { quantity: number };
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Токен не найден' });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: Number(id),
            },
        });

        if (!cartItem) {
            return NextResponse.json({ message: 'Товар не найден' });
        }

        await prisma.cartItem.update({
            where: {
                id: Number(id),
            },
            data: {
                quanty: data.quantity,
            },
        });

        const updatedCartUser = await updateCartTotalAmount(token);

        return NextResponse.json(updatedCartUser);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Не удалось обновить корзину' },
            { status: 500 }
        );
    }
}
