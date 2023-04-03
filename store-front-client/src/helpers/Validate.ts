export const validate = (values: any) => {
    const errors: { [key: string]: unknown } = {};
    if (!values.username) {
        errors.username = 'Username is required';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    }
    return errors;
};
