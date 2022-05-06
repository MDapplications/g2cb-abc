import React, { useContext, useState } from 'react'
import { Accordion, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FirebaseContext } from '../components/Firebase'
import { addArticleCommande, addBonCommande } from '../Redux/actions/Commandes'



const ContainerCommandes = () => {
    
    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //Selector (redux)
    const listCommandes = useSelector(state => state.commandes)

    //State
    const [currentYear] = useState(new Date().getFullYear())
    


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
                }
            })
            .catch(err => {
                console.log(err)
            }) 
        }
        else {
            navigate('/commandePrint/' + commandeId)
        }  
    }


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
                                <Button variant="success" onClick={() => handleShow(commande)}>
                                    Afficher / Imprimer
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
        </Accordion>
    )
}

export default ContainerCommandes