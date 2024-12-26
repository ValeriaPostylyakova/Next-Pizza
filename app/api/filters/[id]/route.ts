import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET({ params }: { params: { id: number } }) {
    if (params.id === 1) {
        const category = await prisma.category.findMany({
            include: {
                products: {
                    orderBy: {
                        createAt: 'desc',
                    },
                },
            },
        });
        return NextResponse.json(category);
    }
}
