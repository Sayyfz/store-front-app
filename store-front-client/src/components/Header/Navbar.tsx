import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CoolBtn from '../Buttons and Inputs/CoolBtn';
import CoolSearch from '../Buttons and Inputs/CoolSearch';
import { filterItems } from '../../slices/item-slice';
import { debounce } from 'lodash';
import './nav.scss';
import React, { useState, useCallback } from 'react';
import { useAppDispatch } from '../../app/hooks';

const NavbarComp = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedFilter = useCallback(
        debounce(searchQuery => {
            dispatch(filterItems(searchQuery));
        }, 500),
        [],
    );

    const dispatch = useAppDispatch();

    const onSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        debouncedFilter(e.target.value);
    };

    const submitForm = (e: React.MouseEvent) => {
        e.preventDefault();

        setSearchQuery('');
    };
    return (
        <Navbar className='m-navbar position-fixed' bg='light' expand='md'>
            <Container fluid='lg' className='d-flex gap-3 position-relative'>
                <h2 role='button' className='cursor-pointer lh-lg me-3 my-0'>
                    LOGO
                </h2>
                <Navbar.Collapse className='me-auto' id='navbarScroll'>
                    <Nav
                        className='m-nav gap-2 me-auto my-2 my-lg-0'
                        style={{ maxHeight: '200px' }}
                    >
                        <Nav.Link href='#action1'>Home</Nav.Link>
                        <Nav.Link href='#action2'>Link</Nav.Link>
                        <Nav.Link href='#action6'>Link</Nav.Link>
                    </Nav>
                    <div className='nav-buttons d-flex gap-3 mb-3 mb-md-0 me-2'>
                        <CoolBtn title='Login' />
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
