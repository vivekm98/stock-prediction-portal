import React from 'react'
import React, { Children } from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './AuthProvider'
const PublicRoute = ({Children}) => {
    const PublicRoute = useContext(AuthContext)
  return !isLoggedIn ? (
    Children
  ):(
    <Navigate to='/dashboard'/>
  )
}

export default PublicRoute