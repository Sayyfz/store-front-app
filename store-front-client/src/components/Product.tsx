import { ProductType } from '../types/Product';

interface ProductProps {
    item: ProductType;
}
const Product = ({ item }: ProductProps) => {
    return (
        <>
            <h2>
                <span>{item.id}</span>
                {item.name}
            </h2>
            <p>{item.category}</p>
            <p>{item.price}</p>
        </>
    );
};

export default Product;
