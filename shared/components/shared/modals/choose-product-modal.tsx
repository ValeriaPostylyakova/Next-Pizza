'use client';

import { IProduct } from '@/@types/product';
import { Dialog } from '@/shared/components/ui';
import { DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store/cart';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import toast from 'react-hot-toast';
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
    const loading = useCartStore((state) => state.loading);
    const isPizzaForm = Boolean(firstProduct.pizzaType);

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            if (isPizzaForm) {
                await addCartItem({
                    productItemId: productItemId,
                    ingredients,
                });
            } else {
                await addCartItem({
                    productItemId: firstProduct.id,
                });
            }

            toast.success('Товар добавлен в корзину');
            router.back();
        } catch (err) {
            console.error(err);
            toast.error('Не удалось добавить товар в корзину');
        }
    };

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
                        onClickAdd={onSubmit}
                        loading={loading}
                    />
                ) : (
                    <ChooseProductForm
                        name={product.name}
                        imageUrl={product.imageUrl}
                        onClickAdd={onSubmit}
                        price={firstProduct.price}
                        loading={loading}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
