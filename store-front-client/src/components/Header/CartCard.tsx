import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CartType } from '../../types/Cart';
import { useEffect } from 'react';
import './cart-card.scss';
import CartItem from './CartItem';
import { fetchCartFromStorage } from '../../slices/cart-slice';

const CartCard = () => {
    const dispatch = useAppDispatch();
    const { isCartOpened, cart } = useAppSelector(state => state.cart);
    const removeCartItem = () => {
        console.log('removed');
    };

    console.log(cart);
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
                    : null}
            </>
        </div>
    );
};

export default CartCard;
