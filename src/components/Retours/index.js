import React from 'react'

const Retours = () => {
    return (
        <main role='main'>
            <div className='p-2 bg-light border rounded-3'>
                <div className='container text-center justify-content-center'>
                    <h1 className='display-6'>Retours</h1>
                    <p>Gérer les retours. Vous pouvez changer leur statut comme <span className='badge rounded-pill bg-info text-white'>Retourné</span> ou le générer de nouveau en PDF.</p>
                </div>
            </div>
        </main> 
    )
}

export default Retours
