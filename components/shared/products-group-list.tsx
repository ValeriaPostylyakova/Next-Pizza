'use client';

import { cn } from '@/lib/utils';
import { FC, useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';

import { useCategoryStore } from '@/store/category';
import { ProductCard } from './product-card';
import { Title } from './title';

interface Props {
    title: string;
    items: any[];
    className?: string;
    listClassName?: string;
    categoryId: number;
}

export const ProductsGroupList: FC<Props> = ({
    title,
    items,
    className,
    listClassName,
    categoryId,
}) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = useRef<HTMLDivElement | null>(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [categoryId, intersection?.isIntersecting, title]);

    return (
        <div id={title} ref={intersectionRef} className={className}>
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
                        imageUrl={item.imageUrl}
                        price={item.variations[0].price}
                    />
                ))}
            </div>
        </div>
    );
};
