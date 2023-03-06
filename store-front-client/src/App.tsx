import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { incremented, amountAdded } from './slices/counter-slice';

function App() {
    const count = useAppSelector(state => state.counter.value);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(amountAdded(3));
    };
    return (
        <div className='App'>
            <div>
                <a href='https://vitejs.dev' target='_blank'>
                    <img src='/vite.svg' className='logo' alt='Vite logo' />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className='card'>
                <button onClick={handleClick}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
        </div>
    );
}

export default App;
