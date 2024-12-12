import { ingredients } from '@/prisma/constants';
import { mapPizzaType, PizzaSize, PizzaType } from '@/shared/constants/prisma';
import { cn } from '@/shared/lib/utils';

interface Props {
    name: string;
    className?: string;
    pizzaSize: PizzaSize;
    pizzaType: PizzaType;
}

export const CartItemInfo: React.FC<Props> = ({
    name,
    className,
    pizzaSize,
    pizzaType,
}) => {
    const details = [];

    if (pizzaSize && pizzaType) {
        const typeName = mapPizzaType[pizzaType];
        details.push(`${typeName}, ${pizzaSize} см`);
    }

    if (ingredients) {
        details.push(...ingredients.map((ingredient) => ingredient.name));
    }

    return (
        <div>
            <div className={cn('flex items-center justify-between', className)}>
                <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
            </div>
            {details.length > 0 && (
                <p className="text-xs text-gray-400 w-[90%]">
                    {details.join(',')}
                </p>
            )}
        </div>
    );
};
