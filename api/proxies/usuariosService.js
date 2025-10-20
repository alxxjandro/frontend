/* eslint-disable */
import { API_BASE_URL } from '@env'

const UsuariosServiceProxy = () => {
  async function getAllUsuarios() {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios')
    }

    const result = await response.json()
    if (result.success && Array.isArray(result.data)) {
      return result.data
    }
    return []
  }

  async function getUsuarioById(id) {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      if (response.status === 404) throw new Error('Usuario no encontrado')
      throw new Error('Error al obtener el usuario')
    }
    const result = await response.json()
    if (result.success && result.data) {
      return result.data
    }
    return result
  }

  async function createUsuario(entradaData) {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entradaData),
    })
    if (!response.ok) throw new Error('Error al crear el usuario')
    return await response.json()
  }

  async function updateUsuario(id, usuarioData) {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioData),
    })
    if (!response.ok) throw new Error('Error al actualizar el usuario')
    return await response.json()
  }

  async function deleteUsuario(id) {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) throw new Error('Error al eliminar el usuario')
    return await response.json()
  }

  return {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
  }
}

export default UsuariosServiceProxy
