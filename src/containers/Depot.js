import React, { useContext } from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { FirebaseContext } from '../components/Firebase'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineCheck } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import { facturableArticleDepot, retournableArticleDepot } from '../Redux/actions/Depot'
import { addArticleCommande, addBonCommande } from '../Redux/actions/Commandes'
import { removeAllPrepaFactDepot } from '../Redux/actions/PrepaFactDepot'


const ContainerDepot = () => {
    
    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //Redux
    const articlesDepot = useSelector(state => state.depot)
    const listCommandes = useSelector(state => state.commandes)
    const listFactures = useSelector(state => state.prepaFactDepot)
    

    //Style
    const paddingBadge = {padding: '8px'} //style des badge 'ForFacture' et 'ForRetour


    // afficher / Imprimer la commande
    const handleShowCommande = commandeId => {
        const commande = listCommandes.find(data => data.id === commandeId)

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
                        console.log('firebase.getBonCommande', err)
                    }) 
                }
            })
            .catch(err => {
                console.log('firebase.getArticleCommande', err)
            }) 
        }
        else {
            navigate('/commandePrint/' + commandeId)
        }  
    }



    //Mettre (ou pas) en facturation ou en retour
    const handleToggle = (type, id, value) => {
        switch (type) {
            case 'forFacture':
                if (value) {
                    //Retir?? de la facturation
                    firebase.disableForFactureArticle(id)
                    .then(() => {
                        dispatch(facturableArticleDepot(id, !value))
                        dispatch(removeAllPrepaFactDepot())
                    })
                    .catch(err => {
                        console.log('firebase.disableForFactureArticle', err);
                    })
                } else {
                    //Mettre en facturation
                    firebase.enableForFactureArticle(id)
                    .then(() => {
                        dispatch(facturableArticleDepot(id, !value))
                        dispatch(removeAllPrepaFactDepot())
                    })
                    .catch(err => {
                        console.log('firebase.enabledForFactureArticle', err);
                    })
                }
                    
                break;
            case 'forRetour':
                if (value) {
                    //Retir?? du retour
                    firebase.disableForRetourArticle(id)
                    .then(() => {
                        dispatch(retournableArticleDepot(id, !value))
                    })
                    .catch(err => {
                        console.log('firebase.disableForRetourArticle', err);
                    })
                } else {
                    //Mettre en retour
                    firebase.enableForRetourArticle(id)
                    .then(() => {
                        dispatch(retournableArticleDepot(id, !value))
                    })
                    .catch(err => {
                        console.log('firebase.enabledForRetourArticle', err);
                    })
                }
                break;
            default:
                break;
        }
    }


    //Affichage de l'etat de l'article (?? facturer / ?? retourner)
    const displayStateArticle = article => {
        if (article.forFacture) {
            return <>
                <Badge 
                    bg="info" 
                    className='me-2' 
                    style={paddingBadge}
                    data-for='badgeForFacture' 
                    data-tip='Article ?? facturer'>
                        <HiOutlineCheck/>
                </Badge>
                <ReactTooltip id="badgeForFacture" place="left" effect="solid"/>
            </>
        } else if (article.forRetour) {
            return <>
                <Badge 
                    bg="secondary" 
                    className='me-2' 
                    style={paddingBadge}
                    data-for='badgeForRetour' 
                    data-tip='Article ?? retourner'>
                        <HiOutlineCheck/>
                </Badge>
                <ReactTooltip id="badgeForRetour" place="left" effect="solid"/>
            </>
        } else {
            return <Badge bg='ligth' className='me-2' style={paddingBadge}><HiOutlineCheck style={{color: '#ffffff00'}}/></Badge>
        }
    }


    //D??sactivation du bouton 'pour facturation'
    const disableBtnFacture = article => {
        if (article.forRetour) {
            return true 
        } else {
            if (listFactures[article.user_id]) {
                if (listFactures[article.user_id].bons.length === 0) {
                    return false
                } else {
                    return true
                }
            } else {
                return false
            }
            
        }
    }


    //Affichage au format Prix
    const currencyLocalPrice = prix => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
    }
        

    //Affiche les articles
    const displayArticles = articlesDepot.length ? 
        articlesDepot.map(article => {
            return (

                <Accordion.Item eventKey={`${article.id}`} key={article.id}>
                    
                    <Accordion.Header>
                        {displayStateArticle(article)}
                        {`${article.date} - Variante : ${article.variante} | ${article.user_name} - 
                        [${article.reference}]: ${currencyLocalPrice(article.prix)}  (x${article.quantite})`}
                    </Accordion.Header>

                    <Accordion.Body style={{backgroundColor: '#f5f9fe'}}>
                        <Card.Body className='text-start'>
                            <Card.Title>{article.description}</Card.Title>
                            <Card.Subtitle className="text-muted">R??f: {article.reference}</Card.Subtitle>
                            <Card.Text className='mt-2'>
                                <strong>Commande :</strong> {
                                    article.date 
                                    + ' - ' 
                                    + article.commande 
                                    + ' - ' 
                                    + article.user_name}
                            </Card.Text>
                            <Card.Text>
                                <span>
                                    <strong>Qt?? :</strong>{' ' + article.quantite}
                                </span>
                                <span className='ms-4'>
                                    <strong>Prix :</strong>{' ' + currencyLocalPrice(article.prix)}
                                </span>
                                <span className='ms-4'>
                                    <strong>Variante :</strong>{' ' + article.variante}
                                </span>
                            </Card.Text>
                            <hr/>
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex justify-content-start'>
                                    <Button 
                                        className='me-4'
                                        variant="success"
                                        onClick={() => handleShowCommande(article.commande)}>
                                            Voir la commande
                                    </Button>
                                    <Button 
                                        className='me-2'
                                        variant="primary"
                                        onClick={() => handleToggle('forFacture', article.id, article.forFacture)}
                                        disabled={disableBtnFacture(article)}>
                                            ?? facturer
                                    </Button>
                                    <Button 
                                        className='me-2'
                                        variant="primary"
                                        onClick={() => handleToggle('forRetour', article.id, article.forRetour)}
                                        disabled={article.forFacture}>
                                            ?? retouner
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Accordion.Body>

                </Accordion.Item>

            )
        })
    :
    <p>Aucun article dans le d??p??t actuellement.</p>
    


    //render
    return (
        <Accordion className='mb-5'>
            {displayArticles}
        </Accordion>
    )
}

export default ContainerDepot