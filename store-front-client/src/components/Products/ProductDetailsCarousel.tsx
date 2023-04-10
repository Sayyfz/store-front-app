import Carousel from 'react-bootstrap/Carousel';
import { ImagesType } from '../../types/Product';
import './product-details.scss';

interface ProductDetailsCarouselProps {
    images?: ImagesType;
}
const ProductDetailsCarousel = ({ images }: ProductDetailsCarouselProps) => {
    return (
        <>
            {images && images?.length > 0 ? (
                <Carousel className='product-details-carousel w-100' interval={null} variant='dark'>
                    {images?.map(image => (
                        <Carousel.Item key={image.id}>
                            <img
                                className='py-5 py-sm-0 w-100'
                                src={`${import.meta.env.VITE_IMGS_URL}${image.imageUrl}`}
                                alt=''
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <Carousel
                    className='product-details-carousel w-100'
                    interval={null}
                    variant='dark'
                ></Carousel>
            )}
        </>
    );
};

export default ProductDetailsCarousel;
