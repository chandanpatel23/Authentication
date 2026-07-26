import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { dataContext } from '../context/UserContext'

function Home() {
  const { userData, setUserData, getUserData, serverUrl } = useContext(dataContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(!userData)

  useEffect(() => {
    if (!userData) {
      setLoading(true)
      getUserData().finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!loading && !userData) {
      navigate('/login')
    }
  }, [loading, userData, navigate])

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/logout`, {}, { withCredentials: true })
      setUserData(null)
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (loading) {
    return (
      <div className='w-full h-screen bg-[#2e3834] flex justify-center items-center text-white text-[20px]'>
        Loading...
      </div>
    )
  }

  const displayName = userData?.userName || userData?.firstName || 'there'

  return (
    <div className='w-full h-screen bg-[#2e3834] flex flex-col justify-center items-center gap-[20px]'>
      <div className='w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-white'>
        <img src={userData?.profileImage} alt='' className='w-full h-full' />
      </div>
      <p className='text-white text-[20px] font-semibold'>
        Welcome, <span className='text-[#57c2dd]'>{displayName}</span>!
      </p>
      <button className='bg-[#57c2dd] px-[10px] py-[5px] rounded-lg' onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Home
