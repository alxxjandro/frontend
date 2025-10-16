/* eslint-disable */
import { useState } from 'react'
import InventarioServiceProxy from '../api/proxies/inventarioService'

export function useInventario() {
  const [loading, setLoading] = useState(false)
  const [inventario, setInventario] = useState([])
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState(null)

  const { getAllInventario, getInventarioById, updateInventario } =
    InventarioServiceProxy()

  const fetchAll = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllInventario()
      setInventario(data)
      return { success: true, data }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  const fetchById = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getInventarioById(id)
      setSelected(data)
      return { success: true, data }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  const save = async (id, payload) => {
    setLoading(true)
    setError(null)
    try {
      const data = await updateInventario(id, payload)
      // update local state if present
      setInventario((prev) =>
        prev.map((it) => (it.idInventario === data.idInventario ? data : it))
      )
      setSelected(data)
      return { success: true, data }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    inventario,
    selected,
    error,
    fetchAll,
    fetchById,
    save,
    setSelected,
  }
}
