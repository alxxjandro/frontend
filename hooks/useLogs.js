/* eslint-disable */
import { useState } from 'react'
import LogsServiceProxy from '../api/proxies/logsService'

export function useLogs() {
    const [loading, setLoading] = useState(false);
    const [reportes, setReportes] = useState([]);
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState(null);

    const { getReporteByYear, getReporteByDate, getReporteByDetail } = LogsServiceProxy();

    
    // --- Obtener todos los logs por año ---
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

    // --- Obtener reportes por fecha ---
    const fetchReportesByDate = async (year, month) => {
        
        setLoading(true);
        setError(null);
        try {
            const data = await getReporteByDate(year, month);
            setSelected(data);
            return {success: true, data};
        } catch (err) {
            setError(err.message);
            return {success: false, error: err.message};
        } finally {
            setLoading(false);
        }
    }

    // --- Obtener reportes por detalle ---
    const fetchReportesByDetail = async (year, month, day, tipo) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getReporteByDetail(year, month, day, tipo);
            setSelected(data);
            return {success: true, data};
        } catch (err) {
            setError(err.message);
            return {success: false, error: err.message};
        } finally {
            setLoading(false);
        }
    }

    return {fetchLogsByYear, fetchReportesByDate, fetchReportesByDetail, loading, reportes, error, selected};

}
