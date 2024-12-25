import { FC, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { ErrorText } from './error-text';

export interface Props {
    placeholder: string;
    mask: any;
}

export const ImaskComponent: FC<Props> = ({ placeholder, mask }) => {
    const ref = useRef(null);
    const inputRef = useRef(null);
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name="phone"
            render={({ field, fieldState }) => (
                <div className="flex flex-col items-start">
                    <IMaskInput
                        onAccept={field.onChange}
                        className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        mask={mask}
                        radix="."
                        ref={ref}
                        inputRef={inputRef}
                        placeholder={placeholder}
                    />
                    {fieldState.error && (
                        <ErrorText text={fieldState.error.message as string} />
                    )}
                </div>
            )}
        />
    );
};
