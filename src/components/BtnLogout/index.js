import React, { useContext } from 'react'
import { HiOutlineLogout } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { FirebaseContext } from '../Firebase'
import { removeUser } from '../../Redux/actions/Users'
import { removeParams } from '../../Redux/actions/Parametres'
import ReactTooltip from 'react-tooltip'
import { loadCommande } from '../../Redux/actions/Commandes'

const BtnLogout = () => {

    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()

    //bouton LogOut
    const handleLogout = () => {
        firebase.signoutUser()
        dispatch(removeUser())
        dispatch(removeParams())

        //Suppression des commandes
        localStorage.setItem('Commandes', JSON.stringify([]))
        dispatch(loadCommande())
    }

    //render
    return (
        <>
            <button 
                type="button" 
                className="btn btn-danger" 
                onClick={handleLogout}
                data-for='buttonLogout' 
                data-tip='Déconnexion'>
                    <HiOutlineLogout/>
            </button>

            <ReactTooltip id="buttonLogout" place="left" effect="solid"/>
        </>
    )
}

export default BtnLogout