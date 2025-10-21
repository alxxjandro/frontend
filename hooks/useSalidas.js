import { useState } from 'react'
import SalidasServiceProxy from '../api/proxies/salidaService'

export function useSalidas() {
  const [loading, setLoading] = useState(false)
  const [salidas, setSalidas] = useState([])
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState(null)

  const { getAllSalidas, getSalidaById, createSalida, getRazonesSalida } =
    SalidasServiceProxy()

  const fetchSalidas = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllSalidas()
      setSalidas(data)
      return { success: true, data }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const fetchSalidaById = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getSalidaById(id)
      setSelected(data)
      return { success: true, data }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const fetchRazonesSalida = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getRazonesSalida()
      return { success: true, data }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const save = async (salidaData) => {
    setLoading(true)
    setError(null)
    try {
      const data = await createSalida(salidaData)
      setSalidas((prev) => [...prev, data])
      setSelected(data)
      return { success: true, data }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    salidas,
    selected,
    error,
    fetchSalidas,
    fetchSalidaById,
    fetchRazonesSalida,
    save,
    setSelected,
  }
}
