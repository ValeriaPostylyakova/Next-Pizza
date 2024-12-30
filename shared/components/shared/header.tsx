'use client';

import { Container } from '@/shared/components/shared/container';
import { SearchInput } from '@/shared/components/shared/search-input';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthModal } from './auth-modal';
import { CartButton } from './cart-button';
import { ProfileButton } from './profile-button';

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
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.has('paid')) {
            setTimeout(() => {
                toast.success('Заказ оплачен. Спасибо за покупку!');
            }, 50);
        }

        if (searchParams.has('verified')) {
            toast.success('Почта успешно подтверждена!');
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
                    <ProfileButton
                        onClickSignIn={() => setAuthModalOpen(true)}
                    />
                    <AuthModal
                        open={authModalOpen}
                        onClose={() => setAuthModalOpen(!authModalOpen)}
                    />
                    {isShowDrawer && <CartButton />}
                </div>
            </Container>
        </header>
    );
};
