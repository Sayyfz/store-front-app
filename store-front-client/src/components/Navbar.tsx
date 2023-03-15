import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CoolBtn from './CoolBtn';
import CoolSearch from './CoolSearch';
import '../styles/nav.scss';
import React, { useState } from 'react';

const NavbarComp = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const onSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const submitForm = (e: React.MouseEvent) => {
        e.preventDefault();

        setSearchQuery('');
    };
    return (
        <Navbar className='m-navbar' bg='light' expand='md'>
            <Container fluid='lg' className='d-flex gap-3'>
                <h2 role='button' className='cursor-pointer me-3 my-0'>
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
                        <Button onClick={e => submitForm(e)} className='nav-search' variant=''>
                            <img src='/Assets/search-icon.svg' alt='Search' width={32} />
                        </Button>
                    </Form>
                </Navbar.Collapse>

                <Navbar.Toggle aria-controls='navbarScroll' />
            </Container>
        </Navbar>
    );
};

export default NavbarComp;
