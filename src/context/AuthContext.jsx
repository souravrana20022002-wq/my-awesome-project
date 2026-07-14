import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

const defaultUser = {
  name: 'Ava Carter',
  email: 'ava@taskflow.dev',
  role: 'Product Designer',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('taskflow-user')
    return saved ? JSON.parse(saved) : null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      localStorage.setItem('taskflow-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('taskflow-user')
    }
  }, [user])

  const login = async (email, password) => {
    setLoading(true)
    setError('')

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      const foundUser = response.data.find((item) => item.email === email)

      if (!foundUser || password.length < 4) {
        throw new Error('Invalid credentials. Try ava@taskflow.dev with any 4+ character password.')
      }

      const authUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: 'Product Designer',
      }
      setUser(authUser)
      return authUser
    } catch (err) {
      setError(err.message || 'Unable to sign in right now.')
      return null
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name, email, password) => {
    setLoading(true)
    setError('')

    try {
      if (!name || !email || password.length < 4) {
        throw new Error('Please enter valid details to create your account.')
      }

      const authUser = {
        id: Date.now(),
        name,
        email,
        role: 'New Team Member',
      }
      setUser(authUser)
      return authUser
    } catch (err) {
      setError(err.message || 'Unable to create account now.')
      return null
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, loading, error, login, signup, logout, defaultUser }),
    [user, loading, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
