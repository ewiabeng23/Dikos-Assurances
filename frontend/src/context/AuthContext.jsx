import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()
const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('dikos_token'))
  const [user, setUser]   = useState(() => {
    try { return JSON.parse(localStorage.getItem('dikos_user')) } catch { return null }
  })

  async function login(username, password) {
    const form = new URLSearchParams()
    form.append('username', username)
    form.append('password', password)
    const res = await axios.post(`${API}/auth/login`, form)
    const { access_token } = res.data
    localStorage.setItem('dikos_token', access_token)
    localStorage.setItem('dikos_user', JSON.stringify({ username }))
    setToken(access_token)
    setUser({ username })
  }

  function logout() {
    localStorage.removeItem('dikos_token')
    localStorage.removeItem('dikos_user')
    setToken(null)
    setUser(null)
  }

  // Attach token to all axios requests
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ''

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
