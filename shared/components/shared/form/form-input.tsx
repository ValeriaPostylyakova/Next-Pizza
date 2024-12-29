'use client';
import { Input } from '@/shared/components/ui';
import { FC, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { ClearButton } from '../clear-button';
import { ErrorText } from '../error-text';
import { RequiredSymbol } from '../required-symbol';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: FC<Props> = ({
    name,
    label,
    required,
    className,
    ...props
}) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext();

    const value = watch(name);
    const errorText = errors[name]?.message as string;

    const onClear = () => {
        setValue(name, '');
    };

    return (
        <div className={className}>
            {label && (
                <p className="font-medium mb-2">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}
            <div className="relative">
                <Input
                    className="h-12 text-md"
                    {...props}
                    {...register(name)}
                />
                {value && <ClearButton onClick={onClear} />}
            </div>
            {errors[name] && <ErrorText text={errorText} />}
        </div>
    );
};
