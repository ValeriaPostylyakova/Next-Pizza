import { prisma } from '@/prisma/prisma-client';
import { Container } from '@/shared/components/shared';
import { ChooseForm } from '@/shared/components/shared/modals/choose-form';
import { notFound } from 'next/navigation';

const ProductPage = async ({ params: { id } }: { params: { id: string } }) => {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            ingredients: true,
            variations: true,
        },
    });

    // category: {
    //     include: {
    //         products: {
    //             include: {
    //                 variations: true,
    //             },
    //         },
    //     },
    // },

    if (!product) notFound();

    return (
        <Container className="flex flex-col my-10">
            <ChooseForm product={product} />
        </Container>
    );
};

export default ProductPage;
