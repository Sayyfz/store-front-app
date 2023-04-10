import React, { useEffect, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useAppDispatch } from '../../app/hooks';
import ApiService from '../../services/ApiService';
import { filterItemsByCategory, getItems } from '../../slices/item-slice';
import '../../styles/App.scss';
import { CategoryType } from '../../types/Category';
import { CategoryRadio } from '../../types/CategoryRadio';
import './filters.scss';

function Filters() {
    const dispatch = useAppDispatch();
    const [radioValue, setRadioValue] = useState('0');
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [radios, setRadios] = useState<CategoryRadio[]>([]);

    const resetFilter = () => {
        setRadioValue('0');
        dispatch(getItems());
    };

    useEffect(() => {
        (async () => {
            try {
                const { data } = await ApiService.get(import.meta.env.VITE_API_URL + '/categories');
                setCategories(data as CategoryType[]);
                const reformattedCats = (data as any)?.map((category: CategoryType) => {
                    return {
                        name: category.name.charAt(0).toUpperCase() + category.name.slice(1),
                        value: category.id.toString(),
                    };
                });
                setRadios(reformattedCats);
            } catch (err) {
                console.log((err as Error).message);
            }
        })();
    }, []);

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <ButtonGroup>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type='radio'
                        name='radio'
                        className={`outline-accent-clr filter-btn ${
                            radioValue === radio.value ? 'bg-accent-hovered-clr' : 'bg-primary-clr'
                        }`}
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={e => {
                            dispatch(filterItemsByCategory(+e.currentTarget.value));
                            setRadioValue(e.currentTarget.value);
                        }}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
            <i
                onClick={resetFilter}
                className='fa-solid fa-filter-circle-xmark fa-xl ms-5 clickable-icon clear-filter'
            ></i>
        </div>
    );
}

export default Filters;
