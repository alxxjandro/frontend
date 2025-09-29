import ProductDetailScreen from '../Componentes/ProductDetailScreen'

export default function LecheProduct() {
  return (
    <ProductDetailScreen
      productName="Leche"
      emoji="🥛"
      category="Categoria"
      quantity={12}
      unit="L disponibles"
    />
  )
}
