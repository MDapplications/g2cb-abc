import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../Firebase'
import { useDispatch } from 'react-redux'
import { addCommande, removeCommande } from '../../Redux/actions/Commandes'
import ContainerCommandes from '../../containers/Commandes'
import Modal2Confirmation from '../Modal2Confirmation'

const Commandes = () => {

    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()

    //State
    const [currentYear] = useState(new Date().getFullYear())
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [data, setData] = useState('')


    //Récupération des commandes
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
                console.log('firebase.getCommandes', error);
            })
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentYear])


    //Suppression de la commande
    const handleDelete = () => {
        firebase.deleteCommande(data)
        .then(() => {
            dispatch(removeCommande(data))
        })
        .catch(err => {
            console.log('firebase.deleteCommande', err)
        })
    }

    //Fermeture du modal
    const hideModal = () => setOpenModalDelete(false)

    //Ouverture du modal et recupération des infos
    const showModalDelete = id => {
        setData(id)
        setOpenModalDelete(true)
    }

    //activation du modal de double confirmation
    const displayModalDelete = openModalDelete && 
        <Modal2Confirmation 
            hideModal={hideModal} 
            handleConfirm={handleDelete}
            textValue='Êtes-vous sûr de vouloir suppimer cette commande ?'/>



    //render
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
                <ContainerCommandes showModal={showModalDelete}/>               
            </div>    

            {displayModalDelete}
        </>
    )
}

export default Commandes
