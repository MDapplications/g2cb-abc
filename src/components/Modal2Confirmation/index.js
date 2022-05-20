import React from 'react'
import { Button } from 'react-bootstrap'

const Modal2Confirmation = ({hideModal, handleConfirm, textValue, textType}) => {

    //Texte à afficher sur le message de confirmation
    const displayText = textValue !== ''
    ? <p className='text-center'>{textValue}</p> 
    : <></>


    // render
    return (
        <div className='modalBackground'>
            <div className='modal-dialog card-form'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>Confirmation</h5> 
                    </div>
                    <div className='modal-body'>  
                        {textType ? textValue : displayText}              
                        <div className='d-flex justify-content-between'>
                            <span className='me-2'><Button variant='success' onClick={handleConfirm}>Valider</Button></span>
                            <span><Button variant='danger' onClick={hideModal}>Annuler</Button></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal2Confirmation