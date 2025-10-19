import { useState } from 'react'
import UsuariosServiceProxy from '../api/proxies/usuariosService'

export function useUsuarios() {
  const [loading, setLoading] = useState(false)
  const [usuarios, setUsuarios] = useState([])
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState(null)

  const {
    getAllUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioById,
  } = UsuariosServiceProxy()

  // Obtener todos los usuarios
  const fetchUsuarios = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllUsuarios()
      console.log('Usuarios obtenidos:', data)
      setUsuarios(data)
      return { success: true, data }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Crear un nuevo usuario
  const saveUsuario = async (usuarioData) => {
    setLoading(true)
    setError(null)
    try {
      const data = await createUsuario(usuarioData)
      setUsuarios((prev) => [...prev, data])
      setSelected(data)
      return { success: true, data }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Buscar usuario por ID
  const fetchUsuarioById = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getUsuarioById(id)
      setSelected(data)
      return { success: true, data }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const editUsuario = async (id, payload) => {
    setLoading(true)
    setError(null)
    try {
      const response = await updateUsuario(id, payload)
      const producto = response.data || response
      setUsuarios((prev) =>
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

  // Eliminar usuario
  const removeUsuario = async (id) => {
    setLoading(true)
    setError(null)
    try {
      await deleteUsuario(id)
      setUsuarios((prev) => prev.filter((u) => u.id !== id))
      if (selected?.id === id) setSelected(null)
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    usuarios,
    selected,
    error,
    fetchUsuarios,
    saveUsuario,
    fetchUsuarioById,
    editUsuario,
    removeUsuario,
    setUsuarios,
    setSelected,
  }
}
