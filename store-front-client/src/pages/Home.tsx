import ProductList from '../components/Products/ProductList';
import { useEffect } from 'react';
import { getItems } from '../slices/item-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ResponseError } from '../types/ResponseError';
import { ProductType } from '../types/Product';

const Home = () => {
    const dispatch = useAppDispatch();
    let items: ProductType[] | ResponseError = useAppSelector(state => state.items.value);

    useEffect(() => {
        dispatch(getItems());
    }, []);
    return <ProductList items={items} />;
};

export default Home;
