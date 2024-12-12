import { Container } from '@/shared/components/shared/container';
import { SearchInput } from '@/shared/components/shared/search-input';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { CartButtom } from './cart-button';

interface Props {
    className?: string;
}

export const Header: FC<Props> = ({ className }) => {
    return (
        <header className={cn('border border-b', className)}>
            <Container className="flex items-center justify-between py-8">
                <Link href="/" className="flex items-center gap-4">
                    <Image src="/logo.png" width={35} height={35} alt="Logo" />
                    <div>
                        <h1 className="text-2xl uppercase font-black">
                            Next Pizza
                        </h1>
                    </div>
                </Link>
                <div className="mx-10 flex-1">
                    <SearchInput />
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center gap-1"
                    >
                        <User size={16} />
                        Войти
                    </Button>

                    <CartButtom />
                </div>
            </Container>
        </header>
    );
};
