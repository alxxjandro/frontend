import { create } from 'zustand'

export const useNuevaSalidaStore = create((set, get) => ({
  fechaSalida: null,
  idRazon: null,
  productos: [],

  setFechaSalida: (fecha) => {
    if (fecha) {
      const iso =
        fecha instanceof Date
          ? fecha.toISOString().split('T')[0]
          : new Date(fecha).toISOString().split('T')[0]
      set({ fechaSalida: iso })
    }
  },

  setRazon: (idRazon) => set({ idRazon }),

  addProducto: (producto) => {
    const normalized = {
      idProducto: producto.idProducto || producto.productId,
      idUnidad: producto.idUnidad || producto.idUnidad_unidad || 1,
      nombre: producto.nombre || producto.name || 'Producto',
      emoji: producto.emoji || '📦',
      categoria: producto.categoria || producto.category || 'Sin categoría',
      unidad: producto.unidad || producto.unit || '',
      cantidad: Number(producto.cantidad || producto.quantity || 1),
      _uid: Date.now() + Math.random(),
    }

    const current = get().productos
    set({ productos: [...current, normalized] })
  },

  updateCantidad: (uid, nuevaCantidad) =>
    set((state) => ({
      productos: state.productos.map((p) =>
        p._uid === uid ? { ...p, cantidad: Number(nuevaCantidad) } : p
      ),
    })),

  removeProducto: (uid) =>
    set((state) => ({
      productos: state.productos.filter((p) => p._uid !== uid),
    })),

  clearSalida: () =>
    set({
      fechaSalida: null,
      idRazon: null,
      productos: [],
    }),
}))
