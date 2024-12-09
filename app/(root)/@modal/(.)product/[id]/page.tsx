import { ChooseProductModal } from '@/components/shared/modals/choose-product-modal';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

const ProductModalPage = async ({
    params: { id },
}: {
    params: { id: string };
}) => {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            variations: true,
            ingredients: true,
        },
    });

    if (!product) {
        return notFound();
    }

    return <ChooseProductModal product={product} />;
};

export default ProductModalPage;
