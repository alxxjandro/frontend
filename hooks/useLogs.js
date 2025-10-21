/* eslint-disable */
import { useState, useRef } from 'react'
import LogsServiceProxy from '../api/proxies/logsService'

export function useLogs() {
  const [loading, setLoading] = useState(false)
  const [reportes, setReportes] = useState([])
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState(null)

  const monthlyCache = useRef({})

  const { getReporteByYear, getReporteByDate, getReporteByDetail } =
    LogsServiceProxy()

  const fetchLogsByYear = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getReporteByYear()
      const reportes = response.data || response
      setReportes(reportes)
      return { success: true, data: reportes }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  const fetchReportesByDate = async (year, month) => {
    const cacheKey = `${year}-${month}`
    if (monthlyCache.current[cacheKey]) {
      return monthlyCache.current[cacheKey]
    }

    setLoading(true)
    setError(null)
    try {
      const data = await getReporteByDate(year, month)
      setSelected(data)
      monthlyCache.current[cacheKey] = data
      return data
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const fetchReportesByDetail = async (year, month, day, tipo) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getReporteByDetail(year, month, day, tipo)
      setSelected(data)
      return data
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return {
    fetchLogsByYear,
    fetchReportesByDate,
    fetchReportesByDetail,
    loading,
    reportes,
    error,
    selected,
  }
}
