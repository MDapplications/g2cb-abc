import React from 'react'

const Loader = ({loadingMsg, color}) => {
    
    const displayColor = color ? ` text-${color}` : ''
    
    return (
        <div className={`spinner-grow${displayColor}`} role='status'>
            <span className='visually-hidden'>{loadingMsg || 'veuillez patienter...'}</span>
        </div>
    )
}

export default Loader