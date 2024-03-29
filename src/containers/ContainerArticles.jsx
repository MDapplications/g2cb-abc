import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Accordion, Badge, Button, Card } from "react-bootstrap"
import { HiOutlineTrash, HiOutlineCheck } from 'react-icons/hi'
import { commandableArticleStandby } from '../Redux/actions/ArticlesStandby'
import { FirebaseContext } from '../components/Firebase'
import { commandableBonStandby } from '../Redux/actions/BonsStandby'
import { removeAllPrepaFacture } from '../Redux/actions/PrepaFactures'


const ContainerArticles = ({showModalDelete, showModalClub}) => {

    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()

    //Redux
    const articlesStandby = useSelector(state => state.articlesStandby)
    const bonsStandby = useSelector(state => state.bonsStandby)
    const parametres = useSelector(state => state.parametres)


    //Style
    const paddingBadgeCmd = {padding: '8px'} //style des badge 'ForCommande'

    
    //renvoie le texte : "Achat" ou "Dépôt" selon la destination (true | false)
    //format badge
    const displayDestination = destination => {
        if (destination) {
            return <Badge bg='primary' className='me-2'>Achat</Badge>
        } else {
            return <Badge bg='secondary' className='me-2'>Dépôt</Badge>
        }
    }

    //Activer / désactiver l'article pour une commande
    const displayForCommande = value => {
        if (value) {
            return <Badge bg="success" className='me-2' style={paddingBadgeCmd}><HiOutlineCheck/></Badge>
        } else {
            return <Badge bg='ligth' className='me-2' style={paddingBadgeCmd}><HiOutlineCheck style={{color: '#ffffff00'}}/></Badge>
        }       
    }


    //Mettre (ou pas) dans la commande
    const handleToggleCommande = (type, id, value) => {
        
        switch (type) {
            case 'article':
                if (value) {
                    //Retiré de la commande
                    firebase.disableForCommandeArticle(id)
                    .then(() => {
                        dispatch(removeAllPrepaFacture())
                        dispatch(commandableArticleStandby({id, value: false}))
                    })
                    .catch(err => {
                        console.log(err);
                    })
                } else {
                    //Remettre dans la commande
                    firebase.enableForCommandeArticle(id)
                    .then(() => {
                        dispatch(removeAllPrepaFacture())
                        dispatch(commandableArticleStandby({id, value: true}))
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
                break;
            case 'bon':
                if (value) {
                    //Retiré de la commande
                    firebase.disableForCommandeBon(id)
                    .then(() => {
                        dispatch(removeAllPrepaFacture())
                        dispatch(commandableBonStandby({id, value: false}))
                    })
                    .catch(err => {
                        console.log(err);
                    })
                } else {
                    //Remettre dans la commande
                    firebase.enableForCommandeBon(id)
                    .then(() => {
                        dispatch(removeAllPrepaFacture())
                        dispatch(commandableBonStandby({id, value: true}))
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
                break;
            default:
                break;
        }
    }


    //affichage au format prix
    const currencyLocalPrice = prix => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
    }


    //Affichage du bouton 'Mettre au nom du club'
    const displayBtnClub = article => article.user_name !== parametres.club &&
    <Button 
        variant="primary" 
        onClick={() => showModalClub(article.id)}>
            Mettre au nom du club
    </Button>

    
    //Affiche les articles
    const displayArticles = articlesStandby.length ? 
        articlesStandby.map(article => {
            return (
                <Accordion.Item eventKey={`${article.id}`} key={article.id}>
                    
                    <Accordion.Header>
                        {displayForCommande(article.forCommande)}
                        <Badge bg="info" className='me-2'>Article</Badge>
                        {displayDestination(article.destination)}
                        {`${article.date} - ${article.user_name} - [${article.reference}]: ${currencyLocalPrice(article.prix)} (x${article.quantite})`}
                    </Accordion.Header>

                    <Accordion.Body style={{backgroundColor: '#f5f9fe'}}>
                        <Card.Body className='text-start'>
                            <Card.Title>{article.description}</Card.Title>
                            <Card.Subtitle className="text-muted">Réf: {article.reference}</Card.Subtitle>
                            <Card.Text>Commandé le : {article.date}</Card.Text>
                            <Card.Text className='mt-3'>
                                <strong>Membre :</strong>{' ' + article.user_name}
                            </Card.Text>
                            <Card.Text>
                                <strong>Variante :</strong>{' ' + article.variante}<br/>
                                <strong>Prix :</strong>{' ' + currencyLocalPrice(article.prix)}<br/>
                                <strong>Qté :</strong>{' ' + article.quantite}<br/>
                            </Card.Text>
                            <hr/>
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex justify-content-start'>
                                    <Button 
                                        className='me-2'
                                        variant="primary" 
                                        onClick={() => handleToggleCommande('article', article.id, article.forCommande)}>
                                            {article.forCommande ? 'Ne pas commander' : 'Commander'}
                                    </Button>
                                    {displayBtnClub(article)}
                                </div>
                                <div>
                                    <Button variant="danger" onClick={() => showModalDelete('article', article.id)}>
                                        <HiOutlineTrash/>
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Accordion.Body>

                </Accordion.Item>)
        })
    :
    <p>Aucun article en attente</p>


    //Affiche les bons
    const displayBons = bonsStandby.length ? 
    bonsStandby.map(bon => {
        return (

            <Accordion.Item eventKey={`${bon.id}`} key={bon.id}>
                
                <Accordion.Header>
                    {displayForCommande(bon.forCommande)}
                    <Badge bg="dark" className='me-2'>Bon</Badge>
                    {`${bon.date} - ${bon.user_name} - [${bon.reference}]: ${currencyLocalPrice(bon.montant)}`}
                </Accordion.Header>

                <Accordion.Body style={{backgroundColor: '#f5f9fe'}}>
                    <Card.Body className='text-start'>
                        <Card.Title>Bon de réduction</Card.Title>
                        <Card.Subtitle className="text-muted">Réf: {bon.reference}</Card.Subtitle>
                        <Card.Text>Commandé le : {bon.date}</Card.Text>
                        <Card.Text className='mt-3'>
                            <strong>Membre :</strong>{' ' + bon.user_name}
                        </Card.Text>
                        <Card.Text>
                            <strong>Montant :</strong>{' ' + currencyLocalPrice(bon.montant)}
                        </Card.Text>
                        <hr/>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex justify-content-start'>
                                <Button variant="primary" onClick={() => handleToggleCommande('bon', bon.id, bon.forCommande)}>
                                    {bon.forCommande ? 'Ne pas commander' : 'Commander'}
                                </Button>
                            </div>
                            <div className=''>
                                <Button variant="danger" onClick={() => showModalDelete('bon', bon.id)}>
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
    null


    //render
    return (
        <Accordion className='mb-5'>
            {displayBons}
            {displayArticles}
        </Accordion>
    )
}

export default ContainerArticles
