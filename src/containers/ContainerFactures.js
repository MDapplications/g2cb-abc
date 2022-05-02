import React from 'react'
import { Accordion, Button, Card } from 'react-bootstrap'

const ContainerFactures = () => {
    
    const listFactures = []
    
    const displayFactures = listFactures.length ? 
    listFactures.map(commande => {
        return (
            <Accordion.Item eventKey={`${commande.id}`} key={commande.id}>
                <Accordion.Header>
                    {commande.date} : Commande n° {commande.numCommande} - Total 
                    : {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(commande.montant)}
                </Accordion.Header>
                <Accordion.Body style={{backgroundColor: '#f5f9fe'}}>
                    <Card.Body className='text-start'>
                        <Card.Title>Commande : {commande.numCommande}</Card.Title>
                        <Card.Subtitle className="text-muted">Créé : {commande.date + ' - ' + commande.user_name}</Card.Subtitle>
                        <Card.Text className='mt-3'>
                            <span>
                                <strong>Montant :</strong>{' ' + 
                                new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(commande.montant)}
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
                                <Button variant="success">
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
    <p>Il n'y a eu aucune facture pour le moment...</p>


    //render
    return (
        <Accordion className='mb-2'>
            {displayFactures}
        </Accordion>
    )
}

export default ContainerFactures
