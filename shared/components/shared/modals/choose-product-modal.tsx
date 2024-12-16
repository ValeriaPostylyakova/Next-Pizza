'use client';

import { IProduct } from '@/@types/product';
import { Dialog } from '@/shared/components/ui';
import { DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store/cart';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
    product: IProduct;
    className?: string;
}
export const ChooseProductModal: FC<Props> = ({ className, product }) => {
    const router = useRouter();
    const firstProduct = product.variations[0];
    const addCartItem = useCartStore((state) => state.addCartItem);
    const isPizzaForm = Boolean(firstProduct.pizzaType);

    const onAddProduct = () => {
        addCartItem({
            productId: firstProduct.id,
        });
    };

    const onAddPizza = () => {};

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
                        variation={product.variations}
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
