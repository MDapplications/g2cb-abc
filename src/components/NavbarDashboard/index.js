import React, { useEffect, useState } from 'react'
import { changeSelectYear } from '../../Redux/actions/Parametres'
import { removeAllCommande } from '../../Redux/actions/Commandes'
import ReactTooltip from 'react-tooltip'
import { HiOutlineHome } from 'react-icons/hi'
import { BsGear } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BtnLogout from '../BtnLogout'
import { Form } from 'react-bootstrap'
import { removeAllFacture } from '../../Redux/actions/Factures'
import { removeAllRetour } from '../../Redux/actions/Retours'


const NavBarDashboard = () => {

    //Redux
    const user = useSelector(state => state.user)
    const parameters = useSelector(state => state.parametres)

    //Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //State
    const [username, setUsername] = useState('')
    const [selectYear, setSelectYear] = useState(parameters.yearSelected)


    // Au chargement du composant
    useEffect(() => {
        setUsername(user.prenom + ' ' + user.nom)
    }, [user])
    
    //style
    const navBarColor = {backgroundColor: '#bbbbbb'}

    //handles
    const handleHome = () => navigate("/")
    const handleParametres = () => navigate('parametres')

    const handleChange = event => {
        const year = event.target.value
        if (isNaN(year) === false) {
            if (year >= parameters.minYear && year <= new Date().getFullYear()) {
                setSelectYear(year)
                dispatch(changeSelectYear(Number(year)))

                dispatch(removeAllCommande())
                dispatch(removeAllFacture())
                dispatch(removeAllRetour())

                localStorage.removeItem('Commandes')
                localStorage.removeItem('Factures')
                localStorage.removeItem('Retours')
            }
        }        
    }


    //render
    return (
        <nav className='navbar navbar-expand py-sm-0 navbar-light' style={navBarColor}>
            <div className='container-fluid'>
                <div className='ms-md-1'>
                    <strong>{username}</strong>{` | Selection de l'année :`}
                </div>
                <Form.Control 
                    className='ms-md-2 pe-0 ps-2 py-1' 
                    type="number" 
                    value={selectYear}
                    min={parameters.minYear} 
                    max={new Date().getFullYear()}
                    onChange={event => handleChange(event)}
                    style={{width:90}}
                />
                
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
               
                <div className='collapse navbar-collapse justify-content-end' id='navbarNavDropdown'>
                    <ul className='navbar-nav me-lg-4'>
                        <li className='nav-item'>
                            <Link className='nav-link-home' to='/admin'>Articles en attente</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link-home' to='commandes'>Commandes</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link-home' to='factures'>Factures</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link-home' to='depots'>Dépôts</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link-home' to='retours'>Retours</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link-home' to='users'>Gestion des utilisateurs</Link>
                        </li>

                    </ul>

                    <button 
                        type="button" 
                        className="btn btn-primary me-lg-2" 
                        onClick={handleHome}
                        data-for='buttonHome' 
                        data-tip="Retour vers la page principale">
                            <HiOutlineHome/> Accueil
                    </button>

                    <button 
                        type="button" 
                        className="btn btn-success me-lg-2" 
                        onClick={handleParametres}
                        data-for='buttonParametres' 
                        data-tip="Vos paramètres">
                            <BsGear/>
                    </button>
                        
                    {/* Bouton LogOut */}
                    <BtnLogout/>


                    {/* Tooltip */}
                    <ReactTooltip id="buttonHome" place="top" effect="solid"/>
                    <ReactTooltip id="buttonParametres" place="top" effect="solid"/>

                </div>
            </div>
        </nav>
    )
}


export default NavBarDashboard
