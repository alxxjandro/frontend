/* eslint-disable */
import { useState } from 'react'
import ProductoServiceProxy from '../api/proxies/productoService'

export function useProducto() {
  const [loading, setLoading] = useState(false)
  const [productos, setProductos] = useState([])
  const [selected, setSelected] = useState(null)
  const [categorias, setCategorias] = useState([])
  const [error, setError] = useState(null)

  const {
    getAllProductos,
    getProductoById,
    getCategorias,
    createProducto,
    updateProducto,
    deleteProducto,
  } = ProductoServiceProxy()

  const fetchAll = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getAllProductos()
      const productos = response.data || response
      setProductos(productos)
      return { success: true, data: productos }
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
      const response = await getProductoById(id)
      const producto = response.data || response
      setSelected(producto)
      return { success: true, data: producto }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  const create = async (payload) => {
    setLoading(true)
    setError(null)
    try {
      const response = await createProducto(payload)
      const producto = response.data || response
      setProductos((prev) => [...prev, producto])
      return { success: true, data: producto }
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
      const response = await updateProducto(id, payload)
      const producto = response.data || response
      setProductos((prev) =>
        prev.map((it) =>
          it.idProducto === producto.idProducto ? producto : it
        )
      )
      setSelected(producto)
      return { success: true, data: producto }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const response = await deleteProducto(id)
      setProductos((prev) => prev.filter((it) => it.idProducto !== id))
      if (selected?.idProducto === id) {
        setSelected(null)
      }
      return { success: true, data: response }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  const fetchCategorias = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getCategorias()
      const categorias = response.data || response
      setCategorias(categorias)
      return { success: true, data: categorias }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    productos,
    selected,
    categorias,
    error,
    fetchAll,
    fetchById,
    fetchCategorias,
    create,
    save,
    remove,
    setSelected,
  }
}
