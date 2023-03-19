import { ProductType } from '../../types/Product';
import { ResponseError } from '../../types/ResponseError';
import ProductCard from './ProductCard';
import './product-list.scss';

interface ProductListProps {
    items: ProductType[] | ResponseError;
}

const ProductList = ({ items }: ProductListProps) => {
    return (
        <div className='products-container container py-5'>
            {Array.isArray(items)
                ? items.map((item: ProductType) => <ProductCard key={item.id} item={item} />)
                : items.errors.map((error, idx) => <p key={idx}>{error.message}</p>)}
        </div>
    );
};

export default ProductList;
