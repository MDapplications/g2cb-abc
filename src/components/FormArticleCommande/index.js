import React, { useContext, useEffect, useState } from 'react'
import { Badge, Button, Card, FloatingLabel, Form } from 'react-bootstrap'
import { HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { removeArticleCommandeModif, updateArticleCommandeModif } from '../../Redux/actions/ArticlesCommande'
import { addArticleFactureModif, addBonFactureModif, loadFactureModif, removeArticleFactureModif, updateArticleFactureModif } from '../../Redux/actions/ArticlesFacture'
import { removeAllCommande } from '../../Redux/actions/Commandes'
import { removeAllFacture } from '../../Redux/actions/Factures'
import { FirebaseContext } from '../Firebase'
import Modal2Confirmation from '../Modal2Confirmation'

//Regex
const validPrix = '^(([1-9][0-9]*((,|\\.)([0-9]{1,2}))?)$|0(,|\\.)([1-9][0-9]?|0[1-9])$)'


const FormArticleCommande = ({hideModal}) => {
    
    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()
    

    //Redux
    const commande = useSelector(state => state.commandeModif)
    const facture = useSelector(state => state.factureModif)

    //Constantes
    const articleData = {
        id: '',
        commande: '',
        date: '01/01/2022',
        description: '',
        facture: '',
        prix: 0.0,
        quantite: 0,
        reference: '',
        retour: '',
        user_id: '',
        user_name: '',
        variante: '',
        destination: true
    }


    //States
    const [numFacture, setNumFacture] = useState('')
    const [idArticleModif, setIdArticleModif] = useState(0)
    const [articleModif, setArticleModif] = useState(articleData)
    const [variante, setVariante] = useState('')
    const [prix, setPrix] = useState('')
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalChange, setOpenModalChange] = useState(false)
 

    //Recupération de l'article selectionné au chargement
    useEffect(() => {
        if (commande.articles[0] !== undefined) {
            setArticleModif(commande.articles[0])
            setIdArticleModif(commande.articles[0].id)
            setVariante(commande.articles[0].variante)
            setPrix(commande.articles[0].prix)
        } else {
            console.log('fermeture modal : aucun article')
            hideModal()
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commande])



    //Récupération de la facture associé à l'article
    useEffect(() => {
        if (articleModif.facture !== '' && articleModif.facture !== numFacture) {
            
            const idFacture = articleModif.facture
            setNumFacture(idFacture)

            firebase.getFacture(idFacture)
            .then(doc => {
                const factureData = doc.data()
                dispatch(loadFactureModif(doc.data()))
                
                //récupération des articles
                firebase.getArticleFacture(idFacture)
                .then(docs => {
                    docs.forEach((doc) => { 
                        dispatch(addArticleFactureModif(doc.data()))
                    })
                })
                .catch(err => {
                    console.log('firebase.getArticleFacture', err);
                })

                if (factureData.nb_bons > 0) {
                    //récupération des articles
                    firebase.getBonFacture(idFacture)
                    .then(docs => {
                        docs.forEach((doc) => { 
                            dispatch(addBonFactureModif(doc.data()))
                        })
                    })
                    .catch(err => {
                        console.log('firebase.getBonFacture', err);
                    })
                }
            })
            .catch(err => {
                console.log('firebase.getFacture', err);
            })
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articleModif])
    

    //L'article selectionné dans la comboBox change
    const handleChangeArticle = event => {
        const data = commande.articles.find(data => data.id === event.target.value)
        setArticleModif(data)
        setIdArticleModif(data.id)
        setVariante(data.variante)
        setPrix(data.prix)
    }

    //Modification de la variante
    const handleChangeVariante = event => {
        setVariante(event.target.value)
    }

    //Modification du prix
    const handleChangePrix = event => {
        setPrix(event.target.value)
    }


    //Suppression de l'article
    const handleDeleteArticle = () => {
        dispatch(removeArticleCommandeModif(articleModif))
        
        //Vérification 
        let modifFacture = false
        if (articleModif.facture === facture.id && facture.id !== '') {
            dispatch(removeArticleFactureModif(articleModif))
            modifFacture = true
        }
        
        firebase.deleteArticle(idArticleModif)
        .then(() => {
            const dataCommande = {
                montant: commande.montant,
                nb_articles: commande.nbArticles,
                nb_bons: commande.nbBons,
            }

            firebase.updateCommande(commande.id, dataCommande)
            .then(() => {
                if (modifFacture) {
                    const dataFacture = {
                        montant: facture.montant,
                        nb_articles: facture.nbArticles,
                        nb_bons: facture.nbBons,
                    }

                    firebase.updateFacture(facture.id, dataFacture)
                    .then(() => {
                        //Suppression de la liste des factures (pour màj de la liste)
                        dispatch(removeAllFacture())
                        localStorage.removeItem('Factures')
                    })
                    .catch(err => {
                        console.log('firebase.updateFacture', err)
                    })
                }
                //Suppression de la liste des commandes (pour màj de la liste)
                dispatch(removeAllCommande())
                localStorage.removeItem('Commandes')
            })
            .catch(err => {
                console.log('firebase.updateCommande', err)
            })
        })
        .catch(err => {
            console.log('firebase.deleteArticle', err)
        })
        .finally(() => {
            //réinit
            setArticleModif(commande.articles[0])
            setIdArticleModif(commande.articles[0].id)
            setVariante(commande.articles[0].variante)
            setPrix(commande.articles[0].prix)
            setOpenModalDelete(false)
        })
    }



    //Modifier un article de la commande (prix ou variante)
    const handleModifArticle = () => {

        const dataArticle = {
            ...articleModif,
            variante: variante,
            prix: Number(prix)
        }
        
        dispatch(updateArticleCommandeModif(dataArticle))
        
        //Vérification si l'article fait partie d'une facture
        let modifFacture = false
        if (articleModif.facture === facture.id && facture.id !== '') {
            dispatch(updateArticleFactureModif(dataArticle))
            modifFacture = true
        }
        console.log(modifFacture)
        
        firebase.updateArticle(idArticleModif, dataArticle)
        .then(() => {
            const dataCommande = {
                montant: commande.montant,
                nb_articles: commande.nbArticles,
                nb_bons: commande.nbBons,
            }

            firebase.updateCommande(commande.id, dataCommande)
            .then(() => {
                if (modifFacture) {
                    const dataFacture = {
                        montant: facture.montant,
                        nb_articles: facture.nbArticles,
                        nb_bons: facture.nbBons,
                    }

                    firebase.updateFacture(facture.id, dataFacture)
                    .then(() => {
                        //Suppression de la liste des factures (pour màj de la liste)
                        dispatch(removeAllFacture())
                        localStorage.removeItem('Factures')
                    })
                    .catch(err => {
                        console.log('firebase.updateFacture', err)
                    })
                }
                //Suppression de la liste des commandes (pour màj de la liste)
                dispatch(removeAllCommande())
                localStorage.removeItem('Commandes')
            })
            .catch(err => {
                console.log('firebase.updateCommande', err)
            })
        })
        .catch(err => {
            console.log('firebase.updateArticle', err)
        })
        .finally(() => {
            setOpenModalChange(false)
        })
    }




    //Submit des modification à apporter sur l'article
    const handleSubmit = e => {
        e.preventDefault()
        setOpenModalChange(true)
    }

    //Annulation des modification sur l'article
    const hideModalChange = () => {
        setOpenModalChange(false)
        setVariante(articleModif.variante)
        setPrix(articleModif.prix)
    }

    //activation du modal de double confirmation
    const displayModalDelete = openModalDelete && 
    <Modal2Confirmation 
        hideModal={() => setOpenModalDelete(false)} 
        handleConfirm={handleDeleteArticle}
        textValue="Êtes-vous sûr de vouloir suppimer l'article ?"/>

    //activation du modal de double confirmation
    const displayModalChange = openModalChange && 
    <Modal2Confirmation 
        hideModal={hideModalChange} 
        handleConfirm={handleModifArticle}
        textValue="Êtes-vous sûr de vouloir modifier l'article ?"/>




    //renvoie le texte : 'Achat' ou 'Dépôt' selon la destination (true | false)
    //format badge
    const displayDestination = article => {
        if (article.facture !== '') {
            return <>
                <strong>Facture :</strong>
                {' ' + articleModif.facture + ' - ' + articleModif.user_name + ' '}
                <Badge bg='primary' className='me-2'>Achat</Badge>
            </>
        } else {
            return <>
                {articleModif.user_name + ' '}
                <Badge bg='secondary' className='me-2'>Dépôt</Badge>
            </>
        }
    }

    //désactivation du bouton modifier si aucune modification
    const disableBtnModif = () => variante === articleModif.variante || variante === ''
    ? Number(prix) === articleModif.prix || prix === '' ? true : false
    : false
    

    //Affichage au format prix
    const currencyLocalPrice = prix => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
    }


    const displayModal = ('numCommande' in commande) &&
    <div className='modalBackground'>
        <Card className='modal-dialog'>
            <div className='modal-content'>
                <Card.Header className='modal-header' style={{backgroundColor: '#f8fdff'}}>
                    <h5 className='modal-title'>Gestion de la commande : {commande.numCommande}</h5> 
                    <button 
                        type='button' 
                        className='btn-close ms-5' 
                        aria-label='Close'
                        onClick={() => hideModal()}>
                    </button>
                </Card.Header>
                
                <Card.Body className='py-2'>
                    <p className='m-0'>{"Nb d'article(s): "} 
                        <strong>{commande.nbArticles}</strong>
                        {' - Nb de bon(s): '} 
                        <strong>{commande.nbBons}</strong>
                        {' - Montant: '} 
                        <strong>{currencyLocalPrice(commande.montant)}</strong>
                    </p>
                </Card.Body>

                <Card.Body className='text-start' style={{backgroundColor: '#f1f7fb'}}>
                    <Form.Label>
                        Liste des articles :
                    </Form.Label>
                    <Form.Select onChange={e => handleChangeArticle(e)}>
                        {commande.articles.map(article => <option key={article.id} value={article.id}>{article.reference}</option>)}
                    </Form.Select>
                </Card.Body>

                <Card.Body className='text-start' style={{backgroundColor: '#fcfcfc'}}>
                    <Card.Title>
                        {articleModif.description}
                    </Card.Title>
                    <Card.Subtitle className='text-muted'>Réf: {articleModif.reference}</Card.Subtitle>
                    <Card.Text className='mt-3'>
                        {displayDestination(articleModif)}
                    </Card.Text>
                    <Card.Text className='mt-3'>
                        <span>
                            <strong>Variante :</strong>{' ' + articleModif.variante}
                        </span>
                        <span className='ms-4'>
                            <strong>Prix :</strong>{' ' + currencyLocalPrice(articleModif.prix)}
                        </span>
                        <span className='ms-4'>
                            <strong>Qté :</strong>{' ' + articleModif.quantite}
                        </span>
                    </Card.Text>
                </Card.Body>
                
                <Form onSubmit={handleSubmit}>
                    <Card.Body className='text-start' style={{backgroundColor: '#eef6fa'}}>
                        <Card.Title>
                            Mettre à jour l'article :
                        </Card.Title>
                        
                        <FloatingLabel
                            controlId='floatingVariante'
                            label='Variante'
                            className='my-3'>
                                <Form.Control 
                                    required
                                    value={variante} 
                                    onChange={e => handleChangeVariante(e)}/>
                        </FloatingLabel>

                        <FloatingLabel
                            controlId='floatingPrix'
                            label='Prix'>
                                <Form.Control 
                                    pattern={validPrix}
                                    required
                                    value={prix} 
                                    onChange={e => handleChangePrix(e)}/>
                        </FloatingLabel>
                            
                    </Card.Body>

                    <Card.Footer className='modal-footer d-flex justify-content-between'>
                        <div>
                            <button className='btn btn-primary' disabled={disableBtnModif()}>Mettre à jour</button>
                        </div>
                        <Button variant='danger' onClick={() => setOpenModalDelete(true)}><HiOutlineTrash/></Button>
                    </Card.Footer>
                    
                </Form>
            </div>
        </Card>
    </div>
    


    //render
    return (
        <>
            {displayModal}
            {displayModalDelete}
            {displayModalChange}
        </>
    )
}

export default FormArticleCommande