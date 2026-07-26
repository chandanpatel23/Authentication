import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import { useContext } from 'react'
import { dataContext } from './context/UserContext'

function App() {
  const { userData, loading } = useContext(dataContext)

  if (loading) {
    return <div className='w-full h-screen bg-black flex justify-center items-center text-white'>Loading...</div>
  }

  return (
    <Routes>
      <Route path='/signup' element={userData ? <Navigate to="/home" /> : <SignUp />} />
      <Route path='/login' element={userData ? <Navigate to="/home" /> : <Login />} />
      <Route path='/home' element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path='*' element={userData ? <Navigate to="/home" /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App
