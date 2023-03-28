import ProductList from '../components/Products/ProductList';
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import { getItems } from '../slices/item-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ResponseError } from '../types/ResponseError';
import { ProductType } from '../types/Product';
import '../styles/home.scss';
import Filters from '../components/Filter Sidebar/Filters';

const Home = () => {
    const dispatch = useAppDispatch();
    let items: ProductType[] | ResponseError = useAppSelector(state => state.items.value);

    useEffect(() => {
        dispatch(getItems());
    }, []);
    return (
        <div className='home py-5'>
            <Container>
                <Filters />
                <ProductList items={items} />
            </Container>
        </div>
    );
};

export default Home;
