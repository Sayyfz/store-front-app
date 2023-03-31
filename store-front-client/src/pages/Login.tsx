import '../components/Auth/login.scss';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, control } = useForm();

    console.log(register);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submitted');
    };

    return (
        <form
            className='login-wrapper d-flex flex-column justify-content-center align-items-center'
            onSubmit={handleSubmit}
        >
            <label htmlFor=''>Login</label>
        </form>
    );
};

export default Login;
