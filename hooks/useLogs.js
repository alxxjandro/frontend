/* eslint-disable */
import { useState, useRef } from 'react'
import LogsServiceProxy from '../api/proxies/logsService'

export function useLogs() {
    const [loading, setLoading] = useState(false);
    const [reportes, setReportes] = useState([]);
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState(null);
    
    // ✅ OPTIMIZATION: Cache monthly data to avoid duplicate API calls
    const monthlyCache = useRef({});

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
            console.error('❌ [useLogs] fetchLogsByYear error:', err)
            setError(err.message)
            return { success: false, message: err.message }
        } finally {
            setLoading(false)
        }
    }

    // --- Obtener reportes por fecha ---
    const fetchReportesByDate = async (year, month) => {
        // ✅ OPTIMIZATION: Check cache first
        const cacheKey = `${year}-${month}`;
        if (monthlyCache.current[cacheKey]) {
            console.log(`💾 [useLogs] Using CACHED data for ${cacheKey}`)
            return monthlyCache.current[cacheKey];
        }
        
        setLoading(true);
        setError(null);
        try {
            console.log(`📅 [useLogs] Fetching data for ${cacheKey}`)
            const data = await getReporteByDate(year, month);
            setSelected(data);
            
            // ✅ Store in cache
            monthlyCache.current[cacheKey] = data;
            
            return data;
        } catch (err) {
            console.error('❌ [useLogs] fetchReportesByDate error:', err)
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
            return data;
        } catch (err) {
            console.error('❌ [useLogs] fetchReportesByDetail error:', err)
            setError(err.message);
            return {success: false, error: err.message};
        } finally {
            setLoading(false);
        }
    }

    return {fetchLogsByYear, fetchReportesByDate, fetchReportesByDetail, loading, reportes, error, selected};

}
