import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CartType } from '../../types/Cart';
import { useEffect, useState } from 'react';
import './cart-card.scss';
import CartItem from './CartItem';
import { fetchCartFromStorage } from '../../slices/cart-slice';

const CartCard = () => {
    const dispatch = useAppDispatch();
    const { isCartOpened, cart } = useAppSelector(state => state.cart);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        if ((cart as CartType).cart_items) {
            const total = (cart as CartType).cart_items.reduce((accumulator, cartItem) => {
                return accumulator + cartItem.quantity * cartItem.price;
            }, 0);
            setTotalPrice(total);
        }
    }, [cart]);

    useEffect(() => {
        dispatch(fetchCartFromStorage());
    }, []);

    return (
        <div className={`cart-card position-absolute p-4 ${isCartOpened ? 'd-block' : 'd-none'}`}>
            <h3 className='cart-header text-center pb-3 mb-4'>Cart Title</h3>
            <>
                {cart && Object.keys(cart).length
                    ? (cart as CartType)?.cart_items?.map(item => (
                          <CartItem key={item.id} cartItem={item} />
                      ))
                    : 'No products added to cart currently'}
            </>
            <div
                className={`cart-footer d-flex justify-content-center fs-5 pt-3 ${
                    cart && Object.keys(cart).length ? 'd-block' : 'd-none'
                }`}
            >
                <span style={{ fontWeight: '500' }}>Total: </span>{' '}
                <span className='ms-2 my-auto'>{totalPrice}$</span>
            </div>
        </div>
    );
};

export default CartCard;
