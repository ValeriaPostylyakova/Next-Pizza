'use client';

import { CheckboxFiltersGroup } from '@/components/shared/checkbox-filters-group';
import { Input } from '@/components/ui';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { cn } from '@/lib/utils';
import { FC, useState } from 'react';
import { FilterCheckbox } from './filter-checkbox';
import { RangeSlider } from './range-slider';
import { Title } from './title';

interface Props {
    className?: string;
}

type PriceProps = {
    priceFrom: number;
    priceTo: number;
};

export const Filters: FC<Props> = ({ className }) => {
    const { items, loading, selectedId, onToggleId } = useFilterIngredients();
    const ingredients = items.map((item) => ({
        value: String(item.id),
        text: item.name,
    }));

    const [{ priceFrom, priceTo }, setRangePrice] = useState<PriceProps>({
        priceFrom: 0,
        priceTo: 1000,
    });

    const updateRangePrice = ({ priceFrom, priceTo }: PriceProps) => {
        setRangePrice({ priceFrom, priceTo });
    };

    return (
        <div className={cn('', className)}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Можно собирать" value="30" />
                <FilterCheckbox text="Новинки" value="40" />
            </div>
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        value={String(priceFrom)}
                        onChange={(e) =>
                            updateRangePrice({
                                priceFrom: Number(e.target.value),
                                priceTo,
                            })
                        }
                    />
                    <Input
                        type="number"
                        min={80}
                        max={1000}
                        placeholder="1000"
                        value={String(priceTo)}
                        onChange={(e) =>
                            updateRangePrice({
                                priceFrom,
                                priceTo: Number(e.target.value),
                            })
                        }
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[priceFrom, priceTo]}
                    onValueChange={([from, to]) =>
                        setRangePrice({ priceFrom: from, priceTo: to })
                    }
                />
            </div>
            <CheckboxFiltersGroup
                title="Ингредиенты"
                className="mt-5"
                limit={6}
                defaultItems={ingredients.slice(0, 6)}
                items={ingredients}
                loading={loading}
                onClickCheckbox={onToggleId}
                selectedId={selectedId}
            />
        </div>
    );
};
