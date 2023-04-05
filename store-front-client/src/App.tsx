import './styles/App.scss';
import { Routes, Route } from 'react-router-dom';
import CoolSpinner from './components/Buttons and Inputs/CoolSpinner';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

function App() {
    return (
        <div className='app'>
            <Suspense fallback={<CoolSpinner />}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/products/:id' element={<ProductDetails />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
