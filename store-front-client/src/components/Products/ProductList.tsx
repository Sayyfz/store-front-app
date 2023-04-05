import { ProductType } from '../../types/Product';
import { ResponseError } from '../../types/ResponseError';
import './product-list.scss';
import ProductCard from './ProductCard';
import { useAppSelector } from '../../app/hooks';
import { useMemo } from 'react';

interface ProductListProps {
    items: ProductType[] | ResponseError;
}

const ProductList = ({ items }: ProductListProps) => {
    const search = useAppSelector(state => state.items.search);
    let searchedItems = useMemo(() => {
        if (search === '') {
            return items;
        }
        return (items as ProductType[]).filter(item => item.name.includes(search));
    }, [search, items]);

    return (
        <div className='products-container container py-5'>
            {Array.isArray(items)
                ? (searchedItems as ProductType[]).map((item: ProductType) => (
                      <ProductCard key={item.id} item={item} />
                  ))
                : items.errors.map((error, idx) => <p key={idx}>{error.message}</p>)}
        </div>
    );
};

export default ProductList;
