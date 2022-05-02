import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'
import Login from '../Login'
import Signup from '../Signup'

const Welcome = () => {
    
    const [openModal, setOpenModal] = useState(false)
    const firebase = useContext(FirebaseContext)
    const navigate = useNavigate()


    //Redirection vers Home si vous êtes authentifié
    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {if (user) {navigate('/')}})
        return () => {listener()}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    //Ouverture du modal
    const showModalSignup = () => {
        setOpenModal(true)
    }

    //fermeture du modal
    const hideModalSignup = () => {
        setOpenModal(false)
    }

    //activation du modal 'Signup'
    const displayModal = openModal && <Signup hideModal={hideModalSignup} />

    //render
    return (
        <>
            <Login showModal={showModalSignup} />
            {displayModal}
        </>
    )
}

export default Welcome
