import {Navigate, Outlet} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'

const ProtectedRoute = () => {
const {isAuthenticated} = useAuth0()
    
return (
    isAuthenticated ? <Outlet/> : <Navigate to='/'/>
    )
}

export default ProtectedRoute