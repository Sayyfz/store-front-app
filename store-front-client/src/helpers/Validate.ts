export const validateForm = (values: any, isLogin: boolean) => {
    const errors: { [key: string]: unknown } = {};

    if (!isLogin && !values.first_name) {
        errors.firstName = 'First Name is required';
    }
    if (!isLogin && !values.last_name) {
        errors.lastName = 'Last Name is required';
    }

    if (!values.username) {
        errors.username = 'Username is required';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    }

    return errors;
};
