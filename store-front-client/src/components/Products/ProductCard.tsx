import { ProductType } from '../../types/Product';
import './product-card.scss';
import { Link } from 'react-router-dom';
import AddToCartIcon from '../svgs/AddToCartIcon';
interface ProductProps {
    item: ProductType;
}
const ProductCard = ({ item }: ProductProps) => {
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
                <div className='card-button'>
                    <AddToCartIcon />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
