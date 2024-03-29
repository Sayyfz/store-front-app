import '../components/Products/product-details.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductType } from '../types/Product';
import { Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getItem } from '../slices/item-slice';
import ProductDetailsCarousel from '../components/Products/ProductDetailsCarousel';
import ProductBuyArea from '../components/Products/ProductBuyArea';
import CoolSpinner from '../components/Buttons and Inputs/CoolSpinner';

const ProductDetails = () => {
    const dispatch = useAppDispatch();
    const product = useAppSelector(state => state.items.currentItem) as ProductType;
    const [loading, setLoading] = useState(true);
    const [paymentMessage, setPaymentMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getItem(+id)).then(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            });
        }
    }, [dispatch, id]);

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get('success')) {
            setPaymentMessage('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            setPaymentMessage(
                "Order canceled -- continue to shop around and checkout when you're ready.",
            );
        }
    }, []);

    if (loading) {
        return <CoolSpinner />;
    }

    return paymentMessage ? (
        <Message message={paymentMessage} />
    ) : (
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

const Message = ({ message }: { message: string }) => {
    return (
        <section>
            <p>{message}</p>
        </section>
    );
};

export default ProductDetails;
