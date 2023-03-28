import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductType } from '../types/Product';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getItem } from '../slices/item-slice';

const ProductDetails = () => {
    const dispatch = useAppDispatch();
    const product = useAppSelector(state => state.items.currentItem) as ProductType;
    const { id } = useParams();

    useEffect(() => {
        if (id) dispatch(getItem(+id));
    }, []);

    return <div>{product?.name}</div>;
};

export default ProductDetails;
