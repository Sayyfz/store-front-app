import './styles/App.scss';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import Login from './components/Auth/Login';

function App() {
    return (
        <div className='app'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products/:id' element={<ProductDetails />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
