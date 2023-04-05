import '../components/Auth/register.scss';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, []);
    return (
        <div className='register-wrapper d-flex flex-column justify-content-center align-items-center'>
            Register
        </div>
    );
};

export default Register;
