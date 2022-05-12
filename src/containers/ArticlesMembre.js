import React from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { removeArticleMembre } from '../Redux/actions/ArticlesMembre'
import { removeBonMembre } from '../Redux/actions/BonsMembre'


const ArticlesMembre = () => {
    
    //Redux
    const articlesMembre = useSelector(state => state.articlesMembre)
    const bonsMembre = useSelector(state => state.bonsMembre)

    //Hooks
    const dispatch = useDispatch()

    // mettre au format prix
    const currencyLocalPrice = prix => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
    }


    //renvoie le texte : "Achat" ou "Dépôt" selon la destination (true | false)
    //format badge
    const displayDestination = destination => {
        if (destination) {
            return <Badge bg='primary' className='me-2'>Achat</Badge>
        } else {
            return <Badge bg='secondary' className='me-2'>Dépôt</Badge>
        }
    }

    //Si aucune data à afficher
    const displayNoData = () => (articlesMembre.length === 0 && bonsMembre.length === 0) ? <p>Aucun article</p> : <></>



    //Affiche les articles
    const displayArticles = articlesMembre.length ? 
    articlesMembre.map(article => {
            return (

                <Accordion.Item eventKey={`${article.id}`} key={article.id}>
                    
                    <Accordion.Header>
                        <Badge bg="info" className='me-2'>Article</Badge>
                        {displayDestination(article.destination)}
                        {`[${article.reference}] - ${article.description}: ${currencyLocalPrice(article.prix)} (x${article.quantite})`}
                    </Accordion.Header>

                    <Accordion.Body style={{backgroundColor: '#f5f9fe', padding: '0'}}>
                        <Card.Body className='text-start'>
                            <Card.Title>{article.description}</Card.Title>
                            <Card.Subtitle className="text-muted">Réf: {article.reference}</Card.Subtitle>
                            <Card.Text className='mt-3'>
                                <span>
                                    <strong>Variante :</strong>{' ' + article.variante}
                                </span>
                                <span className='ms-4'>
                                    <strong>Prix :</strong>{' ' + currencyLocalPrice(article.prix)}
                                </span>
                                <span className='ms-4'>
                                    <strong>Qté :</strong>{' ' + article.quantite}
                                </span>
                            </Card.Text>
                            <hr/>
   
                            <div className='d-flex justify-content-end'>
                                <Button variant="danger">
                                    <HiOutlineTrash onClick={() => dispatch(removeArticleMembre(article.id))}/>
                                </Button>
                            </div>
                        </Card.Body>
                    </Accordion.Body>

                </Accordion.Item>

            )
        })
    :
    <></>


    //Affiche les bons
    const displayBons = bonsMembre.length ? 
    bonsMembre.map(bon => {
        return (

            <Accordion.Item eventKey={`${bon.id}`} key={bon.id}>
                
                <Accordion.Header>
                    <Badge bg="dark" className='me-2'>Bon</Badge>
                    {`[${bon.reference}]: ${currencyLocalPrice(bon.montant)}`}
                </Accordion.Header>

                <Accordion.Body style={{backgroundColor: '#f5f9fe', padding: '0'}}>
                    <Card.Body className='text-start'>
                        <Card.Title>Bon de réduction</Card.Title>
                        <Card.Subtitle className="text-muted">Réf: {bon.reference}</Card.Subtitle>
                        <Card.Text className='mt-3'>
                            <strong>Montant :</strong>{' ' + currencyLocalPrice(bon.montant)}
                        </Card.Text>
                        <hr/>

                        <div className='d-flex justify-content-end'>
                            <Button variant="danger">
                                <HiOutlineTrash onClick={() => dispatch(removeBonMembre(bon.id))}/>
                            </Button>
                        </div>
                    </Card.Body>
                </Accordion.Body>

            </Accordion.Item>

        )
    })
    :
    <></>
    
    
    //render
    return (
        <Accordion className='mb-5'>
            {displayBons}
            {displayArticles}
            {displayNoData()}
        </Accordion>
    )
}

export default ArticlesMembre
