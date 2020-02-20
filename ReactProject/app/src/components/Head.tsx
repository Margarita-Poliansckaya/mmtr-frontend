import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

function Head(): object {
    return (
        <div className='header'>
            <InputGroup className="mb-3 header__search">
                <FormControl className = 'header__search-input'
                    placeholder="Поиск по новостям" />
                <InputGroup.Append>
                    <Button className = 'header__search-button' variant="outline-secondary">Найти</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>

    )
}

export default Head;