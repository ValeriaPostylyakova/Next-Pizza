import { ArrowRight, Package, Truck } from 'lucide-react';
import { FC } from 'react';
import { Button, Skeleton } from '../ui';
import { CheckoutItemDetails } from './checkout-item-details';
import { WhiteBlock } from './white-block';

export interface Props {
    loading?: boolean;
    totalPrice: number;
    totalAmount: number;
    DELIVERY_PRICE: number;
}

export const CheckoutRightBlock: FC<Props> = ({
    totalAmount,
    totalPrice,
    DELIVERY_PRICE,
    loading,
}) => {
    return (
        <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого:</span>
                {loading ? (
                    <Skeleton className="h-11 w-" />
                ) : (
                    <span className="h-11 text-[34px] font-extrabold mb-10">
                        {totalPrice} ₽
                    </span>
                )}
            </div>
            <CheckoutItemDetails
                title={
                    <div className="flex items-center gap-1">
                        <Package size={18} className="mr-2 text-gray-400" />
                        Стоиомость корзины:
                    </div>
                }
                value={totalAmount}
                loading={loading}
            />

            <CheckoutItemDetails
                title={
                    <div className="flex items-center gap-1">
                        <Truck size={18} className="mr-2 text-gray-400" />
                        Стоимость доставки:
                    </div>
                }
                value={DELIVERY_PRICE}
                loading={loading}
            />

            <Button
                type="submit"
                className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
            >
                Перейти к оплате
                <ArrowRight className="w-5 ml-2" />
            </Button>
        </WhiteBlock>
    );
};
