import { FC } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
    onChange?: (data?: string) => void;
}

export const AddressInput: FC<Props> = ({ onChange }) => {
    return (
        <AddressSuggestions
            token="f2bbe1e2d3bb3dd029d1100b36bda1e06eb3ab2c"
            onChange={(data) => onChange?.(data?.value)}
        />
    );
};
