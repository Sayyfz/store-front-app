import { useAppDispatch, useAppSelector } from './app/hooks';
import { getItems } from './slices/item-slice';
import { useEffect } from 'react';
import './styles/App.scss';
import { ProductType } from './types/Product';
import { ResponseError } from './types/ResponseError';
import ProductList from './components/Products/ProductList';

function App() {
    const dispatch = useAppDispatch();
    const items: ProductType[] | ResponseError = useAppSelector(state => state.items.value);

    useEffect(() => {
        dispatch(getItems());
    }, []);

    return (
        <div className='app'>
            <ProductList items={items} />
        </div>
    );
}

export default App;
