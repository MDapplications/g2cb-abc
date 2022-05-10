import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContainerDepot from '../../containers/Depot'
import { addCommande } from '../../Redux/actions/Commandes'
import { addArticleDepot } from '../../Redux/actions/Depot'
import { FirebaseContext } from '../Firebase'
import { addArticlePrepaFactDepot, addBonPrepaFactDepot, addPrepaFactDepot } from '../../Redux/actions/PrepaFactDepot'
import { Button } from 'react-bootstrap'
import { addBonDepot } from '../../Redux/actions/BonsDepot'
import ModalBonsDepot from '../ModalBonsDepot'

const Depots = () => {

    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()

    //Redux
    const articlesDepot = useSelector(state => state.depot)
    const listFactures = useSelector(state => state.prepaFactDepot)
    const bonsDepot = useSelector(state => state.bonsDepot)

    //State
    const [currentYear] = useState(new Date().getFullYear())
    const [openModalBons, setOpenModalBons] = useState(false)


    //Initialisation des compteurs
    useEffect(() => {
            
        //Getting des factures
        if(!localStorage.getItem('Depot')) {
            console.log("Création de la liste des articles en dépôts")
            firebase.getArticleDepot()
            .then((docs) => {
                docs.forEach((doc) => {   
                    dispatch(addArticleDepot(doc.data()))
                })
            })
            .catch((error) => {
                console.log('firebase.getArticleDepot', error);
            })

        }

        //Getting des commandes
        if(!localStorage.getItem('BonsDepot')) {
            console.log("Création de la liste des bons pour dépôt")
            firebase.getBonDepot()
            .then((docs) => {
                docs.forEach(doc => {
                    dispatch(addBonDepot(doc.data()))
                })
            })
            .catch(err => {
                console.log('firebase.getBonDepot', err);
            })
        }

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
    }, [])



    //Gestion de la preparation de facturation
    useEffect(() => {
        //On récupère les articles/bons et infos pour la facturation
        articlesDepot.forEach(article => {
            if(article.forFacture){
                if (!(article.user_id in listFactures)) {
                    dispatch(addPrepaFactDepot(article))        
                } else {
                    if (!(listFactures[article.user_id]['articles'].includes(article.id))) {
                        dispatch(addArticlePrepaFactDepot(article))
                    }
                }
            }
        })
        bonsDepot.forEach(bon => {
            if (bon.forFacture){
                if (bon.user_id in listFactures) {
                    if (!(listFactures[bon.user_id]['bons'].includes(bon.id))) {
                        dispatch(addBonPrepaFactDepot(bon))
                    }       
                }
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articlesDepot, bonsDepot])
   

    //fermeture du modal
    const hideModal = () => setOpenModalBons(false)

    // Affichage ou non du Modal des bons
    const displayModalBons = openModalBons && <ModalBonsDepot hideModal={hideModal}/>


    //render
    return (
        <>
            <main role='main'>
                <div className='p-2 bg-light border rounded-3'>
                    <div className='container text-center justify-content-center'>
                        <h1 className='display-6'>Dépôt</h1>
                        <p>Gérer les articles du dépôt. Vous pouvez facturer ou retourner les articles depuis cet espace.</p>
                    </div>

                    <div className='d-flex justify-content-end align-items-center pe-3'>
                        <Button variant='dark' className='me-2' onClick={() => setOpenModalBons(true)}>Gestion des bons</Button>
                        <Button variant='success' className='me-2'>Créer les factures</Button> 
                        <Button variant='success'>Créer un bon de retour</Button>     
                    </div>

                </div>
            </main>

            <div className='text-center justify-content-center m-4'>
                <ContainerDepot/>            
            </div>

            {displayModalBons}
        </>
        
    )
}

export default Depots
