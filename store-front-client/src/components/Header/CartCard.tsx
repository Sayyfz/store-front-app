import { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import './cart-card.scss';

const CartCard = () => {
    const isCartOpened = useAppSelector(state => state.cart.isCartOpened);

    const removeCartItem = () => {
        console.log('removed');
    };
    const cart = {
        cartItems: [
            {
                productName: 'shoes',
                quantity: 4,
                price: 350,
            },
        ],
        totalPrice: 1400,
        userId: 2,
        order: {
            status: 'active',
        },
    };

    return (
        <div className={`cart-card position-absolute p-4 ${isCartOpened ? 'd-block' : 'd-none'}`}>
            <h3 className='cart-header text-center pb-3 mb-4'>Cart Title</h3>
            <div className='cart-item-row d-flex gap-3 align-items-center justify-content-center'>
                <img
                    className='cart-item-img bg-accent-hovered-clr'
                    src='http://localhost:5000/images/1679618196494.png'
                    alt=''
                />
                <div className='cart-item-details d-flex flex-column '>
                    <p className='cart-item-name m-0 pb-1'>Item name example</p>
                    <p className='cart-item-price m-0 pb-1'>
                        125$ X 3 <span>375$</span>
                    </p>
                </div>
                <i
                    className='clickable-icon cart-item-delete fa-solid fa-trash-can fa-lg'
                    onClick={removeCartItem}
                ></i>
            </div>
        </div>
    );
};

export default CartCard;
