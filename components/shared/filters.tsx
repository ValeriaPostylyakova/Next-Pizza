'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { Input } from '@/components/ui';
import { FilterCheckbox } from './filter-checkbox';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from '@/components/shared/checkbox-filters-group';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';

interface Props {
    className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
    const { items, loading } = useFilterIngredients();
    const ingredients = items.map((item) => ({
        value: String(item.id),
        text: item.name,
    }));

    return (
        <div className={cn('', className)}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Можно собирать" value="1" />
                <FilterCheckbox text="Новинки" value="2" />
            </div>
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        defaultValue={0}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={1000}
                        placeholder="1000"
                    />
                </div>
                <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
            </div>
            <CheckboxFiltersGroup
                title="Ингредиенты"
                className="mt-5"
                limit={6}
                defaultItems={ingredients.slice(0, 6)}
                items={ingredients}
                loading={loading}
            />
        </div>
    );
};
