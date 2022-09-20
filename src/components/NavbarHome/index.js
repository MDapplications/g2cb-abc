import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import BtnLogout from '../BtnLogout'


const NavbarHome = () => {


    //Redux
    const user = useSelector(state => state.user)

    //States
    const [username, setUsername] = useState(user.prenom + ' ' + user.nom)

    //Style
    const navBarColor = {
        backgroundColor: '#bbbbbb'
    }

    // Au chargement du composant
    useEffect(() => {
        setUsername(user.prenom + ' ' + user.nom)
    }, [user])


    //Affichage de l'accès au Dashboard
    const accessDashboard = user.role >= 2 ? 
    <Link className='nav-link-home' to='/admin'>Tableau de bord</Link>
    :
    <></>
    

    //render
    return (
        <nav className='navbar navbar-expand py-sm-0 navbar-light' style={navBarColor}>
            <div className='container-fluid'>
                <div className='ms-md-1'>{username}</div>
                
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
               
                <div className='collapse navbar-collapse justify-content-end' id='navbarNavDropdown'>
                    <ul className='navbar-nav me-lg-4'>
                        <li className='nav-item'>
                            <a
                                className='nav-link-home' 
                                target="_blank" 
                                rel='noopener noreferrer'
                                href='https://www.lardesports.com/badminton.html'
                                data-for='linkLardesport' 
                                data-tip='Ouvrir le site Lardesport dans un nouvel onglet'>
                                    Lardesport
                            </a>
                        </li>
                        <li className='nav-item'>
                            {accessDashboard}
                        </li>
                        <ReactTooltip id="linkLardesport" place="left" effect="solid"/>
                    </ul>

                    <BtnLogout/>

                </div>
            </div>
        </nav>
    )
}


export default NavbarHome
