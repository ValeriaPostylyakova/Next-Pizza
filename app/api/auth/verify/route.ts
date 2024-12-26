import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const code = req.nextUrl.searchParams.get('code');

        if (!code) {
            return NextResponse.json({ error: 'Код не найден' });
        }

        const verifyCode = await prisma.verificationCode.findFirst({
            where: {
                code,
            },
        });

        if (!verifyCode) {
            return NextResponse.json({ error: 'Неверный код' });
        }

        await prisma.user.update({
            where: {
                id: verifyCode.userId,
            },
            data: {
                verify: new Date(),
            },
        });

        await prisma.verificationCode.delete({
            where: {
                id: verifyCode.id,
            },
        });

        return NextResponse.redirect(new URL('/?verified', req.url));
    } catch (err) {
        console.error(err);
    }
}
