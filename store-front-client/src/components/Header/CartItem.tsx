import { useAppDispatch } from '../../app/hooks';
import { removeFromCart } from '../../slices/cart-slice';
import { CartItem } from '../../types/Cart';

interface CartItemProps {
    cartItem: CartItem;
}
const CartItem = ({ cartItem }: CartItemProps) => {
    const dispatch = useAppDispatch();

    const removeCartItem = () => {
        dispatch(removeFromCart(+cartItem.id));
        // localStorage.removeItem('token');
        // localStorage.removeItem('cart');
    };

    return (
        <div className='cart-item-row d-flex gap-3 align-items-center justify-content-center mb-3'>
            <img
                className='cart-item-img bg-accent-hovered-clr'
                src={`${import.meta.env.VITE_IMGS_URL}/${cartItem.image_url}`}
                alt=''
            />
            <div className='cart-item-details d-flex flex-column '>
                <p className='cart-item-name m-0 pb-1'>{cartItem.name}</p>
                <p className='cart-item-price m-0 pb-1'>
                    {cartItem.price}$ X {cartItem.quantity}{' '}
                    <span>{cartItem.price * cartItem.quantity}$</span>
                </p>
            </div>
            <i
                className='clickable-icon cart-item-delete fa-solid fa-trash-can fa-lg'
                onClick={removeCartItem}
            ></i>
        </div>
    );
};

export default CartItem;
