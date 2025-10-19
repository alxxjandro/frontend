import { useEffect, useState } from 'react'
import ProductoServiceProxy from '../api/proxies/productoService.js'

export const useUnidades = () => {
  const [unidades, setUnidades] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const ProductoProxy = ProductoServiceProxy()

  useEffect(() => {
    const fetchUnidades = async () => {
      try {
        setLoading(true)
        const response = await ProductoProxy.getUnidades()
        if (!response) return
        setUnidades(response.data)
      } catch (e) {
        setError(e)
        throw new Error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchUnidades()
  }, [])

  return { unidades, loading, error }
}
