/* eslint-disable */
import { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import ProductDetailScreen from './Componentes/ProductDetailScreen'
import { useInventario } from '../../hooks/useInventario'
import { useProducto } from '../../hooks/useProducto'

export default function Producto() {
  const params = useLocalSearchParams()
  const { selected: inventarioData, fetchById: fetchInventarioById } =
    useInventario()
  const { selected: productoData, fetchById: fetchProductoById } = useProducto()

  const {
    id,
    productId,
    name = 'Producto',
    emoji = '📦',
    quantity = 0,
    unit = 'disponibles',
    category = 'Sin categoría',
  } = params

  useEffect(() => {
    if (id) {
      fetchInventarioById(parseInt(id))
    }
    if (productId) {
      fetchProductoById(parseInt(productId))
    }
  }, [id, productId])

  return (
    <ProductDetailScreen
      productName={productoData?.nombreProducto || name}
      emoji={emoji}
      category={productoData?.departamento?.nombreDepartamento || category}
      quantity={
        inventarioData
          ? parseFloat(inventarioData.cantidadTotal)
          : parseInt(quantity) || 0
      }
      unit={unit}
    />
  )
}
