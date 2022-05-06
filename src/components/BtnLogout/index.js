import React, { useContext, useState } from 'react'
import { HiOutlineLogout } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { FirebaseContext } from '../Firebase'
import { removeUser } from '../../Redux/actions/Users'
import { removeParams } from '../../Redux/actions/Parametres'
import ReactTooltip from 'react-tooltip'
//import Modal2Confirmation from '../Modal2Confirmation'



const BtnLogout = () => {

    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()
    //const [openModal, setOpenModal] = useState(false)

    //bouton LogOut
    const handleLogout = () => {
        firebase.signoutUser()
        dispatch(removeUser())
        dispatch(removeParams())
    }


    /* //fermeture des modals
    const hideModal = () => {
        setOpenModal(false)
    }

    //Ouverture du modal et recupération des infos
    const showModal = (type, id) => {
        setOpenModal(true)
    }

    //activation du modal de double confirmation
    const displayModal = openModal && 
    <Modal2Confirmation 
        hideModal={hideModal} 
        handleConfirm={handleLogout}
        textValue='Êtes-vous sûr de vouloir vous déconnecter ?'/>

 */

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

            {/* displayModal */}
        </>
    )
}

export default BtnLogout