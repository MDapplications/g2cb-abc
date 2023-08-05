import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'


const ForgetPassword = () => {

    //Style
    const cardLogin = {
        width: '25%',
    }

    //States
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    //Hooks
    const navigate = useNavigate()
    const firebase = useContext(FirebaseContext)

    //Demande de réinitialisation de mot de passe
    const handleSubmit = event => {
        event.preventDefault()
        firebase.passwordReset(email)
        .then(() => {
            setError(null)
            setSuccess(`Consulter votre email ${email} pour changer de mot de passe.`)
            setEmail('')

            setTimeout(() => {
                navigate("/login")
            }, 5000);
        })
        .catch(error => {
            setError(error.message)
            setEmail('')
        })
    }

    //Désactivation du bouton si pas de mail renseigné
    const btnDisabled = email === ''

    // gestion erreurs
    const errorMsg = error !== null && 
    <div className='d-flex justify-content-center mb-2 alert alert-danger' role='alert'>
        <span>{error}</span>
    </div>


    // gestion success de la demande de changement de mot de passe
    const successMsg = success !== null && 
    <div className='d-flex justify-content-center mb-2 alert alert-success' role='alert'>
        <span>{success}</span>
    </div>


    //render
    return (
        <div className='d-flex justify-content-center' style={{marginTop: '50px'}}>
            <div className='card text-dark bg-light' style={cardLogin}>
                <div className='card-header'>
                    <h5 className='d-flex justify-content-center'>Mot de passe oublié</h5>
                </div>
                <div className='card-body'>

                    {successMsg}
                    {errorMsg}

                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email :</label>
                            <input 
                                onChange={e => setEmail(e.target.value)} 
                                value={email} 
                                type='email' 
                                className='form-control' 
                                id='email'/>
                        </div>
                        <div className='d-flex justify-content-center mt-3'>
                            <Link to='/login' className='link-secondary' style={{textDecoration: 'none'}}>Retour à la page de connexion</Link>
                        </div>
                        <div className='d-flex justify-content-center mt-4 m-1'>
                            <button type='submit' className='btn btn-primary' disabled={btnDisabled}>Générer un nouveau mot de passe</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        

    )
}

export default ForgetPassword
