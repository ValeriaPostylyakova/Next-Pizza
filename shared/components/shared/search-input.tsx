'use client';

import { cn } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';
import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useClickAway, useDebounce } from 'react-use';

export const SearchInput = () => {
    const [data, setData] = useState<Product[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [focused, setFocused] = useState<boolean>(false);
    const ref = useRef(null);

    useClickAway(ref, () => {
        setFocused(false);
    });

    useDebounce(
        () => {
            Api.products
                .search(searchValue)
                .then((res: Product[]) => setData(res))
                .catch((err: Error) => console.error(err));
        },
        250,
        [searchValue]
    );

    const onClickItem = () => {
        setSearchValue('');
        setData([]);
        setFocused(false);
    };

    return (
        <>
            {focused && (
                <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-40" />
            )}
            <div
                ref={ref}
                className="flex rounded-2xl flex-1 justify-between relative h-11 z-40"
            >
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
                <input
                    className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
                    type="text"
                    placeholder="Я хочу..."
                    onFocus={() => setFocused(true)}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <div
                    className={cn(
                        'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                        focused && 'visible opacity-100 top-12'
                    )}
                >
                    {data.length === 0 ? (
                        <p className="p-3 font-bold">
                            По данному запросу ничего не найдено
                        </p>
                    ) : (
                        data.map((product) => (
                            <Link
                                onClick={onClickItem}
                                key={product.id}
                                href={`/product/${product.id}`}
                                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 rounded-sm"
                            >
                                <img
                                    className="w-8 h-8"
                                    src={product.imageUrl}
                                    alt="product"
                                />
                                <span>{product.name}</span>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};
