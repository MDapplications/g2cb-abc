/* eslint-disable no-loop-func */
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FirebaseContext } from '../Firebase'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import ReactTooltip from 'react-tooltip'
import Modal2Confirmation from '../Modal2Confirmation'
import ContainerDepot from '../../containers/Depot'
import ModalBonsDepot from '../ModalBonsDepot'
import { addCommande } from '../../Redux/actions/Commandes'
import { addArticleDepot, removeArticleDepot } from '../../Redux/actions/Depot'
import { addCompteurFacture, addCompteurRetour } from '../../Redux/actions/Compteurs'
import { addBonDepot, removeBonDepot } from '../../Redux/actions/BonsDepot'
import {addArticlePrepaFactDepot, 
        addBonPrepaFactDepot, 
        addPrepaFactDepot, 
        removeAllPrepaFactDepot} from '../../Redux/actions/PrepaFactDepot'
import 'react-toastify/dist/ReactToastify.css'
import { removeAllFacture } from '../../Redux/actions/Factures'
import { removeAllRetour } from '../../Redux/actions/Retours'
toast.configure()


const Depots = () => {

    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()

    //Redux
    const user = useSelector(state => state.user)
    const articlesDepot = useSelector(state => state.depot)
    const listFactures = useSelector(state => state.prepaFactDepot)
    const bonsDepot = useSelector(state => state.bonsDepot)
    const compteurs = useSelector(state => state.compteurs)

    //State
    const [username, setUsername] = useState('')
    const [userSession, setUserSession] = useState(null)
    const [dateCurrent] = useState(new Date())
    const [dateString] = useState(new Date().toLocaleDateString())
    const [currentYear] = useState(new Date().getFullYear())
    const [openModalBons, setOpenModalBons] = useState(false)
    const [openModalFacturation, setOpenModalFacturation] = useState(false)
    const [openModalRetour, setOpenModalRetour] = useState(false)
    const [nbArticleRetour, setNbArticleRetour] = useState(0)
    const [montantRetour, setMontantRetour] = useState(0)


    //Ajoute un 0 pour les nombre ?? 1 digit
    const doubleDibit = (num) => (num > 9 ? "" + num: "0" + num)

    //Ajoute un 0 pour les nombre ?? 1 digit
    const tripleDibit = (num) => {
        if (num < 10) {
            return "00" + num
        } else if (num < 100) {
            return "0" + num
        } else {
            return "" + num
        }
    }

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : console.log('non authentifi?? !')
        })
        return () => listener()       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSession])

    
    //r??cup??ration du username
    useEffect(() => {
        setUsername(user.prenom + ' ' + user.nom)
    }, [user])
    

    //Calcul du nombre d'article le bon de retour
    useEffect(() => {
        //Calcul des articles en commande
        const calculArticle = articlesDepot.reduce((prevValue, article) => {
            if (article.forRetour) {
                return {
                    montant: prevValue.montant + (article.prix * article.quantite), 
                    nb: prevValue.nb + article.quantite
                }
            }else{
                return prevValue
            }
        }, {montant:0.0 , nb: 0}) 
        
        setMontantRetour(calculArticle.montant)
        setNbArticleRetour(calculArticle.nb)

    }, [articlesDepot])

    
    //R??cup??rations des articles en d??p??ts
    useEffect(() => {
            
        //Getting des D??pots
        if(!localStorage.getItem('Depot')) {
            console.log("Cr??ation de la liste des articles en d??p??ts")
            firebase.getArticleDepot()
            .then((docs) => {
                docs.forEach((doc) => {   
                    dispatch(addArticleDepot(doc.data()))
                })
            })
            .catch((error) => {
                console.log('firebase.getArticleDepot', error);
            })

        }

        //Getting des Bons
        if(!localStorage.getItem('BonsDepot')) {
            console.log("Cr??ation de la liste des bons pour d??p??t")
            firebase.getBonDepot()
            .then((docs) => {
                docs.forEach(doc => {
                    dispatch(addBonDepot(doc.data()))
                })
            })
            .catch(err => {
                console.log('firebase.getBonDepot', err);
            })
        }

        //Getting des commandes
        if(!localStorage.getItem('Commandes')) {
            console.log("Cr??ation de la liste des commandes")
            firebase.getCommandes(currentYear)
            .then((docs) => {
                docs.forEach((doc) => {   
                    dispatch(addCommande(doc.data()))
                })
            })
            .catch((error) => {
                console.log('firebase.getCommandes', error);
            })
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentYear])



    //Gestion de la preparation de facturation
    useEffect(() => {
        //On r??cup??re les articles/bons et infos pour la facturation
        articlesDepot.forEach(article => {
            if(article.forFacture){
                if (!(article.user_id in listFactures)) {
                    dispatch(addPrepaFactDepot(article))        
                } else {
                    if (!(listFactures[article.user_id]['articles'].includes(article.id))) {
                        dispatch(addArticlePrepaFactDepot(article))
                    }
                }
            }
        })
        bonsDepot.forEach(bon => {
            if (bon.forFacture){
                if (bon.user_id in listFactures) {
                    if (!(listFactures[bon.user_id]['bons'].includes(bon.id))) {
                        dispatch(addBonPrepaFactDepot(bon))
                    }       
                }
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articlesDepot, bonsDepot])



    //Function qui renvoie un numero de facture en fonction d'une valeur
    const getNumFacture = value => {
        return dateCurrent.getFullYear() 
            + doubleDibit(dateCurrent.getMonth() + 1)
            + doubleDibit(dateCurrent.getDate())
            + tripleDibit(value)
            + 'F'
    }

    //Function qui renvoie un numero de facture en fonction d'une valeur
    const getNumRetour = value => {
        return dateCurrent.getFullYear() 
            + doubleDibit(dateCurrent.getMonth() + 1)
            + doubleDibit(dateCurrent.getDate())
            + doubleDibit(value)
            + 'R'
    }

    
    //Cr??ation des factures
    const handleFacturation = () => {
        console.log('Creation des factures')

        let noErr = true
        let nbFacture = compteurs.facture - 1

        //Creation des factures
        for (const idUser in listFactures) {
            
            nbFacture = nbFacture + 1
            const idFacture = getNumFacture(nbFacture)
            
            const facture = {
                id: idFacture,
                date: dateString,
                num_facture: idFacture,
                nb_bons: listFactures[idUser].nbBons,
                nb_articles: listFactures[idUser].nbArticles,
                montant: listFactures[idUser].montant,
                user_id: listFactures[idUser].user_id,
                user_name: listFactures[idUser].user_name,
                year: currentYear,
                // statut 
                regler: false
            }

            firebase.addFacture(idFacture, facture)
            .then(() => {
                listFactures[idUser].articles.forEach(idArticle => {
                    firebase.addArticleFacture(idArticle, idFacture)
                    .then(() => {
                        dispatch(removeArticleDepot(idArticle))
                        //remise ?? zero de la preparation facturation
                        dispatch(removeAllPrepaFactDepot())
                    })
                    .catch(err => {
                        console.log('firebase.addArticleFacture', err)
                        noErr = false
                    })
                })
                listFactures[idUser].bons.forEach(idBon => {
                    firebase.addBonFacture(idBon, idFacture)
                    .then(() => {
                        dispatch(removeBonDepot(idBon))
                    })
                    .catch(err => {
                        console.log('firebase.addBonFacture',err)
                        noErr = false
                    })
                })
                //Incrementation du numero de facture
                dispatch(addCompteurFacture())
                
            })
            .catch(err => {
                console.log('firebase.addFacture', err)
                noErr = false
            })
            

            if (noErr) {
                dispatch(removeAllFacture())
                dispatch(removeAllRetour())
                
                localStorage.removeItem('Factures')
                localStorage.removeItem('Retours')   

                //notification indiquant que la commande ?? bien ??tait envoy??
                toast.success('Les factures ont ??t?? cr????e avec succ??s !', {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }

            setOpenModalFacturation(false)

        }        
    }


    //Cr??ation du bon de retour
    const handleRetour = () => {
        console.log('Creation du bon de retour')
        
        let noErr = true
        const numRetour = getNumRetour(compteurs.retour)
        
        const id = numRetour
        const retour = {
            id: id,
            date: dateString,
            num_retour: numRetour,
            nb_articles: nbArticleRetour,
            montant: montantRetour,
            user_id: userSession.uid,
            user_name: username,
            year: currentYear,
            retourner: false
        }

        firebase.addRetour(id, retour)
        .then(() => {
            articlesDepot.forEach(article => {
                if(article.forRetour){
                    const uid = article.id
                    //passage en commande de l'article dans firebase
                    firebase.addArticleRetour(uid, numRetour)
                    .then(() => {
                        dispatch(removeArticleDepot(uid))
                    })
                    .catch(err => {
                        console.log('firebase.addArticleRetour', err)
                        noErr = false
                    })
                }
            })
        })
        .catch(err => {
            console.log('firebase.addRetour', err)
            noErr = false
        })

        if (noErr) {
            dispatch(removeAllRetour())

            localStorage.removeItem('Retours')   
            dispatch(addCompteurRetour())
            
            //notification indiquant que la commande ?? bien ??tait envoy??
            toast.success('Le bon de retour ' + id + ' a ??t?? cr????e avec succ??s !', {
                position: "bottom-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        setOpenModalRetour(false)  

    }

    
    //fermeture des modals
    const hideModal = () => {
        setOpenModalFacturation(false)
        setOpenModalRetour(false)
        setOpenModalBons(false)
    }
   
    
    //activation du modal de double confirmation
    const displayModalFacturation = openModalFacturation && 
        <Modal2Confirmation 
            hideModal={hideModal} 
            handleConfirm={handleFacturation}
            textValue='??tes-vous s??r de vouloir cr??er ces factures ?'/>

    const displayModalRetour = openModalRetour && 
    <Modal2Confirmation 
        hideModal={hideModal} 
        handleConfirm={handleRetour}
        textValue='??tes-vous s??r de vouloir cr??er le bon de retour ?'/>


    // Affichage ou non du Modal des bons
    const displayModalBons = openModalBons && <ModalBonsDepot hideModal={hideModal}/>

    //D??sactivation/Activation du bouton "Gestion des bons"
    const disableBtnGestionBons = bonsDepot.length === 0 
    //D??sactivation/Activation du bouton "Cr??er les factures"
    const disableBtnFacturation = Object.keys(listFactures).length === 0
    //D??sactivation/Activation du bouton "Cr??er un bon de retour"
    const disableBtnBR = () => {
        let result = true
        articlesDepot.forEach(article => {
            if (article.forRetour) {
                result = false
            }  
        })
        return result
    }


    //render
    return (
        <>
            <main role='main'>
                <div className='p-2 bg-light border rounded-3'>
                    <div className='container text-center justify-content-center'>
                        <h1 className='display-6'>D??p??t</h1>
                        <p>G??rer les articles du d??p??t. Vous pouvez facturer ou retourner les articles depuis cet espace.</p>
                    </div>

                    <div className='d-flex justify-content-end align-items-center pe-3'>
                        <Button 
                            variant='dark' 
                            className='me-2'
                            disabled={disableBtnGestionBons || disableBtnFacturation} 
                            onClick={() => setOpenModalBons(true)}            
                            data-for='btnGestionBon' 
                            data-tip='Ajouter/Retirer des bons en attentes pour un membre'>
                                Gestion des bons
                        </Button>
                        <Button 
                            variant='success' 
                            className='me-2'
                            onClick={() => setOpenModalFacturation(true)}
                            disabled={disableBtnFacturation}             
                            data-for='btnCreationFacture' 
                            data-tip='Cr??er les factures des articles marqu??s : "Article ?? facturer"'>
                                Cr??er les factures
                        </Button> 
                        <Button 
                            variant='success'   
                            disabled={disableBtnBR()}  
                            onClick={() => setOpenModalRetour(true)}   
                            data-for='btnCreationBR' 
                            data-tip='Cr??er un bon de retour pour les articles marqu??s : "Article ?? retourner"'>
                                Cr??er un bon de retour
                        </Button>  

                        <ReactTooltip id="btnGestionBon" place="bottom" effect="solid"/> 
                        <ReactTooltip id="btnCreationFacture" place="bottom" effect="solid"/>
                        <ReactTooltip id="btnCreationBR" place="bottom" effect="solid"/>  
                    </div>

                </div>
            </main>

            <div className='text-center justify-content-center m-4'>
                <ContainerDepot/>            
            </div>

            {displayModalBons}
            {displayModalFacturation}
            {displayModalRetour}
        </>
        
    )
}

export default Depots
