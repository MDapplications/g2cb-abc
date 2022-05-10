import React, { useContext, useEffect, useState } from 'react'
import NavbarHome from '../NavbarHome'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'
import { addUser } from '../../Redux/actions/Users'
import { useDispatch, useSelector } from 'react-redux'
import {removeArticleMembre} from '../../Redux/actions/ArticlesMembre'
import { addParams } from '../../Redux/actions/Parametres'
import {removeBonMembre} from '../../Redux/actions/BonsMembre'
import emailjs from 'emailjs-com'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal2Confirmation from '../Modal2Confirmation'
import ArticlesMembre from '../../containers/ArticlesMembre'

toast.configure()



const Home = () => {


    const {REACT_APP_EMAILJS_SERVICE_MAIL, REACT_APP_EMAILJS_PUBLIC_KEY} = process.env

    const user = useSelector(state => state.user)
    const parametres = useSelector(state => state.parametres)
    const ArticlesMembreData= useSelector(state => state.articlesMembre)
    const BonsMembreData= useSelector(state => state.bonsMembre) 
    
    const firebase = useContext(FirebaseContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [userSession, setUserSession] = useState(null)
    const [openModalCommande, setOpenModalCommande] = useState(false)


    //Redirection vers /login si vous n'êtes pas authentifié 
    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : navigate('/login')
        })


        if(!!userSession){
            firebase.getUser(userSession.uid)
            .then((doc) => { 
                if (doc && doc.exists) {
                    dispatch(addUser(doc.data()))

                    //Récupération des parametres
                    firebase.getParams()
                    .then(params => {
                        dispatch(addParams(params.data()))
                    })
                    .catch(err => {
                        console.log('firebase.getParams',err)
                    })

                }
            })
            .catch((error) => {
                console.log('firebase.getUser', error);
            })
        }
    
        return () => {
            listener()
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSession])


    //Clique bouton "J'ai fini ma commande"
    const handleClick = () => {
        
        var finishArticleOK = false
        var finishBonOK = false

        //Ajoute les articles
        if (ArticlesMembreData.length) {
            ArticlesMembreData.forEach(data => {
                const uid = data.id
                const article = {
                    id: data.id,
                    user_name: user.prenom + ' ' + user.nom,
                    user_id: userSession.uid,
                    reference: data.reference,
                    prix: data.prix,
                    quantite: data.quantite,
                    variante: data.variante,
                    description: data.description,
                    destination: data.destination,
                    date: data.date,
                    //-- statut --
                    standby: true,
                    forCommande: true,
                    forFacture: false,
                    forRetour: false,
                    commande: '',
                    facture: '',
                    depot: false,
                    retour: false,
                }

                firebase.addArticle(uid, article)
                .then(() => {
                    console.log('Article ajouté avec succés !')
                    dispatch(removeArticleMembre(uid))
                })
                .catch((error) => {
                    console.log('firebase.addArticle',error)
                    //notification indiquant une erreur lors de l'envoie de la commande
                    toast.error("Echec lors de l'envoie de la commande !", {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    return false
                })
            })
            finishArticleOK = true
        } else {
            return false
        }

        if (finishArticleOK) {
            //Ajoute les bons
            if (BonsMembreData.length) {
                BonsMembreData.forEach(data => {
                    const uid = data.id
                    const article = {
                        id: data.id,
                        user_name: user.prenom + ' ' + user.nom,
                        user_id: userSession.uid,
                        reference: data.reference,
                        montant: data.montant,
                        date: data.date,
                        //-- statut --
                        standby: true,
                        forCommande: true,
                        commande: '',
                        facture: ''
                    }

                    firebase.addBon(uid, article)
                    .then(() => {
                        console.log('Bon ajouté avec succés !')
                        dispatch(removeBonMembre(uid))
                    })
                    .catch((error) => {
                        console.log('firebase.addBon', error)
                        //notification indiquant une erreur lors de l'envoie de la commande
                        toast.error("Echec lors de l'envoie de la commande !", {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                        return false
                    })

                })
                finishBonOK = true
            } else {
                finishBonOK = true
            }
        }

        if (finishArticleOK && finishBonOK) {
            localStorage.removeItem('ArticlesStandby')
            localStorage.removeItem('BonsStandby')

            //Envoie du mail seulment s'il y en a un de paramétré
            if (parametres.sendmail !== '') {
                const templateParams = {sendmail: parametres.sendmail}

                emailjs.send(REACT_APP_EMAILJS_SERVICE_MAIL,'template_artAttente', templateParams, REACT_APP_EMAILJS_PUBLIC_KEY)
                .then(
                    response => {console.log('MAIL SEND : SUCCESS!', response.status, response.text)}, 
                    err => {console.log('MAIL SEND : FAILED...', err)}
                )
                .catch(err => {
                    console.log('emailjs.send', err);
                })
            }
            
            //notification indiquant que la commande à bien était envoyé
            toast.success('Commande envoyé avec succès !', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }  else {

            //notification indiquant une erreur lors de l'envoie de la commande
            toast.error("Echec lors de l'envoie de la commande !", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

        //Fermeture du modal de double confirmation
        hideModal()
       
    }


    //fermeture des modals
    const hideModal = () => setOpenModalCommande(false)
    //Ouverture du modal
    const showModalCommande = () => setOpenModalCommande(true)

    //activation du modal de double confirmation
    const displayModalCommande = openModalCommande && 
    <Modal2Confirmation 
        hideModal={hideModal} 
        handleConfirm={handleClick}
        textValue="Êtes-vous sûr d'avoir fini cette commande ?"/>


    const btnCommandeFini = ArticlesMembreData.length ? 
    <button className='btn btn-success mb-2' onClick={showModalCommande}>
        J'ai fini ma commande
    </button>
    : 
    <button className='btn btn-success mb-2' disabled>
        J'ai fini ma commande
    </button>


    //render
    return (
        <>
        <NavbarHome/>
        <main role='main'>
            <div className='p-2 bg-light border rounded-3'>
                <div className='container text-center justify-content-center'>
                    <h1 className='display-4'>Votre commande</h1>
                    
                    <nav className='nav justify-content-center'>
                        <Link className='nav-link link-secondary' to='article'>Ajouter vos articles</Link>
                        <Link className='nav-link link-secondary' to='bon'>Ajouter vos bons d'achat</Link>
                    </nav>

                    <Outlet/>
                </div>
                <hr/>
                <div className='d-flex justify-content-center'>
                    {btnCommandeFini}
                </div>
            </div>
        </main>

        <div className='text-center justify-content-center m-4'>
            <ArticlesMembre/>         
        </div>
        
        {displayModalCommande}
        
    </>
    )
}


export default Home
