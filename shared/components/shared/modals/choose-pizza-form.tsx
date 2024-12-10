import { IProduct } from '@/@types/product';
import { ingredients } from '@/prisma/constants';
import { Button } from '@/shared/components/ui';
import {
    PizzaSize,
    pizzaSizes,
    PizzaType,
    pizzaTypes,
} from '@/shared/constants/prisma';
import { FC, useState } from 'react';
import { useSet } from 'react-use';
import { GroupVariants } from '../group-variants';
import { Ingredients } from '../ingredients';
import { ProductImage } from '../product-image';
import { Title } from '../title';

interface Props {
    className?: string;
    name: string;
    imageUrl: string;
    variation?: IProduct['variations'];
    ingredients: IProduct['ingredients'];
    onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm: FC<Props> = ({ name, imageUrl }) => {
    const textDetails: string =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, dolores!';

    const totalPrice = 350;

    const [sizes, setSizes] = useState<PizzaSize>(20);
    const [types, setTypes] = useState<PizzaType>(1);

    const [selectedIngedients, { toggle }] = useSet<number>(new Set([]));

    return (
        <div className="flex flex-1">
            <div className="flex items-center justify-center flex-1 relative w-full">
                <ProductImage imageUrl={imageUrl} size={sizes} />
            </div>
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold m-1" />
                <p className="text-gray-400">{textDetails}</p>

                <div className="flex flex-col gap-4 mt-5">
                    <GroupVariants
                        items={pizzaSizes}
                        value={String(sizes)}
                        onClick={(value) =>
                            setSizes(Number(value) as PizzaSize)
                        }
                    />

                    <GroupVariants
                        items={pizzaTypes}
                        value={String(types)}
                        onClick={(value) =>
                            setTypes(Number(value) as PizzaType)
                        }
                    />
                </div>

                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map((ingredient) => (
                            <Ingredients
                                key={ingredient.id}
                                name={ingredient.name}
                                price={ingredient.price}
                                imageUrl={ingredient.imageUrl}
                                active={selectedIngedients.has(ingredient.id)}
                                onClick={() => toggle(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
