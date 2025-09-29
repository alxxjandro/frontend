import { useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

import InventarioHeader from './Componentes/InventarioHeader'
import InventarioSearchSection from './Componentes/InventarioSearchSection'
import InventarioFilters from './Componentes/InventarioFilters'
import InventarioProductGrid from './Componentes/InventarioProductGrid'
import FilterModal from './Componentes/FilterModal'
import { COLORS } from '../../styles/globalStyles'

// Constants
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Manzana',
    emoji: '🍎',
    quantity: 53,
    unit: 'disponibles',
    route: '/inventario/Producto/Manzana',
  },
  {
    id: 2,
    name: 'Leche',
    emoji: '🥛',
    quantity: 12,
    unit: 'L disponibles',
    route: '/inventario/Producto/Leche',
  },
  {
    id: 3,
    name: 'Naranja',
    emoji: '🍊',
    quantity: 41,
    unit: 'disponibles',
    route: '/inventario/Producto/Manzana',
  },
  {
    id: 4,
    name: 'Cereal',
    emoji: '🥣',
    quantity: 20,
    unit: 'disponibles',
    route: '/inventario/Producto/Leche',
  },
  {
    id: 5,
    name: 'Huevo',
    emoji: '🥚',
    quantity: 199,
    unit: 'disponibles',
    route: '/inventario/Producto/Manzana',
  },
  {
    id: 6,
    name: 'Tomate',
    emoji: '🍅',
    quantity: 4,
    unit: 'disponibles',
    route: '/inventario/Producto/Leche',
  },
]

const TOTAL_PRODUCTS = 59

// Modal configurations
const MODAL_CONFIGS = {
  tipoVista: {
    title: 'Tipo de vista',
    options: ['Completa', 'Compacta'],
  },
  ordenarPor: {
    title: 'Ordenar por',
    options: [
      'Nombre',
      'Cantidad',
      'Categoria',
      'FechaEntrada',
      'FechaSalida',
      'Caducidad',
    ],
  },
  categorias: {
    title: 'Categorías',
    options: [
      'Categoria 1',
      'Categoria 2',
      'Categoria 3',
      'Categoria 4',
      'Categoria 5',
    ],
  },
}

// Minimal container styles only
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
})

export default function InventarioScreen() {
  const router = useRouter()

  // State management
  const [searchText, setSearchText] = useState('')
  const [products] = useState(INITIAL_PRODUCTS)
  const [modalStates, setModalStates] = useState({
    tipoVista: false,
    ordenarPor: false,
    categorias: false,
  })

  // Helper functions
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  )

  const toggleModal = (modalName) => {
    setModalStates((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }))
  }

  const handleGoBack = () => {
    router.push('/')
  }

  const handleProductPress = (route) => {
    router.push(route)
  }

  const handleAddProduct = () => {
    // TODO: Implement add product functionality
    console.log('Add product pressed')
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <InventarioHeader
          totalProducts={TOTAL_PRODUCTS}
          onGoBack={handleGoBack}
        />

        <InventarioSearchSection
          searchText={searchText}
          onSearchChange={setSearchText}
          onAddPress={handleAddProduct}
        />

        <InventarioFilters onFilterPress={toggleModal} />

        <InventarioProductGrid
          products={filteredProducts}
          onProductPress={handleProductPress}
        />
      </ScrollView>

      {/* Modals */}
      {Object.entries(MODAL_CONFIGS).map(([modalKey, config]) => (
        <FilterModal
          key={modalKey}
          visible={modalStates[modalKey]}
          onClose={() => toggleModal(modalKey)}
          title={config.title}
          options={config.options}
        />
      ))}
    </View>
  )
}
