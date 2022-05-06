import React, { useContext, useEffect, useState } from 'react'
import {FirebaseContext} from '../Firebase'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeAllPrepaFacture } from '../../Redux/actions/PrepaFactures'
import { removeAllDepot } from '../../Redux/actions/Depot'
import { removeAllCommande } from '../../Redux/actions/Commandes'
import { removeAllFacture } from '../../Redux/actions/Factures'


const Login = ({showModal}) => {

    const firebase = useContext(FirebaseContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const listFactures = useSelector(state => state.prepaFactures)

    // variable d'etat du formulaire
    const data = {
        email: '',
        password: ''
    }

    // etat (component) du formulaire
    const [loginData, setLoginData] = useState(data)
    const [btnLogin, setBtnLogin] = useState(false)
    const [error, setError] = useState('')

    //destructuring de mon objet
    const { email, password } = loginData

    //condition activation du bouton connexion
    useEffect(() => {
        if(loginData.password.length > 5 && loginData.email !== '') {
            setBtnLogin(true)
        } else if (btnLogin === true) {
            setBtnLogin(false)
        }

        if (Object.keys(listFactures).length > 0) {
            dispatch(removeAllPrepaFacture())
        }
        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [btnLogin, listFactures, loginData])


    //En chargant le composant
    useEffect(() => {
        dispatch(removeAllDepot())
        dispatch(removeAllCommande())
        dispatch(removeAllFacture())      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    //sur changement d'etat des input form
    const handleChange = event => {
        // recuperation de l'id pour savoir sur quel input on change l'etat
        // permet de cibler directement l'input en train de changer
        setLoginData({...loginData, [event.target.id]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        firebase.loginUser(email, password)
        .then(user => {
            setLoginData({...data})
            setError('')            
            //Supression de certaines données dans localStorage à la connexion pour récupération des datas fraiches depuis Firebase.
            localStorage.removeItem('ArticlesStandby')
            localStorage.removeItem('BonsStandby')
            localStorage.removeItem('Commandes')
            localStorage.removeItem('Factures')
            localStorage.removeItem('Depot')
            navigate('/')
        })
        .catch(error => {
            setError(error)
            setLoginData({...data}) // on revient à l'etat initial
        })
    }


    // gestion du bouton Connexion
    const btnSubmitForm = btnLogin ? 
        <button className='btn btn-primary' onClick={handleSubmit}>Se connecter</button>
        : 
        <button className='btn btn-primary' onClick={handleSubmit} disabled>Se connecter</button>


    // gestion erreurs
    const errorMsg = error !== '' && 
    <div className='d-flex justify-content-center mb-2 alert alert-danger' role='alert'>
        <span>{error.message}</span>
    </div>


    return (
        <div className='d-flex justify-content-center' style={{marginTop: '50px'}}>
            <div className='card text-dark bg-light card-form'>
                <div className='card-header'>
                    <h5 className='d-flex justify-content-center'>Connexion</h5>
                </div>
                <div className='card-body'>

                    {errorMsg}

                    <form>
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email :</label>
                            <input 
                                type='email' 
                                className='form-control' 
                                id='email'
                                value={email}
                                onChange={handleChange}/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label'>Mot de passe</label>
                            <input 
                                type='password' 
                                className='form-control' 
                                id='password'
                                value={password}
                                onChange={handleChange}/>
                        </div>

                        <div className='d-flex justify-content-center mt-2 m-1'>
                            {btnSubmitForm}
                        </div>
                    </form>
                    <div className='d-flex justify-content-center mt-3'>
                        <Link to='/forgetPassword' className='link-secondary' style={{textDecoration: 'none'}}>Mot de passe oublié ?</Link>
                    </div>
                </div>
                <div className='card-footer d-flex justify-content-center'>
                    <button 
                        type='submit' 
                        className='btn btn-success' 
                        data-bs-toggle='modal' 
                        data-bs-target='#staticBackdrop'
                        onClick={showModal}>
                            Créer un nouveau compte
                    </button>
                </div>
            </div>
        </div>
        

    )
}

export default Login
