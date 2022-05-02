import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ContainerCommandes from '../../containers/ContainerCommandes'
import { addCommande } from '../../Redux/actions/Commandes'
import { FirebaseContext } from '../Firebase'


const Commandes = () => {

    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()

    //State
    const [currentYear] = useState(new Date().getFullYear())


    //Initialisation des compteurs
    useEffect(() => {
        
        //Getting des commandes
        if(!localStorage.getItem('Commandes')) {
            console.log("Création de la liste des commandes")
            firebase.getCommandes(currentYear)
            .then((docs) => {
                docs.forEach((doc) => {   
                    dispatch(addCommande(doc.data()))
                })
            })
            .catch((error) => {
                console.log(error);
            })

        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentYear])








    return (
        <>
            <main role='main'>
                <div className='p-2 bg-light border rounded-3'>
                    <div className='container text-center justify-content-center'>
                        <h1 className='display-6'>Commandes</h1>
                        <p>Historique de vos commandes. Générer de nouveau la commande en PDF ici.</p>
                    </div>
                </div>
            </main>

            <div className='text-center justify-content-center m-4'>
                <ContainerCommandes/>               
            </div>    
        </>
    )
}

export default Commandes
