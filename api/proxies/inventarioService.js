/* eslint-disable */
import { API_BASE_URL } from '@env'

const InventarioServiceProxy = () => {
  async function getAllInventario() {
    const response = await fetch(`${API_BASE_URL}/inventario`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Error al obtener inventario')
    }

    return await response.json()
  }

  async function getInventarioById(id) {
    const response = await fetch(`${API_BASE_URL}/inventario/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) throw new Error('Inventario no encontrado')
      throw new Error('Error al obtener inventario')
    }

    return await response.json()
  }

  async function updateInventario(id, payload) {
    const response = await fetch(`${API_BASE_URL}/inventario/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      if (response.status === 400) throw new Error('Datos inválidos')
      throw new Error('Error al actualizar inventario')
    }

    return await response.json()
  }

  return { getAllInventario, getInventarioById, updateInventario }
}

export default InventarioServiceProxy
