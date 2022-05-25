import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FirebaseContext } from '../Firebase'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Modal2Confirmation from '../Modal2Confirmation'
import ContainerArticles from '../../containers/ArticlesStandby'
import { changeClubArticleStandby, deleteArticleStandby, loadArticleStandby, removeArticleStandby } from '../../Redux/actions/ArticlesStandby'
import { deleteBonStandby, loadBonStandby, removeBonStandby } from '../../Redux/actions/BonsStandby'
import { initCompteurs, addCompteurCommande, addCompteurFacture } from '../../Redux/actions/Compteurs'
import { addArticlePrepaFacture, addBonPrepaFacture, addPrepaFacture, removeAllPrepaFacture } from '../../Redux/actions/PrepaFactures'
import 'react-toastify/dist/ReactToastify.css'
import { removeAllDepot } from '../../Redux/actions/Depot'
import { removeAllFacture } from '../../Redux/actions/Factures'
import { removeAllCommande } from '../../Redux/actions/Commandes'

toast.configure()


const StandbyArticle = () => {

    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()

    //Selector (redux)
    const user = useSelector(state => state.user)
    const articlesStandby = useSelector(state => state.articlesStandby)
    const bonsStandby = useSelector(state => state.bonsStandby)
    const compteurs = useSelector(state => state.compteurs)
    const listFactures = useSelector(state => state.prepaFactures)
    const parametres = useSelector(state => state.parametres)



    //State
    const [username, setUsername] = useState('')
    const [numFacture, setNumFacture] = useState('')
    const [numCommande, setNumCommande] = useState('')
    const [nbElementCommande, setNbElementCommande] = useState(0)
    const [nbBonCommande, setNbBonCommande] = useState(0)
    const [nbArticleCommande, setNbArticleCommande] = useState(0)
    const [montantCommande, setMontantCommande] = useState(0)
    const [userSession, setUserSession] = useState(null)
    const [dateCurrent] = useState(new Date())
    const [dateString] = useState(new Date().toLocaleDateString())
    const [currentYear] = useState(new Date().getFullYear())
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalCommande, setOpenModalCommande] = useState(false)
    const [openModalClub, setOpenModalClub] = useState(false)
    const [data, setData] = useState({
        type: '',
        id: 0
    })
    
    
    //Style
    const styleComment = {
        fontSize: '.7em', 
        color: '#6c757d'
    }

    //Ajoute un 0 pour les nombre à 1 digit
    const doubleDibit = (num) => (num > 9 ? "" + num: "0" + num)

    //Ajoute un 0 pour les nombre à 1 digit
    const tripleDibit = (num) => {
        if (num < 10) {
            return "00" + num
        } else if (num < 100) {
            return "0" + num
        } else {
            return "" + num
        }
    }


    //Récupération de l'utilisateur authentifié 'usersession'
    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : console.log('non authentifié !')
        })
        return () => listener()       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSession])



    //Calcul du nombre de bon, d'article et d'element total dans la commande
    useEffect(() => {
        //Calcul des articles en commande
        const calculArticle = articlesStandby.reduce((prevValue, article) => {
            if (article.forCommande) {
                return {
                    montant: prevValue.montant + (article.prix * article.quantite), 
                    nb: prevValue.nb + article.quantite,
                    element: prevValue.element + 1
                }
            }else{
                return prevValue
            }
        }, {montant:0.0 , nb: 0, element: 0}) 
        //Calcul des bon en commande
        const calculBon = bonsStandby.reduce((prevValue, bon) => {
            if (bon.forCommande) {
                return {
                    montant: prevValue.montant + (bon.montant * 1), 
                    nb: prevValue.nb + 1,
                    element: prevValue.element + 1
                }
            }else{
                return prevValue
            }  
        }, {montant:0.0 , nb: 0, element: 0})

        setMontantCommande(calculArticle.montant - calculBon.montant)
        setNbArticleCommande(calculArticle.nb)
        setNbBonCommande(calculBon.nb)
        setNbElementCommande(calculArticle.element + calculBon.element)

    }, [articlesStandby, bonsStandby])



    //Initialisation du prochain numéro de commande
    useEffect(() => {
        
        setUsername(user.prenom + ' ' + user.nom)

        setNumCommande(
            dateCurrent.getFullYear() 
            + doubleDibit(dateCurrent.getMonth() + 1)
            + doubleDibit(dateCurrent.getDate())
            + doubleDibit(compteurs.commande)
            + 'C'
        )

        setNumFacture(
            dateCurrent.getFullYear() 
            + doubleDibit(dateCurrent.getMonth() + 1)
            + doubleDibit(dateCurrent.getDate())
            + tripleDibit(compteurs.facture)
            + 'F'
        )

    }, [compteurs.commande, compteurs.facture, dateCurrent, numCommande, numFacture, user])



    //Initialisation des compteurs
    useEffect(() => {

        //Gestions des compteurs
        if (localStorage.getItem('ABCstorageDate')) {
            //Si une date est stocker on check la peremption
            const dateABC = localStorage.getItem('ABCstorageDate')
            checkDataPage(dateABC)
        } else {
            //Si aucune date stocker on en stock une
            //Init des compteurs en cas de reset
            localStorage.setItem('ABCstorageDate', Date.now())
            dispatch(initCompteurs())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    //Initialisation de la liste des article en attente
    useEffect(() => {
        //Getting des articles en attentes
        if(!(localStorage.getItem('ArticlesStandby'))) {
            console.log("Création de la liste d'article en attente")
            const ArticlesStandby = []
            firebase.getArticleStandby()
            .then((docs) => {
                docs.forEach((doc) => {   
                    ArticlesStandby.push(doc.data())
                })
                localStorage.setItem('ArticlesStandby', JSON.stringify(ArticlesStandby))
                dispatch(loadArticleStandby())
            })
            .catch((error) => {
                console.log(error);
            })

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    //Initialisation de la liste des bons en attentes
    useEffect(() => {
        //Getting des bons en attente
        if(!(localStorage.getItem('BonsStandby'))) {
            console.log("Création de la liste des bons en attente")
            const BonsStandby = []
            firebase.getBonStandby()
            .then((docs) => {
                docs.forEach((doc) => {   
                    BonsStandby.push(doc.data())
                })
                localStorage.setItem('BonsStandby', JSON.stringify(BonsStandby))
                dispatch(loadBonStandby())
            })
            .catch((error) => {
                console.log(error);
            })

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    

    //Reset de la date stocker si elle est passé de 24h
    const checkDataPage = dateData => {
        const today = Date.now()
        const TimeDiff = today - dateData 
        const DayDiff = TimeDiff / (1000 * 3600 * 24)

        if (DayDiff>=1) {
            localStorage.removeItem('ABCstorageDate')
            localStorage.setItem('ABCstorageDate', Date.now())
            //Init des compteurs en cas de reset
            dispatch(initCompteurs())
        }
    }


    //Désactivation du bouton "Créer la commande"
    const disableBtnCommande = () => nbElementCommande > 21  
 


    //Gestion de la preparation de facturation
    useEffect(() => {
        //On récupère les articles/bons et infos pour la facturation
        articlesStandby.forEach(article => {
            if(article.forCommande){
                if (article.destination) {
                    if (!(article.user_id in listFactures)) {
                        dispatch(addPrepaFacture(article))        
                    } else {
                        if (!(listFactures[article.user_id]['articles'].includes(article.id))) {
                            dispatch(addArticlePrepaFacture(article))
                        }
                    }
                }
            }
        })
        bonsStandby.forEach(bon => {
            if(bon.forCommande){
                if (bon.user_id in listFactures) {
                    if (!(listFactures[bon.user_id]['bons'].includes(bon.id))) {
                        dispatch(addBonPrepaFacture(bon))
                    }
                }
            }
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articlesStandby, bonsStandby])
  

    //Function qui renvoie un numero de facture en fonction d'une valeur
    const getNumFacture = value => {
        return dateCurrent.getFullYear() 
            + doubleDibit(dateCurrent.getMonth() + 1)
            + doubleDibit(dateCurrent.getDate())
            + tripleDibit(value)
            + 'F'
    }

    
    //Création de la commande
    const handleClick = () => {
        const id = numCommande
        const commande = {
            id: id,
            date: dateString,
            num_commande: numCommande,
            nb_bons: nbBonCommande,
            nb_articles: nbArticleCommande,
            montant: montantCommande,
            user_id: userSession.uid,
            user_name: username,
            year: currentYear
        }

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
                    .catch(err => {
                        console.log('firebase.addArticleFacture', err)
                    })
                })
                listFactures[idUser].bons.forEach(idBon => {
                    firebase.addBonFacture(idBon, idFacture)
                    .catch(err => {
                        console.log('firebase.addBonFacture',err)
                    })
                })
                //Incrementation du numero de facture
                dispatch(addCompteurFacture())
            })
            .catch(err => {
                console.log('firebase.addFacture', err)
            })

        }



        //Création de la commande dans firebase
        firebase.addCommande(id, commande)
        .then(() => {
            console.log('Commande créer avec succès !', numCommande)
            //Mise à jour des articles
            articlesStandby.forEach(article => {
                if(article.forCommande){
                    const uid = article.id
                    const data = {
                        commande: numCommande,
                        depot: (article.destination === false)
                    }
                    //passage en commande de l'article dans firebase
                    firebase.addArticleCommande(uid, data)
                    .then(() => {
                        dispatch(removeArticleStandby(uid))
                    })
                    .catch(err => {
                        console.log('firebase.addArticleCommande', err)
                    })
                    .finally(() => {
                        //remise à zero de la preparation facturation
                        dispatch(removeAllPrepaFacture())
                    })
                }
            })
            //Mise à jour des bons
            bonsStandby.forEach(bon => {
                if(bon.forCommande){
                    const uid = bon.id
                    //passage en commande du bon dans firebase
                    firebase.addBonCommande(uid, numCommande)
                    .then(() => {
                        dispatch(removeBonStandby(uid))
                    })
                    .catch(err => {
                        console.log('firebase.addBonCommande', err)
                    })
                    .finally(() => {
                        //remise à zero de la preparation facturation
                        dispatch(removeAllPrepaFacture())
                    })
                }
            })
            
            dispatch(removeAllCommande())
            dispatch(removeAllFacture()) 
            dispatch(removeAllDepot())

            localStorage.removeItem('Commandes')
            localStorage.removeItem('Factures')
            localStorage.removeItem('Depot')

            

            //notification indiquant que la commande à bien était envoyé
            toast.success('Commande ' + id + ' créée avec succès !', {
                position: "bottom-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        })
        .catch((error) => {
            console.log('firebase.addCommande', error)
        })
        .finally(() => {
            dispatch(addCompteurCommande())

            //remise à zero de la preparation facturation
            dispatch(removeAllPrepaFacture())

            setOpenModalCommande(false)
        })
        
    }

    
    //fermeture des modals
    const hideModal = () => {
        setOpenModalCommande(false)
        setOpenModalDelete(false)
        setOpenModalClub(false)
    }

    //Ouverture du modal et recupération des infos
    const showModalDelete = (type, id) => {
        setData({type, id})
        console.log('modal delete')
        setOpenModalDelete(true)
    }
    const showModalCommande = () => setOpenModalCommande(true)
    const showModalClub = id => {
        setData({type: 'article', id})
        setOpenModalClub(true) 
    }

    //Validation du modal de double confirmation
    //Suppression de l'article dans firestore et Redux
    const handleDelete = () => {
        switch (data.type) {
            case 'article':
                firebase.deleteArticle(data.id)
                .then(() => {
                    dispatch(deleteArticleStandby(data.id))
                    dispatch(removeAllPrepaFacture())
                })
                .catch(err => {
                    console.log(err);
                })
                break;
            case 'bon':
                firebase.deleteBon(data.id)
                .then(() => {
                    dispatch(deleteBonStandby(data.id))
                    dispatch(removeAllPrepaFacture())
                })
                .catch(err => {
                    console.log(err);
                })
                break;
            default:
                break;
        }
        //remise à zero de la preparation facturation
        
        setOpenModalDelete(false)
    }

    //Mettre au nom du club
    const handleClubCommande = () => { 
        firebase.changeClubArticle(data.id, parametres.club)
        .then(() => {
            dispatch(changeClubArticleStandby(data.id, parametres.club))
            dispatch(removeAllPrepaFacture())
        })
        .catch(err => {
            console.log('firebase.changeClubArticle', err);
        })
        setOpenModalClub(false)
    }



 
    //activation du modal de double confirmation
    const displayModalDelete = openModalDelete && 
        <Modal2Confirmation 
            hideModal={hideModal} 
            handleConfirm={handleDelete}
            textValue={`Êtes-vous sûr de vouloir suppimer ${data.type === 'article' ? "l'article" : "le bon"} ?`}/>

    //activation du modal de double confirmation
    const displayModalCommande = openModalCommande && 
        <Modal2Confirmation 
            hideModal={hideModal} 
            handleConfirm={handleClick}
            textValue='Êtes-vous sûr de vouloir créer cette commande ?'/>

    //activation du modal de double confirmation
    const displayModalClub = openModalClub && 
    <Modal2Confirmation 
        hideModal={hideModal} 
        handleConfirm={handleClubCommande}
        textValue={<>
            <p className='mb-0 text-center'>Êtes-vous sûr de vouloir mettre cet article au nom du club ?</p>
            <p className='text-center'><strong>Cette action est irréversible !</strong></p>
        </>}
        textType={true} />


    //render
    return (
        <>
            <main role='main'>
                <div className='p-2 bg-light border rounded-3'>
                    <div className='container text-center justify-content-center'>
                        <h1 className='display-6'>Articles / bons en attente de commande</h1>
                        <p>Gérer les articles à commander, créer les commandes, les factures et les mises en dépôts depuis cet espace.</p>
                        <hr/>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span>
                            <span className='mx-5 text-start'>
                                Éléments sélectionnés :
                                <span className='mx-2'>{nbElementCommande}</span>
                                <span style={styleComment}>(max: 21)</span>
                            </span>
                        </span>
                        <span className='pe-5'>
                            <Button variant='success' onClick={showModalCommande} disabled={disableBtnCommande()}>Créer la commande</Button>
                        </span>                        
                    </div>
                </div>
            </main>
            
            <div className='text-center justify-content-center m-4'>
                <ContainerArticles showModalDelete={showModalDelete} showModalClub={showModalClub}/>           
            </div>

            {displayModalDelete}
            {displayModalCommande}
            {displayModalClub}
            
        </>
    )
}

export default StandbyArticle