import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../Firebase'
import { useDispatch } from 'react-redux'
import { addFacture } from '../../Redux/actions/Factures'
import ContainerFactures from '../../containers/Factures'


const Factures = () => {

    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()

    //State
    const [currentYear] = useState(new Date().getFullYear())


    //Récupération des factures
    useEffect(() => {
        //Getting des factures
        if(!localStorage.getItem('Factures')) {
            console.log("Création de la liste des factures")
            firebase.getFactures(currentYear)
            .then((docs) => {
                docs.forEach((doc) => {   
                    dispatch(addFacture(doc.data()))
                })
            })
            .catch((error) => {
                console.log('firebase.getFactures', error);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentYear])


    //render
    return (
        <>
            <main role='main'>
                <div className='p-2 bg-light border rounded-3'>
                    <div className='container text-center justify-content-center'>
                        <h1 className='display-6'>Factures</h1>
                        <p>Historique des factures. Vous pouvez changer leur statut comme <span className='badge rounded-pill bg-info text-white'>Réglée</span> ou la générer de nouveau en PDF.</p>
                    </div>
                </div>
            </main>

            <div className='text-center justify-content-center m-4'>
                <ContainerFactures/>            
            </div>
        </>
        
    )
}

export default Factures