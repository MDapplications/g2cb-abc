import React, { useState } from 'react'
import { connect } from 'react-redux'
import {addBonMembre} from '../Redux/actions/BonsMembre'


//REGEX
const validRefence = '^[0-9A-Z\\-]+$'
const validPrix = '^[1-9][0-9]*$'


const AddBon = ({BonsMembreData, addBonMembre}) => {

    const [currentDate] = useState(new Date().toLocaleDateString())

    const bonData = {
        reference: '',
        montant: 0,
        date: currentDate
    }

    const [bonAchat, setBonAchat] = useState(bonData)


    //sur changement d'etat des input form
    const handleChange = event => {
        // recuperation de l'id pour savoir sur quel input on change l'etat
        // permet de cibler directement l'input en train de changer
        setBonAchat({...bonAchat, [event.target.id]: event.target.value})
    }


    const handleSubmit = e => {
        e.preventDefault()
        addBonMembre(bonAchat)
        setBonAchat(bonData)
    }



    const {reference, montant} = bonAchat

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
                    type='number' 
                    id='montant'
                    className='form-control mb-3'
                    placeholder="Montant"
                    required
                    min='1'
                    step='1'
                    pattern={validPrix}
                    value={montant}
                    onChange={handleChange}
                />

                <button className='btn btn-outline-secondary mb-2'>Ajouter un bon</button>
            </form>
            
        </div>
    )
}



const mapDispatchToProps = (dispatch) => {
    return {
        addBonMembre: param => dispatch(addBonMembre(param))
    }
}

export default connect(null, mapDispatchToProps)(AddBon)