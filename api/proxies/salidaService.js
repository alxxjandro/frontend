/* eslint-disable */
import { API_BASE_URL } from '@env'

const SalidasServiceProxy = () => {
  async function createSalida(salidaData) {
    try {
      const response = await fetch(`${API_BASE_URL}/salidas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salidaData),
      })

      const respText = await response.text()

      if (!response.ok) {
        if (response.status === 400)
          throw new Error('Datos faltantes o inválidos')
        throw new Error('Error al crear la salida')
      }

      return JSON.parse(respText)
    } catch (error) {
      console.error('Error en createSalida:', error)
      throw error
    }
  }

  async function getAllSalidas() {
    const response = await fetch(`${API_BASE_URL}/salidas`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) throw new Error('Error al obtener las salidas')
    return await response.json()
  }

  async function getSalidaById(id) {
    const response = await fetch(`${API_BASE_URL}/salidas/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) {
      if (response.status === 404) throw new Error('Salida no encontrada')
      throw new Error('Error al obtener la salida')
    }
    return await response.json()
  }

  async function getRazonesSalida() {
    const response = await fetch(`${API_BASE_URL}/salidas/razones`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) throw new Error('Error al obtener las razones de salida')
    return await response.json()
  }

  return {
    createSalida,
    getAllSalidas,
    getSalidaById,
    getRazonesSalida,
  }
}

export default SalidasServiceProxy
