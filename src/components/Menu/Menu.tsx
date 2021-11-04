import React, { useState } from 'react';
import './Menu.css';
import { Container, Navbar, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export interface MenuProps {
    title: string;
    query: any;
}

function Menu({title, query}: MenuProps) {
    const [search, setSearch] = useState('');
    const updateSearch = (e: any) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (search === '') {
            alert('Please type a value to search');
        } else {
            query(search);
            setSearch('');
        }
    };

    return(
        <Navbar bg="light" expand="lg">
            <Container fluid className="mx-sm-4 pe-sm-4">
                <Navbar.Brand href="/"><FontAwesomeIcon icon={faGithub}/>{title}</Navbar.Brand>
                <Navbar.Text>
                    <Form onSubmit={handleSubmit}>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2 pe-2"
                            aria-label="Search"
                            size="sm"
                            value={search}
                            onChange={updateSearch}
                        />
                    </Form>
                </Navbar.Text>
            </Container>
        </Navbar>
    )
};
export default Menu;
