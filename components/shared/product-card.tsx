import { FC } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import { Title } from '@/components/shared/title';

interface Props {
    id: number;
    className?: string;
    imageUrl: string;
    name: string;
    price?: number;
    count?: number;
}

export const ProductCard: FC<Props> = ({
    id,
    imageUrl,
    name,
    price,
    className,
}) => {
    return (
        <div className={cn('flex bg-white min-h-36 p-5 gap-6', className)}>
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
                        Цыпленок, моцарелла, сыры чеддер и пармезан, Цыпленок,
                        моцарелла, сыры чеддер и пармезан
                    </p>
                    <hr className="my-3" />

                    <div className="flex items-center justify-between">
                        <span className="text=[30px]">
                            от <b>{price} ₽</b>
                        </span>
                        <Button
                            variant="secondary"
                            className="text-base font-bold"
                        >
                            <Plus size={20} className="mr-1" />
                            Добавить
                        </Button>
                    </div>
                </div>
            </Link>
        </div>
    );
};
