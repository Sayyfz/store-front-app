import './nav.scss';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CoolBtn from '../Buttons and Inputs/CoolBtn';
import CoolSearch from '../Buttons and Inputs/CoolSearch';
import { searched } from '../../slices/item-slice';
import { Link } from 'react-router-dom';
import { toggleCart } from '../../slices/cart-slice';
import React, { lazy, Suspense } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { handleLogout } from '../../slices/auth-slice';
const CartCard = lazy(() => import('./CartCard'));

const NavbarComp = () => {
    const dispatch = useAppDispatch();
    const isCartOpened = useAppSelector(state => state.cart.isCartOpened);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const searchQuery = useAppSelector(state => state.items.search);

    const onSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searched(e.target.value));
    };

    const submitForm = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(searched(''));
    };

    const cartOnClick = () => {
        dispatch(toggleCart());
    };

    const logout = () => {
        dispatch(handleLogout());
    };

    return (
        <Navbar className='m-navbar position-fixed' bg='light' expand='md'>
            <Container fluid='lg' className='d-flex gap-lg-3 position-relative'>
                <h2 role='button' className='cursor-pointer lh-lg me-3 my-0'>
                    LOGO
                </h2>

                <Navbar.Collapse className='me-auto' id='navbarScroll'>
                    <Nav
                        className='m-nav gap-4 me-auto my-2 my-lg-0'
                        style={{ maxHeight: '200px' }}
                    >
                        <Link to='/'>Home</Link>
                        <Link to='/'>Action</Link>
                        <Link to='/'>Action</Link>
                    </Nav>
                    <div className='nav-buttons d-flex gap-3 mb-3 mb-md-0 me-2 position-relative'>
                        {isLoggedIn !== true ? (
                            <CoolBtn title='Login'>
                                <Link
                                    to={'/login'}
                                    className='nav-login position-absolute w-100 h-100'
                                />
                            </CoolBtn>
                        ) : (
                            <CoolBtn title='Logout' onClick={logout} />
                        )}
                    </div>
                    <Form className='d-flex'>
                        <CoolSearch
                            onChange={onSearchChanged}
                            value={searchQuery}
                            title='Search Our Products'
                        />
                        <Button
                            onClick={e => submitForm(e)}
                            className='nav-search clickable-icon ms-lg-2'
                            variant=''
                        >
                            <i className='fa-solid fa-magnifying-glass fa-xl'></i>
                        </Button>
                    </Form>
                </Navbar.Collapse>
                <div className='nav-icons d-flex gap-3 align-items-center'>
                    <Suspense>
                        {isLoggedIn ? (
                            <>
                                <i
                                    className='nav-cart fa-solid fa-cart-shopping fa-xl clickable-icon'
                                    onClick={cartOnClick}
                                ></i>
                                {isCartOpened ? <CartCard /> : null}
                            </>
                        ) : null}
                    </Suspense>
                    <Navbar.Toggle className='hamburger' aria-controls='navbarScroll'>
                        <i className='fa-solid fa-bars fa-xl clickable-icon'></i>
                    </Navbar.Toggle>
                </div>
            </Container>
        </Navbar>
    );
};

export default NavbarComp;
