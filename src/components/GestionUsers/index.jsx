import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ContainerUsers from '../../containers/ContainerUsers'
import { addUsers } from '../../Redux/actions/Utilisateurs'
import { FirebaseContext } from '../Firebase'


const GestionUsers = () => {

    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()

    //Initialisation des compteurs
    useEffect(() => {
        
        //Getting des commandes
        if(!localStorage.getItem('listUsers')) {
            console.log("Création de la liste des utilisateurs")
            firebase.getUsers()
            .then((docs) => {
                docs.forEach((doc) => {   
                    dispatch(addUsers({...doc.data(), id: doc.id}))
                })
            })
            .catch((error) => {
                console.log('firebase.getUsers', error);
            })
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    //render
    return (
        <>
            <main role='main'>
                <div className='p-2 bg-light border rounded-3'>
                    <div className='container text-center justify-content-center'>
                        <h1 className='display-6'>Gestion des utilisateurs</h1>
                    </div>
                </div>
            </main> 

            <div className='text-center justify-content-center m-4'>
                <ContainerUsers/>
            </div>
        </>
    )
}

export default GestionUsers
