'use client';

import { IProduct } from '@/@types/product';
import { Dialog } from '@/components/ui';
import { DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { ChooseProductForm } from '../choose-product-form';
import { ChoosePizzaForm } from './choose-pizza-form';

interface Props {
    product: IProduct;
    className?: string;
}
export const ChooseProductModal: FC<Props> = ({ className, product }) => {
    const router = useRouter();

    const isPizzaForm = Boolean(product.variations[0].pizzaType);

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className
                )}
            >
                {isPizzaForm ? (
                    <ChoosePizzaForm
                        name={product.name}
                        imageUrl={product.imageUrl}
                        ingredients={[]}
                    />
                ) : (
                    <ChooseProductForm
                        name={product.name}
                        imageUrl={product.imageUrl}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
