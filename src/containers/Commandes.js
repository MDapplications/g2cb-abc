import React, { useContext, useEffect, useState } from 'react'
import { Accordion, Button, Card } from 'react-bootstrap'
import { HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FirebaseContext } from '../components/Firebase'
import FormArticleCommande from '../components/FormArticleCommande'
import { addArticleCommandeModif, addBonCommandeModif, loadCommandeModif, removeCommandeModif } from '../Redux/actions/ArticlesCommande'
import { removeFactureModif } from '../Redux/actions/ArticlesFacture'
import { addArticleCommande, addBonCommande, addCommande} from '../Redux/actions/Commandes'



const ContainerCommandes = ({showModal}) => {
    
    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //Redux
    const listCommandes = useSelector(state => state.commandes)

    //State
    const [currentYear] = useState(new Date().getFullYear())
    const [openModalArticles, setOpenModalArticles] = useState(false)
    const [refreshCommande, setRefreshCommande] = useState(false)
 

    console.log(listCommandes)
    
    //Récupération des commandes
    useEffect(() => {
        if (refreshCommande) {
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
            setRefreshCommande(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentYear, refreshCommande])
    

    // afficher / Imprimer la commande
    const handleShow = commande => {
        const commandeId = commande.id
        if (commande.articles.length === 0) {
            firebase.getArticleCommande(commandeId)
            .then((docs) => {
                docs.forEach((doc) => {   
                    dispatch(addArticleCommande(doc.data())) 
                })
                if (commande.bons.length === 0 && commande.nbBons > 0) {
                    firebase.getBonCommande(commandeId)
                    .then((docs) => {
                        docs.forEach((doc) => { 
                            dispatch(addBonCommande(doc.data())) 
                        })
                        navigate('/commandePrint/' + commandeId)
                    })
                    .catch(err => {
                        console.log('firebase.getBonCommande', err);
                    })
                } else {
                    navigate('/commandePrint/' + commandeId)
                } 
            })
            .catch(err => {
                console.log('firebase.getArticleCommande', err)
            }) 
        } else {
            navigate('/commandePrint/' + commandeId)
        }  
    }


    const handleChangeCommande = commande => {
        const commandeId = commande.id
        dispatch(loadCommandeModif(commande))

        if (commande.articles.length === 0) {
            firebase.getArticleCommande(commandeId)
            .then((docs) => {
                docs.forEach((doc) => {   
                    dispatch(addArticleCommandeModif(doc.data()))
                })
                if (commande.bons.length === 0 && commande.nbBons > 0) {
                    firebase.getBonCommande(commandeId)
                    .then((docs) => {
                        docs.forEach((doc) => { 
                            dispatch(addBonCommandeModif(doc.data()))      
                        })
                        setOpenModalArticles(true)
                    })
                    .catch(err => {
                        console.log('firebase.getBonCommande', err);
                    })
                } else {
                    setOpenModalArticles(true)
                }
            })
            .catch(err => {
                console.log('firebase.getArticleCommande', err)
            }) 
        } else {
            commande.articles.forEach(article => dispatch(addArticleCommandeModif(article)))
            
            if (commande.bons.length === 0 && commande.nbBons > 0) {
                commande.bons.forEach(bon => dispatch(addBonCommandeModif(bon)))      
            } 
            setOpenModalArticles(true)
        }
    }

    const hideModal = () => {
        setOpenModalArticles(false)
        dispatch(removeCommandeModif())
        dispatch(removeFactureModif())
        setRefreshCommande(true)
    }

    const showModalArticles = openModalArticles && 
        <FormArticleCommande
            hideModal={hideModal}/>


    //Affichage au format prix
    const currencyLocalPrice = prix => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
    }


    //Afficher la liste des commandes
    const displayCommandes = listCommandes.length ? 
    listCommandes.map(commande => {
        return (
            <Accordion.Item eventKey={`${commande.id}`} key={commande.id}>
                <Accordion.Header>
                    {commande.date} : Commande n° {commande.numCommande} - Total 
                    : {currencyLocalPrice(commande.montant)}
                </Accordion.Header>
                <Accordion.Body style={{backgroundColor: '#f5f9fe'}}>
                    <Card.Body className='text-start'>
                        <Card.Title>Commande : {commande.numCommande}</Card.Title>
                        <Card.Subtitle className="text-muted">Créé : {commande.date + ' - ' + commande.user_name}</Card.Subtitle>
                        <Card.Text className='mt-3'>
                            <span>
                                <strong>Montant :</strong>{' ' + currencyLocalPrice(commande.montant)}
                            </span>
                            <span className='ms-4'>
                                <strong>Nb d'Articles :</strong>{' ' + commande.nbArticles}
                            </span>
                            <span className='ms-4'>
                                <strong>Nb de bons :</strong>{' ' + commande.nbBons}
                            </span>
                        </Card.Text>
                        <hr/>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex justify-content-start'>
                                <Button className='me-2' variant="success" onClick={() => handleShow(commande)}>
                                    Afficher / Imprimer
                                </Button>
                                <Button variant="primary" onClick={() => handleChangeCommande(commande)}>
                                    Modifier la commande
                                </Button>
                            </div>
                            <div style={{display: 'none'}}>
                                <Button variant="danger" onClick={() => showModal(commande.id)}>
                                    <HiOutlineTrash/>
                                </Button>
                            </div>
                        </div>
                    </Card.Body>
                </Accordion.Body>
                
            </Accordion.Item>
        )
    })
    :
    <p>Il n'y a eu aucune commande pour {currentYear} jusque maintenant.</p>
    
    
    //render
    return (
        <Accordion className='mb-2'>
            {displayCommandes}
            {showModalArticles}
        </Accordion>
    )
}

export default ContainerCommandes