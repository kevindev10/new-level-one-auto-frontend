

import {  Redirect } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'





const PrivateRoute = ({children}) =>  {

  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <Spinner />
  }



 return loggedIn ? children : <Redirect to="/login" /> 




}

export default PrivateRoute