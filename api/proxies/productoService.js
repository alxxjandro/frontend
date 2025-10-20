/* eslint-disable */
import { API_BASE_URL } from '@env'

const ProductoServiceProxy = () => {
  async function getAllProductos() {
    const response = await fetch(`${API_BASE_URL}/productos`)

    if (!response.ok) {
      throw new Error('Error al obtener productos')
    }

    return await response.json()
  }

  async function getProductoById(id) {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) throw new Error('Producto no encontrado')
      throw new Error('Error al obtener producto')
    }

    return await response.json()
  }

  async function createProducto(payload) {
    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      if (response.status === 400) throw new Error('Datos inválidos')
      throw new Error('Error al crear producto')
    }

    return await response.json()
  }

  async function updateProducto(id, payload) {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      if (response.status === 400) throw new Error('Datos inválidos')
      throw new Error('Error al actualizar producto')
    }

    return await response.json()
  }

  async function deleteProducto(id) {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 400) throw new Error('Datos inválidos')
      throw new Error('Error al eliminar producto')
    }

    return await response.json()
  }

  async function getCategorias() {
    const response = await fetch(`${API_BASE_URL}/productos/categorias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Error al obtener categorías')
    }

    return await response.json()
  }

  async function getUnidades() {
    const response = await fetch(`${API_BASE_URL}/unidades`)
    if (!response.ok) {
      throw new Error('Error al obtener las unidades')
    }
    return await response.json()
  }

  async function createUnidad() {
    const response = await fetch(`${API_BASE_URL}/unidades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      if (response.status === 400) throw new Error('Datos inválidos')
      throw new Error('Error al crear unidad')
    }

    return await response.json()
  }

  async function getUltimasEntradas(id, limit) {
    const response = await fetch(
      `${API_BASE_URL}/entradas/producto/${id}?limit=${limit}`
    )

    if (!response.ok) {
      throw new Error('Error al obtener las últimas entradas')
    }

    return await response.json()
  }

  return {
    getAllProductos,
    getProductoById,
    getCategorias,
    createProducto,
    updateProducto,
    deleteProducto,
    getUnidades,
    createUnidad,
    getUltimasEntradas,
  }
}

export default ProductoServiceProxy
