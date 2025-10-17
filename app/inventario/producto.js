/* eslint-disable */
import { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import ProductDetailScreen from './Componentes/ProductDetailScreen'
import { useInventario } from '../../hooks/useInventario'

export default function Producto() {
  const params = useLocalSearchParams()
  const { selected, fetchById } = useInventario()

  const {
    id,
    name = 'Producto',
    emoji = '📦',
    quantity = 0,
    unit = 'disponibles',
    category = 'Sin categoría',
  } = params

  useEffect(() => {
    if (id) {
      fetchById(parseInt(id))
    }
  }, [id])

  return (
    <ProductDetailScreen
      productName={name}
      emoji={emoji}
      category={category}
      quantity={
        selected ? parseFloat(selected.cantidadTotal) : parseInt(quantity) || 0
      }
      unit={unit}
    />
  )
}
