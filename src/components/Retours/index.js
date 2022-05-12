import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ContainerRetour from '../../containers/Retours'
import { addArticleRetour, addRetour } from '../../Redux/actions/Retours'
import { FirebaseContext } from '../Firebase'


const Retours = () => {

    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()


    //States
    const [currentYear] = useState(new Date().getFullYear())


    useEffect(() => {
        
        //Getting des retours
        if(!localStorage.getItem('Retours')) {
            console.log("Création de la liste des retours")
            firebase.getRetours(currentYear)
            .then((docs) => {
                docs.forEach((doc) => {   
                    dispatch(addRetour(doc.data()))
                })
            })
            .catch((error) => {
                console.log('firebase.getRetours', error);
            })

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    


    return (
        <>
            <main role='main'>
                <div className='p-2 bg-light border rounded-3'>
                    <div className='container text-center justify-content-center'>
                        <h1 className='display-6'>Retours</h1>
                        <p>Gérer les retours. Vous pouvez changer leur statut comme <span className='badge rounded-pill bg-info text-white'>Retourné</span> ou le générer de nouveau en PDF.</p>
                    </div>
                </div>
            </main> 

            <div className='text-center justify-content-center m-4'>
                <ContainerRetour/>            
            </div>
        </>
        
    )
}

export default Retours
