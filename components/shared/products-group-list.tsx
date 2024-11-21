import React from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';
import { cn } from '@/lib/utils';

interface Props {
    title: string;
    items: any[];
    className?: string;
    listClassName?: string;
    categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
    title,
    items,
    className,
    listClassName,
    categoryId,
}) => {
    return (
        <div className={className}>
            <Title
                text={title}
                size="lg"
                className="font-extrabold mb-5 ml-5"
            />
            <div className={cn('grid grid-cols-3 gap-[10px]', listClassName)}>
                {items.map((item) => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        imageUrl="https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp"
                        price={item.items[0].price}
                    />
                ))}
            </div>
        </div>
    );
};
