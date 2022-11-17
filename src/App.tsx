import reactLogo from './assets/react.svg'
import './App.css'
import React, { createContext, useReducer, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import Login from './routes/Login'
import LoginGithub from 'react-login-github'
import { initialState, reducer } from './store'

type IAuth = {
  client_id: string
  client_secret: string
  isLoggedIn: boolean
  redirect_uri: string
  user: any
}


type IAuthContext = [IAuth, React.Dispatch<React.SetStateAction<IAuth[]>>]

export const AuthContext = createContext<IAuthContext>([initialState, () => null])

export const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <AuthContext.Provider value={[state, dispatch]}>{props.children}</AuthContext.Provider>
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

// const SomeComponent = (app) => {
//   const params = new URLSearchParams(window.location.search) // id=123
//   let param = params.get('aws-id') // 123

//   const loginOptions = {}
//   if (param) {
//     loginOptions['aws-id'] = param
//   }
//   // const param = searchParams.get('test')
//   return withAuthenticationRequired(app, {
//     // Show a message while the user waits to be redirected to the login page.
//     onRedirecting: () => <div>Loading</div>,
//     loginOptions
//   });
// };

export default App
// export default SomeComponent(App)
