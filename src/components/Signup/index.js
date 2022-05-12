import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import {FirebaseContext} from '../Firebase'
import { addUser } from '../../Redux/actions/Users'


const patternMdp = '^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$'

const Signup = ({hideModal}) => {

    //Hooks
    const firebase = useContext(FirebaseContext)
    const navigate = useNavigate()

    // variable d'etat du formulaire
    const data = {
        prenom: '',
        nom: '',
        email: '',
        password: '',
        confirmPassword: '',
        checkCGU: false
    }

    // etat (component) du formulaire
    const [loginData, setLoginData] = useState(data)
    const [error, setError] = useState('')

    //destructuring de mon objet
    const { prenom, nom, email, password, confirmPassword, checkCGU } = loginData


    //sur changement d'etat des input form
    const handleChange = event => {
        // recuperation de l'id pour savoir sur quel input on change l'etat
        // permet de cibler directement l'input en train de changer
        if (event.target.type !== 'checkbox') {
            setLoginData({...loginData, [event.target.id]: event.target.value})
        } else {
            setLoginData({...loginData, [event.target.id]: event.target.checked})
        }
    }

    //Validation du formulaire
    const handleSubmit = e => {
        e.preventDefault()

        firebase.signupUser(email, password)
        .then(authUser => {
            firebase.addUser(authUser.user.uid, {
                prenom: prenom,
                nom: nom,
                email: email,
                adresse: '',
                code_postal: '',
                ville: '',
                club: false,
                role: 1
            })
            .then(() => {
                setLoginData({...data}) // on revient à l'etat initial
                setError('')
                navigate('/')
            })
            .catch(error => {
                setError(error)
                setLoginData({...data}) // on revient à l'etat initial
            })
        })
        .catch(error => {
            setError(error)
            setLoginData({...data}) // on revient à l'etat initial
        })
    }


    //condition d'affichage du bouton "Inscription"
    const btnInscription =  !checkCGU || 
                            prenom === '' || 
                            nom === '' || 
                            email === '' || 
                            password === '' || 
                            password !== confirmPassword 
    ? <button className='btn btn-success' disabled >S'inscrire</button> : <button className='btn btn-success'>S'inscrire</button>



    // gestion erreurs
    const errorMsg = error !== '' && 
    <div className='d-flex justify-content-center mb-2 alert alert-danger' role='alert'>
        <span>{error.message}</span>
    </div>


    // render
    return (
        <div className='modalBackground'>
            <div className='modal-dialog card-form'>
                <div className='modal-content'>

                    <div className='modal-header'>
                        <h5 className='modal-title'>Créer un nouveau compte</h5>
                        <button 
                            type='button' 
                            className='btn-close' 
                            aria-label='Close'
                            onClick={hideModal}>
                        </button>
                    </div>

                    <div className='card-body'>

                        {errorMsg}

                        <form onSubmit={handleSubmit}>
                            <div className='mb-3 row g-2 justify-content-between'>
                                <div className='col-auto'>
                                    <label htmlFor='prenom' className='form-label'>Prénom :</label>
                                    <input 
                                        type='text' 
                                        className='form-control' 
                                        id='prenom'
                                        minLength='1'
                                        value={prenom}
                                        onChange={handleChange}/>
                                </div>
                                <div className='col-auto'>
                                    <label htmlFor='nom' className='form-label'>Nom :</label>
                                    <input 
                                        type='text' 
                                        className='form-control' 
                                        id='nom'
                                        minLength='1'
                                        value={nom}
                                        onChange={handleChange}/>
                                </div>
                                
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='email' className='form-label'>Email :</label>
                                <input 
                                    type='email' 
                                    className='form-control' 
                                    id='email'
                                    minLength='5'
                                    value={email}
                                    onChange={handleChange}/>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='password' className='form-label'>Mot de passe</label>
                                <input 
                                    type='password' 
                                    className='form-control' 
                                    id='password'
                                    minLength='8'
                                    pattern={patternMdp}
                                    value={password}
                                    onChange={handleChange}/>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='confirmPassword' className='form-label'>Confirmation du mot de passe</label>
                                <input 
                                    type='password' 
                                    className='form-control' 
                                    id='confirmPassword'
                                    minLength='8'
                                    value={confirmPassword}
                                    onChange={handleChange}/>
                            </div>
                            <div className='mb-3 form-check'>
                                <input 
                                    type='checkbox' 
                                    className='form-check-input' 
                                    id='checkCGU' 
                                    checked={checkCGU}
                                    onChange={handleChange}/>
                                <label className='form-check-label' htmlFor='checkCGU'>
                                    J'ai lu et j'accepte les <Link to='/conditions'>Conditions d'utilisation</Link>.
                                </label>
                            </div>

                            <div className='d-flex justify-content-center mt-4 m-1'>
                                {btnInscription}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>   
    )
}


const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: param => dispatch(addUser(param)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
