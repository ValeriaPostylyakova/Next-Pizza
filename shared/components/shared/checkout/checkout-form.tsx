import { FC } from 'react';
import { FormInput } from '../form/form-input';
import { WhiteBlock } from '../white-block';

export interface Props {
    className?: string;
}

export const CheckoutForm: FC<Props> = ({ className }) => {
    return (
        <WhiteBlock className={className} title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
                <FormInput
                    name="firstName"
                    className="text-base"
                    placeholder="Имя"
                />
                <FormInput
                    name="lastName"
                    className="text-base"
                    placeholder="Фамилия"
                />
                <FormInput
                    name="email"
                    className="text-base"
                    placeholder="E-Mail"
                />
                <FormInput
                    name="phone"
                    className="text-base"
                    placeholder="Телефон"
                />
            </div>
        </WhiteBlock>
    );
};
