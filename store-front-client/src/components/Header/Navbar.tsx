import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CoolBtn from '../Buttons and Inputs/CoolBtn';
import CoolSearch from '../Buttons and Inputs/CoolSearch';
import { searched } from '../../slices/item-slice';
import { Link } from 'react-router-dom';
import './nav.scss';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const NavbarComp = () => {
    const dispatch = useAppDispatch();
    const searchQuery = useAppSelector(state => state.items.search);

    const onSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searched(e.target.value));
    };

    const submitForm = (e: React.MouseEvent) => {
        e.preventDefault();

        dispatch(searched(''));
    };

    return (
        <Navbar className='m-navbar position-fixed' bg='light' expand='md'>
            <Container fluid='lg' className='d-flex gap-3 position-relative'>
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
                        <CoolBtn title='Login'>
                            <Link
                                to={'/login'}
                                className='nav-login position-absolute w-100 h-100'
                            />
                        </CoolBtn>
                    </div>
                    <Form className='d-flex'>
                        <CoolSearch
                            onChange={onSearchChanged}
                            value={searchQuery}
                            title='Search Our Products'
                        />
                        <Button
                            onClick={e => submitForm(e)}
                            className='nav-search clickable-icon'
                            variant=''
                        >
                            <i className='fa-solid fa-magnifying-glass fa-xl'></i>
                        </Button>
                    </Form>
                </Navbar.Collapse>

                <Navbar.Toggle className='hamburger' aria-controls='navbarScroll' />
            </Container>
        </Navbar>
    );
};

export default NavbarComp;
