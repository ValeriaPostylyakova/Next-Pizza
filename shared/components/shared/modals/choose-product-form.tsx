import { FC } from 'react';
import { Button } from '../../ui';
import { Title } from '../title';
interface Props {
    className?: string;
    name: string;
    imageUrl: string;
    onClickAdd?: () => void;
    price: number;
    loading: boolean;
    title: string | null;
    description: string | null;
}

export const ChooseProductForm: FC<Props> = ({
    name,
    imageUrl,
    onClickAdd,
    price,
    loading,
    title,
    description,
}) => {
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
                <div className="flex flex-col items-start">
                    <Title
                        text={name}
                        size="md"
                        className="font-extrabold my-1"
                    />
                    <p className="mb-5 text-gray-500 text-base">{title}</p>
                    <p className="text-lg">{description}</p>
                </div>
                <Button
                    loading={loading}
                    onClick={() => onClickAdd?.()}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                >
                    Добавить в корзину за {price} ₽
                </Button>
            </div>
        </div>
    );
};
