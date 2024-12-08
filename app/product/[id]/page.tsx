import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

const ProductPage = async ({ params: { id } }: { params: { id: string } }) => {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id),
        },
    });

    if (!product) notFound();

    return <div>ProductPage {id}</div>;
};

export default ProductPage;
