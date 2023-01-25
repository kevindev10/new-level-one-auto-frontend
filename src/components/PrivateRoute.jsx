

import { Navigate, Outlet ,useHistory , Redirect } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

// const PrivateRoute = () => {
//   const { loggedIn, checkingStatus } = useAuthStatus()

//   if (checkingStatus) {
//     return <Spinner />
//   }

//   return loggedIn ? <Outlet /> : <Navigate to='/login' />
// }

// export default PrivateRoute



const PrivateRoute = ({children}) =>  {
  const history = useHistory() 
  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <Spinner />
  }

  // return loggedIn ? children : history.push("/login")

 return loggedIn ? children : <Redirect to="/login" /> 




}

export default PrivateRoute