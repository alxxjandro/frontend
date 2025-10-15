/* eslint-disable */
import { API_BASE_URL } from '@env'

const AuthServiceProxy = () => {
  async function login(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      if (response.status === 400) throw new Error('Datos inválidos')
      if (response.status === 401) throw new Error('Credenciales incorrectas')
      throw new Error('Error al conectar con el servidor')
    }

    return await response.json()
  }

  return { login }
}

export default AuthServiceProxy
