import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FirebaseContext } from '../Firebase'
import { Button, Form } from 'react-bootstrap'
import { facturableBonDepot } from '../../Redux/actions/BonsDepot'
import { addBonPrepaFactDepot, removeBonPrepaFactDepot } from '../../Redux/actions/PrepaFactDepot'


const ModalBonsDepot = ({hideModal}) => {
    
    //Redux
    const listFactures = useSelector(state => state.prepaFactDepot)
    const bonsDepot = useSelector(state => state.bonsDepot)

    //States
    const [displayBtnBon, setDisplayBtnBon] = useState(false)
    const [tabUserName, setTabUserName] = useState([])
    const [selectUserName, setSelectUserName] = useState('')
    const [tabBons, setTabBons] = useState([])
    const [selectBon, setSelectBon] = useState({})
    const [captionBtnBon, setCaptionBtnBon] = useState('Ajouter')

    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()


    //Récupération de la liste des membres qui vont être facturée
    useEffect(() => { 
        let tabFacture = []
        for (const facture in listFactures) {
            tabFacture = [...tabFacture, listFactures[facture].user_name]
        }
        setTabUserName(tabFacture)
    }, [listFactures])


    //Chargement de la liste de bons en fonction du membre sélectionné
    useEffect(() => {
        setTabBons(bonsDepot.filter(bon => (bon.user_name === selectUserName)))
    }, [bonsDepot, selectUserName])


    //Recupération de l'utilisateur selectionné au chargement
    useEffect(() => {
        setSelectUserName(tabUserName[0])
    }, [tabUserName])


    //change l'affichage du bouton Ajouter/Retirer un bon à une facture
    useEffect(() => {
        if (selectBon.forFacture) {
            setCaptionBtnBon('Retirer')
        } else {
            setCaptionBtnBon('Ajouter')
        }
    }, [selectBon])
    

    // Sur changement de membre
    const handleChangeUser = event => {
        setSelectUserName(event.target.value)
        setSelectBon({})
        setDisplayBtnBon(false)
    }

    // Sur changement de bon dans la liste
    const handleChangeBon = event => {
        setSelectBon(bonsDepot.find(bon => (bon.id === event.target.value)))
        setDisplayBtnBon(true)
    }


    //Affichage au format prix
    const currencyLocalPrice = prix => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
    }

        
    // Clique sur Ajouter/Retirer
    const handleClick = () => {
        if (selectBon.forFacture) {
            firebase.disableForFactureBon(selectBon.id)
            .then(() => {
                console.log('removeBonPrepaFactDepot', selectBon)
                dispatch(removeBonPrepaFactDepot(selectBon))
                dispatch(facturableBonDepot({id: selectBon.id, value: !selectBon.forFacture}))
                setSelectBon({
                    ...selectBon,
                    forFacture: !selectBon.forFacture
                })
            })
            .catch(err => {
                console.log('firebase.disableForFactureBon', err)
            })
        } else {
            firebase.enableForFactureBon(selectBon.id)
            .then(() => {
                console.log('addBonPrepaFactDepot', selectBon)
                dispatch(addBonPrepaFactDepot(selectBon))
                dispatch(facturableBonDepot({id: selectBon.id, value: !selectBon.forFacture}))
                setSelectBon({
                    ...selectBon,
                    forFacture: !selectBon.forFacture
                })
            })
            .catch(err => {
                console.log('firebase.enableForFactureBon', err)
            })
        }
    }



    // render
    return (
        <div className='modalBackground'>
            <div className='modal-dialog card-form'>
                <div className='modal-content'>
                    <div className='modal-header' style={{backgroundColor: '#f8fdff'}}>
                        <h5 className='modal-title'>Gestion des bons</h5> 
                    </div>
                    <div className='modal-body'>
                        <Form.Label>
                            Ajouter/Retirer un bon pour la facture de :
                        </Form.Label>
                        <Form.Select onChange={e => handleChangeUser(e)}>
                            {tabUserName.map((userName, index) => <option key={index} value={userName}>{userName}</option>)}
                        </Form.Select> 
                        <Form.Label className='mt-4'>
                            Bon(s) en attente pour ce membre :
                        </Form.Label>
                        <Form.Select htmlSize={5} onChange={e => handleChangeBon(e)}>
                            {tabBons.map((bon, index) =>    
                                <option key={index} value={bon.id}>
                                    {bon.reference + ' - ' + currencyLocalPrice(bon.montant)}
                                </option>)
                            }
                        </Form.Select>

                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <Button variant='primary' disabled={!displayBtnBon} onClick={handleClick}>
                            {captionBtnBon}
                        </Button>
                        <Button variant='danger' onClick={hideModal}>Fermer</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalBonsDepot
