import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Mentions = () => {
    
    //Hooks
    const navigate = useNavigate()

    //Retour page précédente
    const handleBack = () => navigate(-1)

    //render
    return (
        <>
            <div className='box wide hidden-on-narrow'>
                <div className='box-col' />
                <Button variant='primary' className='me-2' onClick={handleBack}>Retour</Button>
                <div className='box-col' />
            </div>
            <div className='px-5 pb-5'>
                <h2 className='py-3'>Mentions Légales</h2>
                
                <p>
                    Conformément aux dispositions de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, nous vous informons que :
                </p>

                <p>Le site internet <strong>abc.md-ev.ovh</strong> est édité par :</p>
                <div className='col-sm-4 mb-3'>
                    <Card>
                        <Card.Header border='secondary'>
                            <Card.Title>Drault Michel (Auto-entreprise)</Card.Title>
                            <Card.Subtitle>
                                SIRET : 91128202800016
                            </Card.Subtitle>
                            <Card.Text className='mt-3'>
                                <h6 className='text-muted'>Adresse :</h6>{' 56 rue des carrières - 60170, Tracy le Mont'}
                            </Card.Text>
                            <Card.Text className='mt-3'>
                                <h6 className='text-muted'>email :</h6>{' contact@md-ev.ovh'}
                            </Card.Text>
                        </Card.Header>
                        <Card.Body>
                            <h6>Responsable de publication</h6>
                            Drault Michel<hr/>
                            <h6>Hébergement</h6>
                            Ce site est hébergé par Firebase, 188 King ST, San Francisco, CA 94107, United States, https://firebase.google.com/
                        </Card.Body>
                        <Card.Footer>
                        <Card.Title>Association de Badminton Cosacien</Card.Title>
                            <Card.Text className='mt-3'>
                                <h6 className='text-muted'>Adresse :</h6>
                                60750 Choisy-au-Bac
                            </Card.Text>
                            <Card.Text className='mt-3'>
                                <h6 className='text-muted'>email :</h6>
                                abc.president.hd@gmail.com
                            </Card.Text>                      
                        </Card.Footer>
                    </Card>
                </div>
                <hr/>
                <h4>Images</h4>
                <p>Le favicon est une image provenant du site iconfinder.com.</p>
                <p>Les icones sont des images provenant du site heroicons.com.</p>
                <p>Le logo appartient à l'Association de Badminton Cosacien.</p>
            </div>
        </>
    )
}

export default Mentions
