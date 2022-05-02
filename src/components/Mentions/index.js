import React from 'react'

const Mentions = () => {
    return (
        <div className='px-5'>
            <h2 className='py-3'>Mentions Légales</h2>
            
            <p>
                Conformément aux dispositions de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, nous vous informons que :
            </p>

            <p>Le site internet _ est édité par :</p>
            <div className='col-sm-4 mb-3'>
                <div className='card' style={{backgroundColor: '#ececec'}}>
                    <div className='card-body'>
                        <p className='my-1'>_nom,  _type</p>
                        <p className='my-1'>Numéro SIRET : _siret</p>
                        <p className='my-1'>Adresse : _adresse</p>
                    </div>
                    <div className='card-footer'>
                        <p className='my-1'>
                            Le nom du responsable de la publication : _nom
                        </p>
                    </div>
                </div>
            </div>

            <h6>Hébergement</h6>
            <p>Ce site est hébergé par Firebase, 188 King ST, San Francisco, CA 94107, United States, https://firebase.google.com/</p>

            <hr/>
            <h4>Images</h4>
            <p>Le favicon est une image provenant du site iconfinder.com.</p>
            <p>Les icones "déconnexion" et "Accueil" sont des images provenant du site heroicons.com.</p>
            <p>Le logo appartient à l'Association de Badminton Cosacien.</p>
        </div>
    )
}

export default Mentions
