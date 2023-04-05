import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { getCookie, removeCookie, setCookie } from '../helpers/Cookies';

interface AuthState {
    isLoggedIn: boolean;
}
const initialState: AuthState = {
    isLoggedIn: getCookie('isLoggedIn') === 'true',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleLogin(state, action) {
            setCookie('isLoggedIn', 'true', 7);

            const decoded = jwtDecode(action.payload as string);

            localStorage.setItem('token', action.payload as string);
            localStorage.setItem('cart', JSON.stringify((decoded as any).cart));

            state.isLoggedIn = true;
            window.dispatchEvent(new Event('storage'));
        },
        handleLogout(state) {
            removeCookie('isLoggedIn');

            localStorage.setItem('token', '');
            localStorage.setItem('cart', JSON.stringify({}));

            state.isLoggedIn = false;
            window.dispatchEvent(new Event('storage'));
        },
    },
});

export const { handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
