'use client';

import { ChangeEvent, FC, useState } from 'react';
import { FilterCheckboxProps, FilterCheckbox } from './filter-checkbox';
import { Input } from '@/components/ui';

interface Props {
    title: string;
    items: FilterCheckboxProps[];
    defaultItems: FilterCheckboxProps[];
    limit?: number;
    searchInputPlaceholder?: string;
    className?: string;
    onChange?: (values: string[]) => void;
    defaultValue?: string[];
}

export const CheckboxFiltersGroup: FC<Props> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = 'Поиск...',
    className,
    onChange,
    defaultValue,
}) => {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const listItems = showAll
        ? items.filter((item) =>
              item.text.toLowerCase().includes(searchValue.toLowerCase())
          )
        : defaultItems.slice(0, limit);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

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
                        checked={false}
                        onCheckedChange={(id) => console.log(id)}
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
