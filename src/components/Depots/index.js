import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContainerDepot from '../../containers/ContainerDepot'
import { addCommande } from '../../Redux/actions/Commandes'
import { addArticleDepot } from '../../Redux/actions/Depot'
import { FirebaseContext } from '../Firebase'
import { addArticlePrepaFactDepot, addPrepaFactDepot } from '../../Redux/actions/PrepaFactDepot'
import { Button } from 'react-bootstrap'

const Depots = () => {

    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()

    //Redux
    const articlesDepot = useSelector(state => state.depot)
    const listFactures = useSelector(state => state.prepaFactDepot)

    //State
    const [currentYear] = useState(new Date().getFullYear())


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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articlesDepot])


    const handleTest = () => {
        firebase.getBonDepot()
        .then((docs) => {
            docs.forEach(doc => console.log(doc.data()))
        })
        .catch(err => {
            console.log('firebase.getBonDepot', err);
        })
    }



    return (
        <>
            <main role='main'>
                <div className='p-2 bg-light border rounded-3'>
                    <div className='container text-center justify-content-center'>
                        <h1 className='display-6'>Dépôt</h1>
                        <p>Gérer les articles du dépôt. Vous pouvez facturer ou retourner les articles depuis cet espace.</p>
                    </div>

                    <div className='d-flex justify-content-end align-items-center'>
                        <span className='pe-5'>
                            <Button variant='success' onClick={handleTest}>test</Button>
                        </span>                        
                    </div>

                </div>
            </main>

            <div className='text-center justify-content-center m-4'>
                <ContainerDepot/>            
            </div>
        </>
        
    )
}

export default Depots
