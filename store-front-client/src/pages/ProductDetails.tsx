import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductType } from '../types/Product';
import { Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getItem } from '../slices/item-slice';
import ProductDetailsCarousel from '../components/Products/ProductDetailsCarousel';
import '../components/Products/product-details.scss';
import ProductBuyArea from '../components/Products/ProductBuyArea';

const ProductDetails = () => {
    const dispatch = useAppDispatch();
    const product = useAppSelector(state => state.items.currentItem) as ProductType;
    const { id } = useParams();

    useEffect(() => {
        if (id) dispatch(getItem(+id));
    }, []);

    return (
        <Container fluid='lg'>
            <Row className='product-details pt-0 pt-sm-5  justify-content-center align-items-center gap-sm-5 gap-5'>
                <Col className='justify-content-center d-flex bg-accent-hovered-clr' xs='12' md='5'>
                    <ProductDetailsCarousel images={product?.images} />
                </Col>
                <Col className='justify-content-center d-flex' xs='12' md='5'>
                    <ProductBuyArea />
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;
