import React, { useState } from 'react'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import {addArticleMembre} from '../Redux/actions/ArticlesMembre'

//REGEX
const validRefence = '^[0-9A-Z\\-]+$'
const validPrix = '^(([1-9][0-9]*((,|\\.)([0-9]{1,2}))?)$|0(,|\\.)([1-9][0-9]?|0[1-9])$)'
const validQuantite = '^[1-9][0-9]*$'


const AddArticle = ({addArticleMembre}) => {
 
    const [currentDate] = useState(new Date().toLocaleDateString())

    const ArticleData = {
        reference: '',
        prix: '',
        quantite: 1,
        variante: '',
        description: '',
        destination: true,
        date: currentDate
    }

    const styleComment = {
        marginTop: '-.4rem',
        marginBottom: '1rem',
        fontSize: '.7em', 
        color: '#6c757d'
    }


    const [article, setArticle] = useState(ArticleData)
    const [achat, setAchat] = useState(true)
    const [depot, setDepot] = useState(false)

    //sur changement d'etat des input form
    const handleChange = event => {
        // recuperation de l'id pour savoir sur quel input on change l'etat
        // permet de cibler directement l'input en train de changer
        if (event.target.type !== 'radio') {
            setArticle({...article, [event.target.id]: event.target.value})
        } else {
            if (event.target.id === 'achat') {
                setAchat(event.target.checked)
                setDepot(!event.target.checked)
                setArticle({...article, destination: true})
            } else {
                setAchat(!event.target.checked)
                setDepot(event.target.checked)
                setArticle({...article, destination: false})
            }
        }
    }
    

    //Ajout d'un article par le membre
    const handleSubmit = e => {
        e.preventDefault()
        addArticleMembre(article)
        setArticle(ArticleData)
        setAchat(true)
        setDepot(false)
    }

    
    const {reference, prix, quantite, variante, description} = article

    return (
        <div className='d-flex justify-content-center'>
            <form className='w-25' onSubmit={handleSubmit}>

                <input 
                    type='text' 
                    id='description'
                    className='form-control mb-3' 
                    placeholder='Description'
                    required
                    value={description}
                    onChange={handleChange}
                    data-for='tootltipInput' 
                    data-tip='Exemple : Chaussures Babolat Homme Indoor Shadow Tour'
                />
                <input 
                    type='text' 
                    id='reference'
                    className='form-control mb-3'
                    placeholder='Référence'
                    pattern={validRefence}
                    required
                    value={reference}
                    onChange={handleChange}
                    data-for='tootltipInput' 
                    data-tip='Exemple : 30S2001-4030'
                />
                <input 
                    type='number' 
                    id='prix'
                    className='form-control mb-3' 
                    placeholder='Prix'
                    required
                    pattern={validPrix}
                    min='0.10'
                    step='0.01'
                    value={prix}
                    onChange={handleChange}
                />
                <div className='d-flex justify-content-start'>
                    <label className='ps-1 pb-1 text-secondary'>Quantité</label>
                </div>
                <div className='d-flex justify-content-between'>
                    <input 
                        type='number'
                        id='quantite' 
                        style={{height: '38px'}}
                        className='form-control mb-4 w-25 flex-fill me-2' 
                        placeholder='Quantité'
                        required
                        min='1'
                        pattern={validQuantite}
                        value={quantite}
                        onChange={handleChange}
                    />
                    <div>
                        <input 
                            type='text' 
                            id='variante'
                            className='form-control mb-2 flex-fill' 
                            placeholder='Variantes'
                            required
                            value={variante}
                            onChange={handleChange}
                            data-for='tootltipInput' 
                            data-tip='Taille du vêtement, pointure des chaussures, couleur...'
                        />
                        <p className='text-start ps-3' style={styleComment}>
                            Mettre un espace si aucune variante.
                        </p>
                    </div>
                </div>       
                <div className='d-flex align-items-start flex-row mb-4'>
                    <div className='form-check ms-2 pe-5'>
                        <input 
                            className='form-check-input' 
                            type='radio' 
                            name='radioAchatDepot' 
                            id='achat' 
                            onChange={handleChange}
                            checked={achat}/>
                        <label className='form-check-label' htmlFor='radio1'>
                            Achat
                        </label>
                    </div>
                    <div className='form-check'>
                        <input 
                            className='form-check-input' 
                            type='radio' 
                            name='radioAchatDepot' 
                            id='depot'
                            onChange={handleChange}
                            checked={depot}/>
                        <label className='form-check-label' htmlFor='radio2'>
                            Dépôt
                        </label>
                    </div>
                </div>
                <ReactTooltip id="tootltipInput" place="left" effect="solid"/>
                
                <button className='btn btn-outline-secondary mb-2'>Ajouter un article</button>
            
            </form>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        addArticleMembre: param => dispatch(addArticleMembre(param))
    }
}

export default connect(null, mapDispatchToProps)(AddArticle)

