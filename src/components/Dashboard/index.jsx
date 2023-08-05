import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBarDashboard from '../NavbarDashboard'


const Dashboard = () => {

    //Hooks
    const user = useSelector(state => state.user)

    //Redux
    const navigate = useNavigate()

    //States
    const [currentYear] = useState(new Date().getFullYear())


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
            <Outlet context={currentYear}/>
        </>
    )
}

export default Dashboard
