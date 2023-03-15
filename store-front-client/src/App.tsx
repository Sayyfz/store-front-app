import { useAppDispatch, useAppSelector } from './app/hooks';
import NavbarComp from './components/Navbar';
import { incremented, amountAdded } from './slices/counter-slice';
import api from './services/ApiService';
import './styles/App.scss';

function App() {
    const count = useAppSelector(state => state.counter.value);
    const dispatch = useAppDispatch();
    const handleClick = () => {
        dispatch(amountAdded(3));
    };

    return (
        <>
            <button onClick={() => handleClick()} />
        </>
    );
}

export default App;
