import { useState } from 'react'
import './assets/css/style.css'
import Header from './assets/components/Header'
import Main from './assets/components/Main'
import Footer from './assets/components/Footer'
import { BrowserRouter , Routes , Route } from "react-router-dom"
import Register from './assets/components/Register'
import Login from './assets/components/Login'
import AuthProvider from './AuthProvider'


function App() {
  return (
    <>
    <AuthProvider>
    <BrowserRouter>
     <Header />
     <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
     </Routes>
     <Footer />
    </BrowserRouter>
    </AuthProvider>
      
 


    </>
  )
}

export default App
