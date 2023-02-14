import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import {addArticleMembre} from '../../Redux/actions/ArticlesMembre'

//REGEX
const validRefence = '^[0-9A-Z\\-]+$'
//const validPrix = '^(([1-9][0-9]*((,|\\.)([0-9]{1,2}))?)$|0(,|\\.)([1-9][0-9]?|0[1-9])$)'
const validQuantite = '^[1-9][0-9]*$'


const AddArticle = () => {
    

    //Hooks
    const dispatch = useDispatch()

    //State : Date courante
    const [currentDate] = useState(new Date().toLocaleDateString())

    //Constante
    const ArticleData = {
        reference: '',
        prix: '0.0',
        quantite: 1,
        variante: '',
        description: '',
        destination: true,
        date: currentDate
    }

    //Style
    const styleComment = {
        marginTop: '-.4rem',
        fontSize: '.7em', 
        color: '#6c757d'
    }

    //States
    const [article, setArticle] = useState(ArticleData)
    const [prixMembreText, setPrixMembreText] = useState(ArticleData.prix)
    const [achat, setAchat] = useState(true)
    const [depot, setDepot] = useState(false)

    //sur changement d'etat des input form
    const handleChange = event => {
        // recuperation de l'id pour savoir sur quel input on change l'etat
        // permet de cibler directement l'input en train de changer

        switch (event.target.type) {
            case 'radio':
                if (event.target.id === 'achat') {
                    setAchat(event.target.checked)
                    setDepot(!event.target.checked)
                    setArticle({...article, destination: true})
                } else {
                    setAchat(!event.target.checked)
                    setDepot(event.target.checked)
                    setArticle({...article, destination: false})
                }
                break; 
            default:
                setArticle({...article, [event.target.id]: event.target.value})
                break;
        }
    }

    const handleChangePrix = event => {
        setPrixMembreText(event.target.value)
        setArticle({...article, prix: Number(event.target.value)})
    }
    
    //Destructuring
    const {reference, prix, quantite, variante, description, destination} = article
    

    //Ajout d'un article par le membre
    const handleSubmit = e => {
        e.preventDefault()

        const prixMembre = Number(article.prix)
        const quantiteMembre = Number(article.quantite)

        dispatch(addArticleMembre({
            reference,
            prix: prixMembre,
            quantite: quantiteMembre,
            variante,
            description,
            destination,
            date: currentDate
        }))
        setArticle(ArticleData)
        setPrixMembreText(ArticleData.prix)
        setAchat(true)
        setDepot(false)
    }

    
    const displayBtn = reference !== '' && prix !== '' && variante !== '' && description !== '' && Number(prix) > 0
    ? <Button className='mb-2' variant="secondary" onClick={handleSubmit}>Ajouter un article</Button>
    : <Button className='mb-2' variant="outline-secondary" disabled>Ajouter un article</Button>


    //render
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
                <p className='text-start ps-3 mb-1' style={styleComment}>
                    Mettre un espace si aucune variante.
                </p>
                <div className='d-flex justify-content-start'>
                    <label className='ps-1 pb-1 text-secondary'>Quantité</label>
                </div>
                <div className='d-flex justify-content-between'>
                    <input 
                        type='text'
                        id='quantite' 
                        style={{height: '38px'}}
                        className='form-control mb-4 w-25 flex-fill me-2' 
                        placeholder='Quantité'
                        required
                        pattern={validQuantite}
                        value={quantite}
                        onChange={handleChange}
                    />
                    <div>
                        <input 
                            type='number' 
                            id='prix'
                            className='form-control mb-3' 
                            placeholder='Prix'
                            required
                            //pattern={validPrix}
                            value={prixMembreText}  
                            min='0' 
                            onChange={handleChangePrix}
                            data-for='tootltipInputPrix'
                            data-tip='Ne pas mettre : €'
                        />
                        <ReactTooltip id="tootltipInputPrix" place="right" effect="solid"/>
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
                
                {displayBtn}

            </form>
        </div>
    )
}


export default AddArticle

