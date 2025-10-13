/* eslint-disable */
import { useLocalSearchParams } from 'expo-router'
import ProductDetailScreen from './Componentes/ProductDetailScreen'

export default function Producto() {
  const params = useLocalSearchParams()

  const {
    id,
    name = 'Producto',
    emoji = '📦',
    quantity = 0,
    unit = 'disponibles',
    category = 'Sin categoría',
  } = params

  return (
    <ProductDetailScreen
      productName={name}
      emoji={emoji}
      category={category}
      quantity={parseInt(quantity) || 0}
      unit={unit}
    />
  )
}
