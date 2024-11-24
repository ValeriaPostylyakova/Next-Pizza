import { cn } from '@/lib/utils';
import { FC } from 'react';
import { Container } from './container';
import { Categories } from './categories';
import { SortPopup } from './sort-popup';

interface Props {
    className?: string;
}

export const TopBar: FC<Props> = ({ className }) => {
    return (
        <div
            className={cn(
                'sticky z-30 top-0 bg-white py-5 shadow-lg shadow-black/5',
                className
            )}
        >
            <Container className="flex items-center justify-between ">
                <Categories />
                <SortPopup />
            </Container>
        </div>
    );
};
