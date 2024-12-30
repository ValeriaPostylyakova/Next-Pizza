import { IProduct } from '@/@types/product';
import { Title } from '@/shared/components/shared/title';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { Ingredient } from '@prisma/client';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
    id: number;
    className?: string;
    imageUrl: string;
    name: string;
    price?: number;
    count?: number;
    product: IProduct;
    ingredients?: Ingredient[];
    description: string | null;
}

export const ProductCard: FC<Props> = ({
    id,
    imageUrl,
    name,
    price,
    className,
    ingredients,
    description,
    product,
}) => {
    return (
        <div
            className={cn(
                'flex bg-white h-[485px] p-5 gap-6 relative',
                className
            )}
        >
            <Link href={`/product/${id}`}>
                <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                    <img
                        src={imageUrl}
                        className="w-[215px] h-[215px]"
                        alt="product"
                    />
                </div>

                <div>
                    <Title
                        text={name}
                        size="sm"
                        className="mb-1 mt-3 font-bold"
                    />
                    <p className="text-sm text-gray-400">
                        {ingredients?.map((item) => item.name).join(', ') ||
                            description}
                    </p>
                    <div className="absolute z-10 bottom-0">
                        <div className="flex items-center justify-between">
                            {product.description !== null ? (
                                <span className="text=[30px] mr-14">
                                    <b>{price} ₽</b>
                                </span>
                            ) : (
                                <span className="text=[30px] mr-14">
                                    от <b>{price} ₽</b>
                                </span>
                            )}
                            <Button
                                variant="secondary"
                                className="text-base font-bold"
                            >
                                <Plus size={20} className="mr-1" />
                                Добавить
                            </Button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
