import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CartType } from '../../types/Cart';
import { useEffect, useState } from 'react';
import './cart-card.scss';
import CartItem from './CartItem';
import { fetchCartFromStorage } from '../../slices/cart-slice';
import CheckoutBtn from '../Buttons and Inputs/CheckoutBtn';

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
            <h3 className='cart-header text-center pb-3 mb-4'>Cart</h3>
            <>
                {cart && Object.keys(cart).length && (cart as CartType).cart_items.length ? (
                    (cart as CartType)?.cart_items?.map(item => (
                        <CartItem key={item.id} cartItem={item} />
                    ))
                ) : (
                    <div className='mb-4 text-center text-muted'>
                        Products added to cart will show here
                    </div>
                )}
            </>
            <div
                className={`cart-footer d-flex justify-content-center align-items-center fs-5 pt-3 mb-3 ${
                    cart && Object.keys(cart).length ? 'd-block' : 'd-none'
                }`}
            >
                <span style={{ fontWeight: '500' }}>Total: </span>{' '}
                <span className='ms-2 my-auto'>{totalPrice}$</span>
            </div>
            <div className='d-flex justify-content-center'>
                <CheckoutBtn />
            </div>
        </div>
    );
};

export default CartCard;
