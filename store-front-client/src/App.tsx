import { useAppDispatch, useAppSelector } from './app/hooks';
import { getItems } from './slices/item-slice';
import { useEffect } from 'react';
import './styles/App.scss';
import { ProductType } from './types/Product';
import { ResponseError } from './types/ResponseError';
import Product from './components/Product';

function App() {
    const dispatch = useAppDispatch();
    const items: ProductType[] | ResponseError = useAppSelector(state => state.items.value);

    useEffect(() => {
        dispatch(getItems());
    }, []);

    return (
        <div className='app'>
            <div>
                {Array.isArray(items)
                    ? items.map((item: ProductType) => <Product key={item.id} item={item} />)
                    : items.errors.map((error, idx) => <p key={idx}>{error.message}</p>)}
            </div>
        </div>
    );
}

export default App;
