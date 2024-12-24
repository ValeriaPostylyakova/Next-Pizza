import { CartItemDTO } from '@/shared/services/dto/cart-dto';
import { FC } from 'react';

interface Props {
    orderId: number;
    items: CartItemDTO[];
}

export const OrderSuccessTemplate: FC<Props> = ({ orderId, items }) => (
    <div>
        <h1>Спасибо за покупку! 🎉</h1>

        <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>

        <hr />

        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    {item.productVariation.product.name} |{' '}
                    {item.productVariation.price} ₽ x {item.quanty} шт. ={' '}
                    {item.productVariation.price * item.quanty} ₽
                </li>
            ))}
        </ul>
    </div>
);
