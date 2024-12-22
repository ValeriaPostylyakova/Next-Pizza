import { FC } from 'react';

interface EmailTemplateProps {
    orderId: number;
    totalAmount: number;
    payUrl: string;
}

export const EmailTemplate: FC<Readonly<EmailTemplateProps>> = ({
    orderId,
    totalAmount,
    payUrl,
}) => (
    <div>
        <h1>Заказ #{orderId}</h1>
        <p>
            Необходимо оплатить заказ на сумму <b>{totalAmount} ₽</b>. <br />
            Перейдите по ссылке для оплаты {payUrl}
        </p>
    </div>
);
