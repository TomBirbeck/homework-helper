import {Route} from 'react-router-dom'
import {withAuthenticationRequired} from '@auth0/auth0-react'

const ProtectedRoute = ({element, ...args} : any) => (

    <Route
    element={withAuthenticationRequired(element, 
    )}
    {...args}/>
)

export default ProtectedRoute