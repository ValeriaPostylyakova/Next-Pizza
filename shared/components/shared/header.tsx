'use client';

import { Container } from '@/shared/components/shared/container';
import { SearchInput } from '@/shared/components/shared/search-input';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CartButton } from './cart-button';

interface Props {
    isShowSearch?: boolean;
    isShowDrawer?: boolean;
    className?: string;
}

export const Header: FC<Props> = ({
    className,
    isShowSearch,
    isShowDrawer,
}) => {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.has('paid')) {
            toast.success('Заказ оплачен. Спасибо за покупку!');
        }
    }, []);

    return (
        <header className={cn('border-b', className)}>
            <Container className="flex items-center justify-between py-8">
                <Link href="/" className="flex items-center gap-4">
                    <Image src="/logo.png" width={35} height={35} alt="Logo" />
                    <div>
                        <h1 className="text-2xl uppercase font-black">
                            Next Pizza
                        </h1>
                    </div>
                </Link>
                {isShowSearch && (
                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>
                )}

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center gap-1"
                    >
                        <User size={16} />
                        Войти
                    </Button>

                    {isShowDrawer && <CartButton />}
                </div>
            </Container>
        </header>
    );
};
