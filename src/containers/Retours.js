import React, { useContext } from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FirebaseContext } from '../components/Firebase'
import { addArticleRetour, retournerRetour } from '../Redux/actions/Retours'


const ContainerRetour = () => {
    
    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //Redux
    const listRetours = useSelector(state => state.retours)


    //Marqué comme Retourner (ou non) un bon de retour
    const handleToggleRetourner = retour => {
        if (retour.retourner) {
            //Retiré de la commande
            firebase.disableRetournerRetour(retour.id)
            .then(() => {
                dispatch(retournerRetour(retour.id, !retour.retourner))
            })
            .catch(err => {
                console.log('firebase.disableRetournerRetour', err);
            })
        } else {
            //Remettre dans la commande
            firebase.enableRetournerRetour(retour.id)
            .then(() => {
                dispatch(retournerRetour(retour.id, !retour.retourner))
            })
            .catch(err => {
                console.log('firebase.enableRetournerRetour', err);
            })
        }
    }


    // afficher / Imprimer le bon de retour
    const handleShow = retour => {
        const retourId = retour.id
        if (retour.articles.length === 0) {
            firebase.getArticleRetour(retourId)
            .then((docs) => {
                docs.forEach((doc) => {   
                    dispatch(addArticleRetour(doc.data())) 
                })
                navigate('/retourPrint/' + retourId)
            })
            .catch(err => {
                console.log('firebase.getArticleRetour', err)
            }) 
        } else {
            navigate('/retourPrint/' + retourId)
        }  
    }


    //Affichage de l'etat des retours
    const displayStateRetour = value => {
        if (value) {
            return <Badge bg="info" className='me-2'>Retourné</Badge>
        } else {
            return <Badge bg="danger" className='me-2'>Non retourné</Badge>
        }
    }

    //Affichage au format prix
    const currencyLocalPrice = prix => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
    }

    
    //affichage des bon de retours
    const displayRetours = listRetours.length ? 
    listRetours.map(retour => {
        return (
            <Accordion.Item eventKey={`${retour.id}`} key={retour.id}>
                <Accordion.Header>
                    {displayStateRetour(retour.retourner)}
                    {retour.date} : Bon de retour n° {retour.numRetour} - Total 
                    : {currencyLocalPrice(retour.montant)}
                </Accordion.Header>
                <Accordion.Body style={{backgroundColor: '#f5f9fe'}}>
                    <Card.Body className='text-start'>
                        <Card.Title>Bon de retour : {retour.numRetour}</Card.Title>
                        <Card.Subtitle className="text-muted">Créé : {retour.date + ' - ' + retour.user_name}</Card.Subtitle>
                        <Card.Text className='mt-3'>
                            <span>
                                <strong>Montant :</strong>{' ' + currencyLocalPrice(retour.montant)}
                            </span>
                            <span className='ms-4'>
                                <strong>Nb d'Articles :</strong>{' ' + retour.nbArticles}
                            </span>
                        </Card.Text>
                        <hr/>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex justify-content-start'>
                                <Button variant='success' className='me-4' onClick={() => handleShow(retour)}>
                                    Afficher / Imprimer
                                </Button>
                                <Button 
                                    variant='primary'
                                    onClick={() => handleToggleRetourner(retour)}>
                                    {retour.retourner ? 'Non retourner' : 'Retourner'}
                                </Button>
                            </div>
                        </div>
                    </Card.Body>
                </Accordion.Body>
                
            </Accordion.Item>
        )
    })
    :
    <p>Il n'y a aucun bon de retour pour le moment...</p>
    
    
    //render
    return (
        <Accordion className='mb-5'>
            {displayRetours}
        </Accordion>
    )
}

export default ContainerRetour
