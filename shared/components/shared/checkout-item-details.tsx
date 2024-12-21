import { cn } from '@/shared/lib/utils';
import { ReactNode } from 'react';
import { Skeleton } from '../ui';

export interface Props {
    className?: string;
    title: ReactNode;
    value: number;
    loading?: boolean;
}

export const CheckoutItemDetails: React.FC<Props> = ({
    className,
    title,
    value,
    loading,
}) => {
    return (
        <div className={cn('flex my-4', className)}>
            <span className="flex flex-1 text-lg text-neutral-500">
                <div className="flex items-center">{title}</div>
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>
            {loading ? (
                <Skeleton className="h-6 w-16" />
            ) : (
                <span className="font-bold text-lg">{value} ₽</span>
            )}
        </div>
    );
};
