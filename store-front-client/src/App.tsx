import './styles/App.scss';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';

function App() {
    return (
        <div className='app'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products/:id' element={<ProductDetails />} />
            </Routes>
        </div>
    );
}

export default App;
