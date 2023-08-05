import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FirebaseContext } from '../Firebase'
import { toast } from 'react-toastify'
import { updateUser } from '../../Redux/actions/Users'
import { addParams } from '../../Redux/actions/Parametres'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const Parametres = () => {

    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()

    //Redux
    const parametres = useSelector(state => state.parametres)
    const user = useSelector(state => state.user)
    

    //State
    const [userSession, setUserSession] = useState(null)
    const [paramsData, setParamsData] = useState({
        club: 'ABC',
        sendmail: '',
        adresse: '',
        code_postal: '',
        ville: ''        
    })


    //Recuperation du UserSession
    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : console.log('non authentifié !')
        })
        return () => listener()       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSession])


    //Au chargement du composant
    useEffect(() => {
        const {club, sendmail} = parametres
        const {adresse, code_postal, ville} = user
        setParamsData({
            club,
            sendmail,
            adresse,
            code_postal,
            ville        
        })
    }, [parametres, user])
    


    //sur changement d'etat des input form
    const handleChange = event => {
        // recuperation de l'id pour savoir sur quel input on change l'etat
        // permet de cibler directement l'input en train de changer
        setParamsData({...paramsData, [event.target.id]: event.target.value})
    }

    //Modifications des parametres
    const handleSubmit = () => {
        const {club, sendmail} = paramsData
        const {adresse, code_postal, ville} = paramsData
        const param = {club, sendmail}

        firebase.updateParams(param)
        .then(() => {
            dispatch(addParams(param))

            firebase.updateAdresseUser(userSession.uid, {adresse, code_postal, ville})
            .then(() => {
                dispatch(updateUser({adresse, code_postal, ville}))

                //notification indiquant que la commande à bien était envoyé
                toast.success('Paramètres modifié avec succès !', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
            .catch(err => {
                console.log('firebase.updateAdresseUser', err)
            })
          
        })
        .catch(err => {
            console.log('firebase.updateParams', err)
        })
    }


    //render
    return (
        <div className='text-center justify-content-center m-4'>
            <Card>
                <Card.Header as='h1' className='display-6'>Vos paramètres</Card.Header>
                <Card.Body className='d-flex justify-content-center'>

                    <ListGroup className='mt-3 mb-4'>

                        <ListGroup.Item style={{backgroundColor: '#f1f1f1'}}>
                            <Form className='mb-3'>
                                <Form.Group>
                                    <Form.Label htmlFor="club">
                                        Adresse de livraison
                                    </Form.Label>
                                </Form.Group>

                                <Form.Group className='mb-3'>
                                    <Form.Control 
                                        id='adresse' 
                                        placeholder='Adresse de livraison des commandes' 
                                        value={paramsData.adresse}
                                        onChange={handleChange}/>
                                </Form.Group>

                                <Form.Group className='mb-3 d-flex'>
                                    <Row>
                                        <Col xs={2} className='flex-fill'>
                                            <Form.Control
                                                id='code_postal'
                                                placeholder='Code postal' 
                                                value={paramsData.code_postal}
                                                onChange={handleChange}/>
                                        </Col>
                                        <Col xs='auto' className='flex-fill'>
                                            <Form.Control
                                                id='ville' 
                                                placeholder='Ville' 
                                                value={paramsData.ville}
                                                onChange={handleChange}/>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Form>
                        </ListGroup.Item>

                        <ListGroup.Item style={{backgroundColor: '#f1f1f1'}}>
                            <Form className='my-3'>
                                <Form.Group className='mb-3'>
                                    <Form.Label htmlFor="club">
                                        Nom assigné pour les commandes du club
                                    </Form.Label>
                                    <Form.Control 
                                        id='club' 
                                        value={paramsData.club}
                                        onChange={handleChange}/>
                                </Form.Group>
                            </Form>
                        </ListGroup.Item>

                        <ListGroup.Item style={{backgroundColor: '#f1f1f1'}}>
                            <Form className='mt-3'>
                                <Form.Group className='mb-3'>
                                    <Form.Label htmlFor="sendmail">
                                        Adresse(s) Gmail de notification
                                    </Form.Label>
                                    <Form.Control 
                                        id='sendmail' 
                                        value={paramsData.sendmail}
                                        onChange={handleChange}/>
                                </Form.Group>
                            </Form>
                        </ListGroup.Item>

                    </ListGroup>                           

                </Card.Body>
                <Card.Footer>
                    <Button className='px-5' onClick={handleSubmit}>Modifier</Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Parametres