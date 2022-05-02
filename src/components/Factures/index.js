import React from 'react'
import ContainerFactures from '../../containers/ContainerFactures'

const Factures = () => {
    return (
        <>
            <main role='main'>
                <div className='p-2 bg-light border rounded-3'>
                    <div className='container text-center justify-content-center'>
                        <h1 className='display-6'>Factures</h1>
                        <p>Historique des factures. Vous pouvez changer leur statut comme <span className='badge rounded-pill bg-info text-white'>Réglée</span> ou la générer de nouveau en PDF.</p>
                    </div>
                </div>
            </main>

            <div className='text-center justify-content-center m-4'>
                <ContainerFactures/>            
            </div>
        </>
        
    )
}

export default Factures