/* eslint-disable */
import { API_BASE_URL } from '@env'

const EntradasServiceProxy = () => {
  async function getAllEntradas() {
    const response = await fetch(`${API_BASE_URL}/entradas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Error al obtener las entradas')
    }
    return await response.json()
  }

  async function getEntradaById(id) {
    const response = await fetch(`${API_BASE_URL}/entradas/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      if (response.status === 404) throw new Error('Entrada no encontrada')
      throw new Error('Error al obtener la entrada')
    }
    return await response.json()
  }

  async function createEntrada(entradaData) {
    const response = await fetch(`${API_BASE_URL}/entradas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entradaData),
    })
    const respText = await response.text()
    if (!response.ok) {
      throw new Error('Error al crear la entrada')
    }
    return JSON.parse(respText)
  }

  return { getAllEntradas, getEntradaById, createEntrada }
}

export default EntradasServiceProxy
