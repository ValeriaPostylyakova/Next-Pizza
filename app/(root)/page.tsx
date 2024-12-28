import {
    Container,
    Filters,
    ProductsGroupList,
    TopBar,
} from '@/shared/components/shared';
import { Stories } from '@/shared/components/shared/stories';
import { findPizzas, GetSearchParams } from '@/shared/lib/find-pizzas';
import { Suspense } from 'react';

export default async function Home({
    searchParams,
}: {
    searchParams: GetSearchParams;
}) {
    const categories = await findPizzas(searchParams);
    console.log(searchParams);
    return (
        <>
            <Stories />
            <TopBar
                categories={categories.filter(
                    (category) => category.products.length > 0
                )}
            />

            <Container className="mt-10 pb-14">
                <div className="flex gap-[60px]">
                    <div className="w-[250px]">
                        <Suspense>
                            <Filters />
                        </Suspense>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map(
                                (category) =>
                                    category.products.length > 0 && (
                                        <ProductsGroupList
                                            key={category.id}
                                            title={category.name}
                                            items={category.products}
                                            categoryId={category.id}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
