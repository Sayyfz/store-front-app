import '../components/Auth/login.scss';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import CoolBtn from '../components/Buttons and Inputs/CoolBtn';
import CoolSearch from '../components/Buttons and Inputs/CoolSearch';
import { Link } from 'react-router-dom';
import { ResponseError } from '../types/ResponseError';
import { AxiosError } from 'axios';
import { validateForm } from '../helpers/Validate';
import { ValidationErrors } from '../types/ValidationErrors';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { handleLogin } from '../slices/auth-slice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const [frontendErrors, setFrontendErrors] = useState<ValidationErrors>({});
    const [backendErrors, setBackendErrors] = useState<ResponseError>({ errors: [] });
    const [fields, setFields] = useState({
        username: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //validation
        const validationErrors = validateForm(fields, true);
        if (validationErrors.username || validationErrors.password) {
            setFrontendErrors(validationErrors);
            setBackendErrors({ errors: [] });
            return;
        }
        //fetching
        try {
            const { data } = await ApiService.post(
                import.meta.env.VITE_API_URL + '/users/authenticate',
                {
                    username: fields.username,
                    password: fields.password,
                },
            );
            //handling successful login
            dispatch(handleLogin(data));
            setFields({ username: '', password: '' });
            navigate('/');
        } catch (err) {
            if ((err as AxiosError).response?.data) {
                const errors = (err as AxiosError).response?.data as ResponseError;
                setBackendErrors(errors);
            } else {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, []);

    return (
        <Container
            className='login-page d-flex justify-content-center align-items-center pt-5'
            fluid={'md'}
        >
            <div className='login-wrapper px-4 px-md-5 pt-5 d-flex flex-column justify-content-center'>
                <h2 className='align-self-center text-center pb-5'>Login</h2>
                <Form
                    className='d-flex flex-column justify-content-center'
                    onSubmit={e => handleSubmit(e)}
                >
                    <Form.Group
                        className='field-row mb-3 d-flex justify-content-between align-items-center'
                        controlId='formBasicEmail'
                    >
                        <Form.Label className='me-3 mb-0'>Username</Form.Label>
                        <CoolSearch
                            name={'username'}
                            value={fields.username}
                            onChange={e => {
                                setFields({ ...fields, username: e.target.value });
                            }}
                            title={'Enter username'}
                        />
                    </Form.Group>
                    <p className='text-danger '>{frontendErrors?.username}</p>

                    <Form.Group
                        className='field-row mb-3 d-flex justify-content-between align-items-center'
                        controlId='formBasicPassword'
                    >
                        <Form.Label className='me-3 mb-0'>Password</Form.Label>
                        <CoolSearch
                            value={fields.password}
                            onChange={e => {
                                setFields({ ...fields, password: e.target.value });
                            }}
                            type='password'
                            title='Password'
                        />
                    </Form.Group>
                    <p className='text-danger'>{frontendErrors?.password}</p>
                    <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                        <p className='text-muted signup-text'>
                            Don't have an account?{' '}
                            <Link to={'/register'}>
                                <u>Signup</u>
                            </Link>
                            <span> from here</span>
                        </p>
                    </Form.Group>
                    <p className='text-danger text-center'>{backendErrors.errors[0]?.message}</p>
                    <CoolBtn title={'login'} type={'submit'} />
                </Form>
            </div>
        </Container>
    );
};

export default Login;
