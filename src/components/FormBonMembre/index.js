import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {addBonMembre} from '../../Redux/actions/BonsMembre'


//REGEX
const validRefence = '^[0-9A-Z\\-]+$'
const validPrix = '^[1-9][0-9]*$'


const AddBon = () => {

    const [currentDate] = useState(new Date().toLocaleDateString())

    const bonData = {
        reference: '',
        montant: '',
        date: currentDate
    }

    //Style
    const styleNote = {
        fontSize: '.8em', 
        color: '#6c757d'
    }

    const [bonAchat, setBonAchat] = useState(bonData)

    const articlesMembre = useSelector(state => state.articlesMembre)
    const dispatch = useDispatch()


    //sur changement d'etat des input form
    const handleChange = event => {
        // recuperation de l'id pour savoir sur quel input on change l'etat
        // permet de cibler directement l'input en train de changer
        setBonAchat({...bonAchat, [event.target.id]: event.target.value})
    }

    //Action du bouton d'ajout de bon
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(addBonMembre(bonAchat))
        setBonAchat(bonData)
    }

    //Destructuring
    const {reference, montant} = bonAchat

    const displayNote = articlesMembre.length === 0 && <p style={styleNote}>Il faut minimum 1 article pour ajouter un bon d'achat.</p>

    const displayBtn = reference !== '' && montant !== '' && articlesMembre.length > 0 
    ? <Button className='mb-2' variant="secondary" onClick={handleSubmit}>Ajouter un bon</Button>
    : <Button className='mb-2' variant="outline-secondary" disabled>Ajouter un bon</Button>

    

    //render
    return (
        <div className='d-flex justify-content-center'>
            <form className='w-25' onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    id='reference'
                    className='form-control mb-3'
                    placeholder="Numero du bon d'achat"
                    required
                    pattern={validRefence}
                    value={reference}
                    onChange={handleChange}
                />
                <input 
                    type='text' 
                    id='montant'
                    className='form-control mb-3'
                    placeholder="Montant"
                    required
                    pattern={validPrix}
                    value={montant}
                    onChange={handleChange}
                />

                {displayNote}
                {displayBtn}

            </form>        
        </div>
    )
}



export default AddBon
