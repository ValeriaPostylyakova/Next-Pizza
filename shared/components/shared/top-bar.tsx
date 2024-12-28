import { cn } from '@/shared/lib/utils';
import { Category } from '@prisma/client';
import { FC } from 'react';
import { Categories } from './categories';
import { Container } from './container';

interface Props {
    className?: string;
    categories: Category[];
}

export const TopBar: FC<Props> = ({ className, categories }) => {
    return (
        <div
            className={cn(
                'sticky z-30 top-0 bg-white py-5 shadow-lg shadow-black/5',
                className
            )}
        >
            <Container className="flex items-center justify-between">
                <Categories items={categories} />
            </Container>
        </div>
    );
};
