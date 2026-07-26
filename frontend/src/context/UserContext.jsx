import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const dataContext = createContext()

function UserContext({ children }) {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const serverUrl = "http://localhost:8000"

  const getUserData = async () => {
    try {
      const { data } = await axios.get(serverUrl + "/api/getuserdata", { withCredentials: true })
      setUserData(data.user || data)
    } catch (error) {
      setUserData(null)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    serverUrl,
    userData,
    setUserData,
    getUserData,
    loading
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  )
}

export default UserContext
