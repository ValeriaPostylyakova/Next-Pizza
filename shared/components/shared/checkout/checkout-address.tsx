'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { AddressInput } from '../address-input';
import { ErrorText } from '../error-text';
import { FormTextarea } from '../form/form-textarea';
import { WhiteBlock } from '../white-block';

export interface Props {
    className?: string;
}

export const CheckoutAddress: FC<Props> = ({ className }) => {
    const { control } = useFormContext();
    return (
        <WhiteBlock className={className} title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
                <Controller
                    control={control}
                    name="address"
                    render={({ field, fieldState }) => (
                        <>
                            <AddressInput onChange={field.onChange} />
                            {fieldState.error && (
                                <ErrorText
                                    text={fieldState.error.message as string}
                                />
                            )}
                        </>
                    )}
                />

                <FormTextarea
                    name="comment"
                    rows={5}
                    className="text-base"
                    placeholder="Комментарий к заказу"
                />
            </div>
        </WhiteBlock>
    );
};
