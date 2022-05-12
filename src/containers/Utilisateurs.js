import React, { useContext, useEffect, useState } from 'react'
import { Badge, Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HiOutlineTrash } from 'react-icons/hi'
import { FirebaseContext } from '../components/Firebase'
import Modal2Confirmation from '../components/Modal2Confirmation'
import { deleteUsers, updateRoleUsers } from '../Redux/actions/Utilisateurs'


const ContainerUsers = () => {

    //Hooks
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //Redux
    const listUsers = useSelector(state => state.listUsers)

    //states
    const [userSession, setUserSession] = useState({uid: 0})
    const [userData, setUserData] = useState({})
    const [openModalDelete, setOpenModalDelete] = useState(false)



    //Recuperation du userSession
    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                setUserSession(user) 
            } else {
                navigate('/login')
            }
        })
        return () => listener()       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSession])


    //Passer un utilisateur comme administrateur
    const handleChecked = user => {
        switch (user.role) {
            case 1:
                firebase.updateRoleUser(user.id, 2)
                .then(() => {
                    dispatch(updateRoleUsers(user.id, 2))
                })
                .catch(err => {
                    console.log('firebase.updateRoleUser', err);
                })
                break
        
            case 2:
                firebase.updateRoleUser(user.id, 1)
                .then(() => {
                    dispatch(updateRoleUsers(user.id, 1))
                })
                .catch(err => {
                    console.log('firebase.updateRoleUser', err);
                })
                break

            default: break
        }
    }

    //Supprimer un utilisateur
    const handleDelete = id => {
        firebase.updateRoleUser(id, 0)
        .then(() => {
            dispatch(deleteUsers(id))
        })
        .catch(err => {
            console.log('firebase.updateRoleUser (delete)', err);
        })
        setOpenModalDelete(false)
    }


    //fermeture des modals
    const hideModal = () => {
        setOpenModalDelete(false)
    }

    //Ouverture du modal et recupération des infos
    const showModalDelete = (user) => {
        setUserData({id: user.id, name: `${user.prenom} ${user.nom}`})
        setOpenModalDelete(true)
    }

    //activation du modal de double confirmation
    const displayModalDelete = openModalDelete && 
        <Modal2Confirmation 
            hideModal={hideModal} 
            handleConfirm={() => handleDelete(userData.id)}
            textValue={`Êtes-vous sûr de vouloir le supprimer ${userData.name} ?`}/>


    //
    const displayListUsers = listUsers.length > 0
    ? listUsers.map(user => {
        const admin = user.role > 1
        if (user.role > 0) {
            return (
            <ListGroupItem 
                        key={user.id} 
                        className='d-flex justify-content-between align-items-center' 
                        disabled={user.role===3 || user.id===userSession.uid}>
                <div>
                    <span>{user.prenom + ' ' + user.nom}</span>
                    <span className='ms-2'>
                        {user.role===3 && <Badge bg="secondary">système</Badge>}
                    </span>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <span className='me-4'>
                        <Form.Check 
                            type='switch'
                            id='custom-switch'
                            label='Passer admin'
                            disabled={user.role===3 || user.id===userSession.uid}
                            onChange={() => handleChecked(user)}
                            defaultChecked={admin}/>
                    </span>
                    <span>
                        <Button variant="danger"
                            disabled={user.role > 1}
                            onClick={() => showModalDelete(user)}>
                                <HiOutlineTrash/>
                        </Button>
                    </span>
                </div>
            </ListGroupItem>)
        }
        return null
    })
    : <p>Aucun utilisateurs à afficher</p>

    //render
    return (
        <>
            <ListGroup className='text-start mb-5'>
                {displayListUsers}
            </ListGroup>

            {displayModalDelete}
        </>
    )
}

export default ContainerUsers
