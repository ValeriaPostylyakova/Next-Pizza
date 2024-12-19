'use client';

import { IProduct } from '@/@types/product';
import { Dialog } from '@/shared/components/ui';
import { DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { ChooseForm } from './choose-form';

interface Props {
    product: IProduct;
    className?: string;
}
export const ChooseProductModal: FC<Props> = ({ className, product }) => {
    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className
                )}
            >
                <ChooseForm
                    product={product}
                    onSubmitSuccess={() => router.back()}
                />
            </DialogContent>
        </Dialog>
    );
};
