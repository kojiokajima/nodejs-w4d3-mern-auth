import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

import UserContext from '../../context/userContext'
import {ErrorNotice} from '../ErrorNotice'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState()
  
  const {setUserData} = useContext(UserContext)
  const history = useHistory()

  const submit = async(e) => {
    e.preventDefault()

    try{
      const loginUser = {email, password}
      const loginRes = await  axios.post(
        'http://localhost:8000/users/login',
        loginUser
      )
      setUserData({
        user: loginRes.data.user,
        token: loginRes.data.token
      })
      
      localStorage.setItem("auth-token", loginRes.data.token)
      history.push('/')
    } catch(err) {
      // console.log(err.response.data.msg);
      err.response.data.msg && setError(err.response.data.msg)

    }
  }


  return (
    <div className="page">
      <h2>Login</h2>
      {
        error && (
          <ErrorNotice message={error} clearError={() => setError()} />
        )
      }
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input 
          type="email"
          id="login-email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="login-password">Password</label>
        <input 
          type="password"
          id="login-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Log In" />
      </form>
    </div>
  )
}

export default Login
