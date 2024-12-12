import { FC } from 'react';
import { Button } from '../../ui';
import { Title } from '../title';
interface Props {
    className?: string;
    name: string;
    imageUrl: string;
    onClickAdd?: VoidFunction;
}

export const ChooseProductForm: FC<Props> = ({ name, imageUrl }) => {
    const textDetails: string =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, dolores!';

    const totalPrice = 350;

    return (
        <div className="flex flex-1">
            <div className="flex items-center justify-center flex-1 relative w-full">
                <img
                    src={imageUrl}
                    alt="img"
                    className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
                />
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