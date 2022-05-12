import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Logo } from '../Logo'

const Header = () => {
    return (
        <header className='d-print-none'>
            <Navbar bg="primary" variant="light">
                    <Link to='/' className='display-6 text-decoration-none text-white mx-2'>
                        <img
                            alt='logo du club'
                            src={Logo}
                            width="50"
                            height="50"
                            className="d-inline-block align-center"
                        />{' '}
                        Plateforme du club ABC
                    </Link>
            </Navbar>
    
        </header>
    )
}

export default Header