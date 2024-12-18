'use client';

import { CheckboxFiltersGroup } from '@/shared/components/shared/checkbox-filters-group';
import { Input } from '@/shared/components/ui';
import {
    useFilterIngredients,
    useFiltersParams,
    useQueryFilters,
} from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { RangeSlider } from './range-slider';
import { Title } from './title';

interface Props {
    className?: string;
}

export type PriceProps = {
    priceFrom: number | undefined;
    priceTo: number | undefined;
};

export interface QueryFilters extends PriceProps {
    sizes: string[];
    pizzaTypes: string;
    ingredients: string[];
}

export const Filters: FC<Props> = ({ className }) => {
    const searchParams = useSearchParams() as unknown as Map<
        keyof QueryFilters,
        string
    >;
    const { items, loading } = useFilterIngredients();

    const {
        selectedId,
        onToggleId,
        sizes,
        setSizes,
        pizzaTypes,
        setPizzaTypes,
        price,
        updatePrice,
    } = useFiltersParams(
        searchParams.has('ingredients')
            ? searchParams.get('ingredients')?.split(',')
            : []
    );

    const ingredients = items.map((item) => ({
        value: String(item.id),
        text: item.name,
    }));

    useQueryFilters({
        sizes,
        pizzaTypes,
        selectedId,
        price,
    });

    return (
        <div className={cn('', className)}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

            <CheckboxFiltersGroup
                title="Тип теста"
                className="mb-5"
                onClickCheckbox={setPizzaTypes}
                selectedId={pizzaTypes}
                items={[
                    { text: 'Тонкое', value: '1' },
                    { text: 'Традиционное', value: '2' },
                ]}
                loading={loading}
            />

            <CheckboxFiltersGroup
                title="Размеры"
                loading={loading}
                className="mb-5"
                onClickCheckbox={setSizes}
                selectedId={sizes}
                items={[
                    { text: '20 см', value: '20' },
                    { text: '30 см', value: '30' },
                    { text: '40 см', value: '40' },
                ]}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        value={price.priceFrom}
                        onChange={(e) =>
                            updatePrice({
                                ...price,
                                priceFrom: +e.target.value,
                            })
                        }
                    />
                    <Input
                        type="number"
                        min={80}
                        max={1000}
                        placeholder="1000"
                        value={price.priceTo}
                        onChange={(e) =>
                            updatePrice({ ...price, priceTo: +e.target.value })
                        }
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[price.priceFrom || 0, price.priceTo || 1000]}
                    onValueChange={([priceFrom, priceTo]) =>
                        updatePrice({ priceFrom, priceTo })
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
