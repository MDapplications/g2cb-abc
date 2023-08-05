import React, { useContext } from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FirebaseContext } from '../components/Firebase'
import { addArticleFacture, addBonFacture, reglerFacture } from '../Redux/actions/Factures'

const ContainerFactures = () => {
    
    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //Redux
    const listFactures = useSelector(state => state.factures)

    
    // afficher / Imprimer la commande
    const handleShow = facture => {
        const factureId = facture.id
        if (facture.articles.length === 0) {
            firebase.getArticleFacture(factureId)
            .then((docs) => {
                docs.forEach((doc) => {   
                    dispatch(addArticleFacture(doc.data())) 
                })
                if (facture.bons.length === 0 && facture.nbBons > 0) {
                    firebase.getBonFacture(factureId)
                    .then((docs) => {
                        docs.forEach((doc) => { 
                            dispatch(addBonFacture(doc.data())) 
                        })
                        navigate('/facturePrint/' + factureId)
                    })
                } else {
                    navigate('/facturePrint/' + factureId)
                }
            })
            .catch(err => {
                console.log(err)
            }) 
        } else {
            navigate('/facturePrint/' + factureId)
        }  
    }

    //Passer la facture comme régler (ou non)
    const handleToggleRegler = facture => {
        if (facture.regler) {
            //Retiré de la commande
            firebase.disableReglerFacture(facture.id)
            .then(() => {
                dispatch(reglerFacture({id: facture.id, value: false}))
            })
            .catch(err => {
                console.log('firebase.disableReglerFacture', err);
            })
        } else {
            //Remettre dans la commande
            firebase.enableReglerFacture(facture.id)
            .then(() => {
                dispatch(reglerFacture({id: facture.id, value: true}))
            })
            .catch(err => {
                console.log('firebase.enableReglerFacture', err);
            })
        }
    }

    //affichage de l'etat de l'article
    const displayStateArticle = value => {
        if (value) {
            return <Badge bg="info" className='me-2'>Réglée</Badge>
        } else {
            return <Badge bg="danger" className='me-2'>Non réglée</Badge>
        }
    }

    //Affichage au format prix
    const currencyLocalPrice = prix => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
    }


    //affichage des factures
    const displayFactures = listFactures.length ? 
    listFactures.map(facture => {
        return (
            <Accordion.Item eventKey={`${facture.id}`} key={facture.id}>
                <Accordion.Header>
                    {displayStateArticle(facture.regler)}
                    {facture.date} : Facture n° {facture.numFacture} - {facture.user_name} - Total 
                    : {currencyLocalPrice(facture.montant)}
                </Accordion.Header>
                <Accordion.Body style={{backgroundColor: '#f5f9fe'}}>
                    <Card.Body className='text-start'>
                        <Card.Title>Facture : {facture.numFacture}</Card.Title>
                        <Card.Subtitle className="text-muted">Créé : {facture.date + ' - ' + facture.user_name}</Card.Subtitle>
                        <Card.Text className='mt-3'>
                            <span>
                                <strong>Montant :</strong>{' ' + currencyLocalPrice(facture.montant)}
                            </span>
                            <span className='ms-4'>
                                <strong>Nb d'Articles :</strong>{' ' + facture.nbArticles}
                            </span>
                            <span className='ms-4'>
                                <strong>Nb de bons :</strong>{' ' + facture.nbBons}
                            </span>
                        </Card.Text>
                        <hr/>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex justify-content-start'>
                                <Button variant="success" className='me-4' onClick={() => handleShow(facture)}>
                                    Afficher / Imprimer
                                </Button>
                                <Button variant="primary" onClick={() => handleToggleRegler(facture)}>
                                    {facture.regler ? 'Facture non réglée' : 'Facture réglée'}
                                </Button>
                            </div>
                        </div>
                    </Card.Body>
                </Accordion.Body>
                
            </Accordion.Item>
        )
    })
    :
    <p>Il n'y a aucune facture pour le moment...</p>


    //render
    return (
        <Accordion className='mb-2'>
            {displayFactures}
        </Accordion>
    )
}

export default ContainerFactures
