import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FirebaseContext } from '../Firebase'
import ContainerRetour from '../../containers/ContainerRetour'
import { addRetour } from '../../Redux/actions/Retours'


const Retours = () => {

    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()

    //Redux
    const {yearSelected} = useSelector(state => state.parametres)

    //State
    const [selectYear, setSelectYear] = useState(yearSelected)


    //Actualisation de la liste des retours sur changement d'année selectionnée
    useEffect(() => {
        if (selectYear !== yearSelected) {
            setSelectYear(yearSelected)
        }
    }, [yearSelected, selectYear])


    //Récupération des bon de retours
    useEffect(() => {
        
        //Getting des retours
        if(!localStorage.getItem('Retours')) {
            console.log("Création de la liste des retours de :", selectYear)
            firebase.getRetours(selectYear)
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
    }, [selectYear])
    

    //render
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
