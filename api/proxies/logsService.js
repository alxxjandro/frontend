/* eslint-disable */
import { API_BASE_URL } from '@env'

const LogsServiceProxy = () => {
  async function getReporteByYear() {
    const response = await fetch(`${API_BASE_URL}/reportes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Error al obtener los reportes')
    }

    return await response.json()
  }

  async function getReporteByDate(year, month) {
    const response = await fetch(`${API_BASE_URL}/reportes/${year}/${month}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) throw new Error('Reporte no encontrado')
      throw new Error('Error al obtener el reporte')
    }
    
    return await response.json()
  }

  async function getReporteByDetail(year, month, day, tipo) {
    const response = await fetch(`${API_BASE_URL}/reportes/${year}/${month}/${day}/${tipo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) throw new Error('Reporte no encontrado')
      throw new Error('Error al obtener el reporte')
    }
    
    return await response.json()
  }

  

  return {
    getReporteByYear,
    getReporteByDetail,
    getReporteByDate
  }
}

export default LogsServiceProxy