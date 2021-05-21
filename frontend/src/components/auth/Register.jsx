import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

import UserContext from '../../context/userContext'
import {ErrorNotice} from '../ErrorNotice'

const Register = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordCheck, setPasswordCheck] = useState()
  const [displayName, setDisplayName] = useState()
  const [error, setError] = useState()

  const {setUserData} = useContext(UserContext)
  const history = useHistory()

  const submit = async (e) => {
    e.preventDefault()
    try{
      const newUser = {
        email,
        password,
        confirmPassword: passwordCheck,
        displayName
      }
      await axios.post('http://localhost:8000/users/register', newUser)
      // auto login
      const loginRes = await axios.post("http://localhost/users/login", {
        email,
        password
      })
      setUserData({
        user: loginRes.data.user
      })

      history.push('/')
    } catch(err) {
      err.response.data.msg && setError(err.response.data.msg)
    }
  }

  return (
    <div className="page">
      <h2>Register</h2>
      {
        error && (
          <ErrorNotice message={error} clearError={() => setError()} />
        )
      }
      <form action="" className="form" onSubmit={submit}>
        <label htmlFor="register-display-name">Display Name</label>
        <input
          type="text"
          id="register-display-name"
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <label htmlFor="register-email">Email</label>
        <input
          type="text"
          id="register-email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          type="password"
          id="register-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Verify Password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  )
}

export default Register
