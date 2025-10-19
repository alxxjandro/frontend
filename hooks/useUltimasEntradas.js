import { useEffect, useState } from 'react'
import ProductoServiceProxy from '../api/proxies/productoService.js'

export const useUltimasEntradas = (productId, limit = 5) => {
  const productoService = ProductoServiceProxy()

  const [entradas, setEntradas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEntradas = async () => {
      try {
        setLoading(true)
        const response = await productoService.getUltimasEntradas(
          productId,
          limit
        )
        setEntradas(response.data || [])
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchEntradas()
    }
  }, [productId, limit])

  return { entradas, loading, error }
}
