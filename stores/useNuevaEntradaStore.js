import { create } from 'zustand'

export const useNuevaEntradaStore = create((set, get) => ({
  fecha: null,
  monto: '',
  opcionEntrada: '',
  productos: [],

  setFecha: (fecha) => {
    if (fecha) {
      const iso =
        fecha instanceof Date
          ? fecha.toISOString()
          : new Date(fecha).toISOString()
      set({ fecha: iso })
    }
  },
  setMonto: (monto) => set({ monto }),
  setOpcionEntrada: (opcionEntrada) => set({ opcionEntrada }),

  addProducto: (producto) => {
    const normalized = {
      idProducto: producto.idProducto,
      idUnidad: producto.idUnidad || 1,
      nombre: producto.name || producto.nombreProducto || 'Producto',
      categoria: producto.category || '',
      cantidad: producto.quantity || 1,
      unidad: producto.unit || '',
      emoji: producto.icon || '📦',
      hasExpirationDate: producto.hasExpirationDate || false,
      _uid: Date.now() + Math.random(),
    }

    const current = get().productos
    set({ productos: [...current, normalized] })
  },

  removeProducto: (uid) =>
    set((state) => ({
      productos: state.productos.filter((p) => p._uid !== uid),
    })),

  clearEntrada: () =>
    set({
      fecha: null,
      monto: '',
      opcionEntrada: '',
      productos: [],
    }),
}))
