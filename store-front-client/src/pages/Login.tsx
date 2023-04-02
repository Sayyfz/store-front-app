import '../components/Auth/login.scss';
import jwtDecode from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import ApiService from '../services/ApiService';
import { useAppDispatch } from '../app/hooks';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, control } = useForm();
    // console.log(register);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPassword('');
        setUsername('');
        const { data } = await ApiService.post(
            import.meta.env.VITE_API_URL + '/users/authenticate',
            {
                username: 'sayyf',
                password: 'theghost22',
            },
        );
        handleLocalStorageOnLogin(data);
        navigate('/');
    };

    const handleLocalStorageOnLogin = (data: unknown) => {
        localStorage.setItem('token', data as string);
        const decoded = jwtDecode(data as string);
        localStorage.setItem('cart', JSON.stringify((decoded as any).cart));
    };

    return (
        <form
            className='login-wrapper d-flex flex-column justify-content-center align-items-center'
            onSubmit={handleSubmit}
        >
            <label htmlFor=''>Username</label>
            <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={e => {
                    setUsername(e.target.value);
                }}
            />
            <label htmlFor=''>Password</label>
            <input
                type='text'
                placeholder='Password'
                value={password}
                onChange={e => {
                    setPassword(e.target.value);
                }}
            />
            <button type='submit'>Login</button>
        </form>
    );
};

export default Login;
