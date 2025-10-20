import { useEffect, useState } from 'react'
import SalidasServiceProxy from '../api/proxies/salidaService'

export const useRazonesSalida = () => {
  const [razones, setRazones] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const salidasProxy = SalidasServiceProxy()

  useEffect(() => {
    const fetchRazones = async () => {
      try {
        setLoading(true)
        const response = await salidasProxy.getRazonesSalida()
        setRazones(response.data || [])
      } catch (e) {
        console.error('Error al obtener razones:', e)
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchRazones()
  }, [])

  return { razones, loading, error }
}
