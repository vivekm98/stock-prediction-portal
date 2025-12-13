import React, { Children } from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './AuthProvider'

const PrivateRoute = ({Children}) => {
    const {isLoggedIn} = useContext(AuthContext)
  return isLoggedIn ? (
    Children
  ):(
    <Navigate to='/login' />
  )
}

export default PrivateRoute