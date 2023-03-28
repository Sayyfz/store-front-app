import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useAppDispatch } from '../../app/hooks';
import { filterItemsByCategory, getItems } from '../../slices/item-slice';
import '../../styles/App.scss';
import './filters.scss';

function Filters() {
    const dispatch = useAppDispatch();
    const [radioValue, setRadioValue] = useState('0');

    const radios = [
        { name: 'Men', value: '1' },
        { name: 'Women', value: '2' },
    ];
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
                onClick={() => {
                    setRadioValue('0');
                    dispatch(getItems());
                }}
                className='fa-solid fa-filter-circle-xmark fa-xl ms-5 clickable-icon clear-filter'
            ></i>
        </div>
    );
}

export default Filters;
