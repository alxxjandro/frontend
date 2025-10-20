/* eslint-disable */
import { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import ProductDetailScreen from './Componentes/ProductDetailScreen'
import { useInventario } from '../../hooks/useInventario'
import { useProducto } from '../../hooks/useProducto'
import { useUltimasEntradas } from '../../hooks/useUltimasEntradas'
import Spinner from '../../components/Spinner'

export default function Producto() {
  const params = useLocalSearchParams()
  const {
    id,
    productId,
    name = 'Producto',
    emoji = '📦',
    quantity = 0,
    unit = 'disponibles',
    category = 'Sin categoría',
  } = params

  const { selected: productoData } = useProducto()
  const { selected: inventarioData } = useInventario()
  const { loading, entradas } = useUltimasEntradas(productId, 5)

  return (
    <>
      <Spinner isVisible={loading} />
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
        entries={entradas}
      />
    </>
  )
}
