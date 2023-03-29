import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { ProductType } from '../../types/Product';
import CoolBtn from '../Buttons and Inputs/CoolBtn';

const ProductBuyArea = () => {
    const product = useAppSelector(state => state.items.currentItem) as ProductType;
    const [quantity, setQuantity] = useState<number>(0);

    const increment = () => {
        setQuantity(quantity => quantity + 1);
    };
    const decrement = () => {
        if (quantity === 0) return;

        setQuantity(quantity => quantity - 1);
    };
    return (
        <div className='product-details-item w-100 d-flex flex-column gap-3'>
            <h3>{product.name}</h3>
            <div>
                <span>Price </span>
                {product.price}$
            </div>
            <div className='d-flex gap-4 justify-content-center align-items-center'>
                <CoolBtn title='-' onClick={() => decrement()} />
                <span>{quantity}</span>
                <CoolBtn title='+' onClick={() => increment()} />
            </div>
            <div className='add-to-cart-btn w-100'>
                <CoolBtn title='Add to cart' />
            </div>
        </div>
    );
};

export default ProductBuyArea;
