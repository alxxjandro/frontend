/* eslint-disable */
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthServiceProxy from '../api/proxies/authService'
import { useRouter } from 'expo-router'

export function useAuth() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const { login } = AuthServiceProxy()

  // Al iniciar, revisa si hay token en almacenamiento
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        const storedUser = await AsyncStorage.getItem('user')

        if (token && storedUser) {
          setIsAuthenticated(true)
          setUser(JSON.parse(storedUser))
        } else {
          setIsAuthenticated(false)
        }
      } catch (err) {
        console.error('Error verificando autenticación:', err)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // --- login ---
  const handleLogin = async (nombreUsuario, password) => {
    setError(null)
    setLoading(true)
    try {
      const data = await login({ nombreUsuario, password })
      if (data.success) {
        await AsyncStorage.setItem('token', data.token)
        await AsyncStorage.setItem('user', JSON.stringify(data.user))
        setIsAuthenticated(true)
        setUser(data.user)
        return { success: true }
      } else {
        setError(data.message || 'Error al iniciar sesión')
        return { success: false }
      }
    } catch (err) {
      setError(err.message)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  // --- logout ---
  const logout = async () => {
    await AsyncStorage.multiRemove(['token', 'user'])
    setIsAuthenticated(false)
    setUser(null)
    router.navigate('/login')
  }

  return { loading, isAuthenticated, handleLogin, logout, error, user }
}
