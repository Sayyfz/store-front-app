import { ProductType } from '../../types/Product';
import './product-card.scss';
import { Link } from 'react-router-dom';
import AddToCartIcon from '../svgs/AddToCartIcon';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProductToCart } from '../../slices/cart-slice';
import { CartType } from '../../types/Cart';
interface ProductProps {
    item: ProductType;
}
const ProductCard = ({ item }: ProductProps) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(state => state.cart.cart) as CartType;

    const addToCart = () => {
        cart.id && dispatch(addProductToCart({ cart_id: cart.id, product: item, quantity: 1 }));
    };

    return (
        <div className='product-card card w-100'>
            <div className='card-img'>
                {item.images?.length && (
                    <>
                        <img
                            className=''
                            src={`${import.meta.env.VITE_IMGS_URL}${item.images[0].imageUrl}`}
                            alt=''
                        />
                        <Link className='product-link' to={`/products/${item.id}`} />
                    </>
                )}
            </div>
            <div className='card-info'>
                <p className='text-title'>{item.name} </p>
            </div>
            <div className='card-footer'>
                <span className='text-title'>{item.price}</span>
                <button className='card-button' onClick={addToCart}>
                    <AddToCartIcon />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
