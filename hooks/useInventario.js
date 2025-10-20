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
      const response = await getAllInventario()
      const inventario = response.data || response
      setInventario(inventario)
      return { success: true, data: inventario }
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
      const response = await getInventarioById(id)
      const inventario = response.data || response
      setSelected(inventario)
      return { success: true, data: inventario }
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
      const response = await updateInventario(id, payload)
      const inventario = response.data || response
      // update local state if present
      setInventario((prev) =>
        prev.map((it) =>
          it.idInventario === inventario.idInventario ? inventario : it
        )
      )
      setSelected(inventario)
      return { success: true, data: inventario }
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
