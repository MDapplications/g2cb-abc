import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

    const spanMinSize = {fontSize: '0.75em'}

    return (
        <footer className='footer text-white bg-primary bg-gradient mt-5 d-flex flex-row component-footer d-print-none'>
            <div className='p-2 container text-center'>
                {/* &copy; MDev 2022 - */}<span>Plateforme ABC - Association de Badminton Cosacien</span> 
            </div>
            <div className='p-2 container text-end'>
                <span style={spanMinSize} >
                    <Link to="/mentions" className="link-light" style={{textDecoration: 'none'}}>Mentions légales</Link>
                </span>
                <span style={spanMinSize}> - </span>
                <span style={spanMinSize}>
                    <Link to="/conditions" className="link-light" style={{textDecoration: 'none'}}>CGU</Link>
                </span>
            </div>
        </footer>
    )
}

export default Footer
