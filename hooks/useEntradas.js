import {useState} from "react";
import EntradasServiceProxy from "../api/proxies/entradasService";

export function useEntradas() {
    const [loading, setLoading] = useState(false);
    const [entradas, setEntradas] = useState([]);
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState(null);

    const {getAllEntradas, getEntradaById, createEntrada} = EntradasServiceProxy();

    // --- Obtener todas las entradas ---
    const fetchEntradas = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllEntradas();
            setEntradas(data);
            return {success: true, data};
        } catch (err) {
            setError(err.message);
            return {success: false, error: err.message};
        } finally {
            setLoading(false);
        }
    }
    // --- Obtener entrada por ID ---
    const fetchEntradaById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getEntradaById(id);
            setSelected(data);
            return {success: true, data};
        } catch (err) {
            setError(err.message);
            return {success: false, error: err.message};
        } finally {
            setLoading(false);
        }
    }
    // --- Registrar nueva entrada ---
    const save = async (entradaData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await createEntrada(entradaData);

            setEntradas((prev) => [...prev, data]);
            setSelected(data);
            return {success: true, data};
        } catch (err) {
            setError(err.message);
            return {success: false, error: err.message};
        } finally {
            setLoading(false);
        }
        
    }
    return {loading, entradas, selected, error, fetchEntradas, fetchEntradaById, save, setSelected};


}