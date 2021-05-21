import React, {useState, useEffect} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import UserContext from './context/userContext'

import Home from './pages/Home'
import Login from './components/auth/Login'
import Header from './components/Header'
import Register from './components/auth/Register'


import './App.css';
import axios from 'axios'

function App() {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined
  })
  
  useEffect(() => {
    const checkLoggedIn = async() => {
      let token = localStorage.getItem("auth-token")
      if(token === null) {
        localStorage.setItem("auth-token", "")
        token = ""
      }

      const tokenRes = await axios.post(
        'http://localhost:8000/users/tokenIsValid',
        null,
        {
          headers: {"x-auth-token": token}
        }
      )

      if(tokenRes.data){
        const userRes = await axios.get(
          'http://localhost:8000/users',
          {
            headers: {"x-auth-token": token}
          }
        )

        setUserData({
          token: token,
          user: userRes.data
        })
      }
    }

    checkLoggedIn()
  }, [])

  return (
    <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
        <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
