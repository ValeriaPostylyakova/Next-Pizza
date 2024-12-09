import { IProduct } from '@/@types/product';
import { Button } from '@/components/ui';
import { FC } from 'react';
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

    return (
        <div className="flex flex-1">
            <div className="flex items-center justify-center flex-1 relative w-full">
                <ProductImage imageUrl={imageUrl} size={30} />
            </div>
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold m-1" />
                <p className="text-gray-400">{textDetails}</p>
                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
