import { prisma } from '@/prisma/prisma-client';
import {
    Container,
    GroupVariants,
    ProductImage,
    Title,
} from '@/shared/components/shared';
import { notFound } from 'next/navigation';

const ProductPage = async ({ params: { id } }: { params: { id: string } }) => {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id),
        },
    });

    if (!product) notFound();

    return (
        <Container className="flex flex-col my-10">
            <div className="flex flex-1">
                <ProductImage imageUrl={product.imageUrl} size={30} />
                <div className="w-[490px] bg-[#f7f6f5] p-7">
                    <Title
                        text={product.name}
                        size="md"
                        className="font-extrabold m-1"
                    />
                    <p className="text-gray-400">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Consequuntur, quae!
                    </p>
                    <GroupVariants
                        items={[
                            { name: 'Маленькая', value: '1', disabled: true },
                            { name: 'Средняя', value: '2' },
                            { name: 'Большая', value: '3' },
                        ]}
                        value="2"
                    />
                </div>
            </div>
        </Container>
    );
};

export default ProductPage;
