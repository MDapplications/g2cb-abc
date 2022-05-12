import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBarDashboard from '../NavbarDashboard'


const Dashboard = () => {

    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    //redirection vers home
    useEffect(() => {
        if (user.role < 2) {
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    //render
    return (
        <>
            <NavBarDashboard/>
            <Outlet/>
        </>
    )
}

export default Dashboard
