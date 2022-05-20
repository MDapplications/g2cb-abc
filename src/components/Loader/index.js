import React from 'react'

const Loader = ({color}) => {
    
    const displayColor = color ? ` text-${color}` : ''
    
    return (
        <div className={`spinner-grow${displayColor}`} role='status'>
            <span className='visually-hidden'>Loading...</span>
        </div>
    )
}

export default Loader