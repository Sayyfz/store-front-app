import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CartType } from '../../types/Cart';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { fetchCartFromStorage } from '../../slices/cart-slice';
import CoolBtn from './CoolBtn';

interface CheckoutResponse {
    url: string;
}
const CheckoutBtn = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cart = useAppSelector(state => state.cart.cart);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    const handleClick = async () => {
        const itemIds = (cart as CartType)?.cart_items.map(item => {
            return { id: item.id, quantity: item.quantity };
        });
        try {
            const { data } = await ApiService.post(import.meta.env.VITE_API_URL + '/checkout', {
                items: itemIds,
            });
            console.log(data);
            window.location.assign((data as CheckoutResponse).url);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        dispatch(fetchCartFromStorage());
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, []);

    return <CoolBtn title='Checkout' onClick={handleClick} />;
};

export default CheckoutBtn;
