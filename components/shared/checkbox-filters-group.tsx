'use client';

import { Input, Skeleton } from '@/components/ui';
import { ChangeEvent, FC, useState } from 'react';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';

interface Props {
    title: string;
    items: FilterCheckboxProps[];
    defaultItems?: FilterCheckboxProps[];
    limit?: number;
    searchInputPlaceholder?: string;
    className?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValue?: string[];
    loading: boolean;
    selectedId?: Set<string>;
}

export const CheckboxFiltersGroup: FC<Props> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Поиск...',
    className,
    loading,
    onClickCheckbox,
    defaultValue,
    selectedId,
}) => {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const listItems = showAll
        ? items.filter((item) =>
              item.text.toLowerCase().includes(searchValue.toLowerCase())
          )
        : (defaultItems || items).slice(0, limit);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    if (loading) {
        return (
            <div className={className}>
                <p className="font-bold mb-3">{title}</p>

                {...Array(limit)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-6 mb-4 rounded-[8px]"
                        />
                    ))}

                <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
            </div>
        );
    }

    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>
            {showAll && (
                <div className="mb-5">
                    <Input
                        onChange={onChangeInput}
                        placeholder={searchInputPlaceholder}
                        className="bg-gray-50 border-none"
                    />
                </div>
            )}
            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {listItems.map((item: FilterCheckboxProps, index) => (
                    <FilterCheckbox
                        key={index}
                        value={item.value}
                        text={item.text}
                        endAdornment={item.endAdornment}
                        checked={selectedId?.has(item.value)}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div
                    className={
                        showAll ? 'border-t border-t-neutral-100 mt-4' : ''
                    }
                >
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-primary mt-3"
                    >
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    );
};
