import '../components/Auth/login.scss';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import CoolSearch from '../components/Buttons and Inputs/CoolSearch';
import { ResponseError } from '../types/ResponseError';
import { ValidationErrors } from '../types/ValidationErrors';
import CoolBtn from '../components/Buttons and Inputs/CoolBtn';
import ApiService from '../services/ApiService';
import { AxiosError } from 'axios';
import { validateForm } from '../helpers/Validate';
import { handleLogin } from '../slices/auth-slice';

const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    const [frontendErrors, setFrontendErrors] = useState<ValidationErrors>({});
    const [backendErrors, setBackendErrors] = useState<ResponseError>({ errors: [] });

    const [fields, setFields] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //validation
        const validationErrors = validateForm(fields, false);
        if (
            validationErrors.username ||
            validationErrors.password ||
            validationErrors.first_name ||
            validationErrors.last_name
        ) {
            setFrontendErrors(validationErrors);
            setBackendErrors({ errors: [] });
            return;
        }

        try {
            const f = { ...fields };
            console.log(f);
            const { data } = await ApiService.post(import.meta.env.VITE_API_URL + '/users', {
                ...fields,
            });
            //handling successful Register
            dispatch(handleLogin(data));
            setFields({ first_name: '', last_name: '', username: '', password: '' });
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
                <h2 className='align-self-center text-center pb-5'>Register</h2>
                <Form
                    className='d-flex flex-column justify-content-center'
                    onSubmit={e => handleSubmit(e)}
                >
                    <Form.Group className='mb-3 d-flex justify-content-between align-items-center'>
                        <Form.Label className='me-3 mb-0'>First Name</Form.Label>
                        <CoolSearch
                            name={'firstname'}
                            value={fields.first_name}
                            onChange={e => {
                                setFields({ ...fields, first_name: e.target.value });
                            }}
                            title={'Enter First Name'}
                        />
                    </Form.Group>
                    <p className='text-danger '>{frontendErrors?.first_name}</p>

                    <Form.Group className='mb-3 d-flex justify-content-between align-items-center'>
                        <Form.Label className='me-3 mb-0'>Last Name</Form.Label>
                        <CoolSearch
                            name={'lastname'}
                            value={fields.last_name}
                            onChange={e => {
                                setFields({ ...fields, last_name: e.target.value });
                            }}
                            title={'Enter Last Name'}
                        />
                    </Form.Group>
                    <p className='text-danger '>{frontendErrors?.last_name}</p>

                    <Form.Group
                        className='mb-3 d-flex justify-content-between align-items-center'
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
                        className='mb-3 d-flex justify-content-between align-items-center'
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
                    <p className='text-danger text-center'>{backendErrors.errors[0]?.message}</p>
                    <CoolBtn title={'Register'} type={'submit'} />
                </Form>
            </div>
        </Container>
    );
};

export default Register;
