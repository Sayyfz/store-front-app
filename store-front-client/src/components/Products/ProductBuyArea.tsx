import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProductToCart } from '../../slices/cart-slice';
import { CartType } from '../../types/Cart';
import { ProductType } from '../../types/Product';
import CoolBtn from '../Buttons and Inputs/CoolBtn';
import '../Buttons and Inputs/cool-search.scss';
import { useNavigate } from 'react-router-dom';
import CheckoutBtn from '../Buttons and Inputs/CheckoutBtn';

const ProductBuyArea = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cart = useAppSelector(state => state.cart.cart) as CartType;
    const product = useAppSelector(state => state.items.currentItem) as ProductType;
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    const [quantity, setQuantity] = useState<number>(1);

    const addToCart = () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        cart.id &&
            dispatch(addProductToCart({ cart_id: cart.id, product, quantity: quantity ?? 0 }));
    };
    const increment = () => {
        setQuantity(quantity => quantity + 1);
    };
    const decrement = () => {
        if (quantity === 0) return;

        setQuantity(quantity => quantity - 1);
    };
    const checkout = () => {
        navigate('/checkout');
    };

    return (
        <div className='product-details-item w-100 d-flex flex-column gap-3'>
            <h3>{product?.name}</h3>
            <div>
                <span>Price </span>
                {(product?.price || 0) * quantity}$
            </div>
            <div className='d-flex gap-4 justify-content-center align-items-center'>
                <CoolBtn title='-' onClick={() => decrement()} />
                <input
                    className='d-flex text-center product-quantity coolSearch w-25'
                    value={quantity}
                    title='Quantity'
                    name='quantity'
                    type='tel'
                    onChange={e => {
                        setQuantity(+e.target.value);
                    }}
                    onKeyPress={e => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                            e.preventDefault();
                        }
                    }}
                />
                <CoolBtn title='+' onClick={() => increment()} />
            </div>
            <div className='add-to-cart-btn w-100 d-flex flex-column gap-3'>
                <CoolBtn title='Add to cart' onClick={addToCart} />
                <CheckoutBtn />
            </div>
        </div>
    );
};

export default ProductBuyArea;
