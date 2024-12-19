'use client';

import { IProduct } from '@/@types/product';
import { useCartStore } from '@/shared/store/cart';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

export interface Props {
    product: IProduct;
    onSubmitSuccess?: () => void;
    cLassName?: string;
}

export const ChooseForm: FC<Props> = ({ product, onSubmitSuccess }) => {
    const addCartItem = useCartStore((state) => state.addCartItem);
    const loading = useCartStore((state) => state.loading);

    const firstProduct = product.variations[0];
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
            onSubmitSuccess?.();
        } catch (err) {
            console.error(err);
            toast.error('Не удалось добавить товар в корзину');
        }
    };

    return (
        <>
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
        </>
    );
};
