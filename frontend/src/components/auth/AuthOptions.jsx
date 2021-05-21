import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'

import UserContext from '../../context/userContext'

const AuthOptions = () => {
  const {userData, setUserData} = useContext(UserContext)
  const history = useHistory()

  const register = () => history.push('/register')
  const login = () => history.push('/login')
  const logout = () => {
      setUserData({
        user: undefined
      })
  }


  return (
    <nav className="auth-options">
      {userData.user ? (
        <button onClick={logout} >Logout</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Sign In</button>
        </>
      )
      }
    </nav>
  )
}

export default AuthOptions
