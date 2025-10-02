import { useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import ScreenHeader from '../../components/screenHeader'
import InventarioContent from './Componentes/InventarioContent'
import FilterModal from './Componentes/FilterModal'
import { globalStyles, COLORS } from '../../styles/globalStyles'

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

/**
 * Inventario Screen - Displays product inventory with search, filters, and product grid
 * @param {Object} props - Component props
 * @returns {JSX.Element} Inventario screen component
 */

export default function InventarioScreen() {
  const router = useRouter()
  const { mode = 'view', returnTo } = useLocalSearchParams()

  const [modalStates, setModalStates] = useState({
    tipoVista: false,
    ordenarPor: false,
    categorias: false,
  })

  /**
   * Toggles modal visibility state
   * @param {string} modalName - Name of the modal to toggle
   */
  const toggleModal = (modalName) => {
    setModalStates((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }))
  }

  /**
   * Handles product selection based on mode
   * @param {string} productRoute - Route to navigate to
   * @param {Object} product - Product data
   */
  const handleProductPress = (productRoute, product) => {
    if (mode === 'select') {
      router.push({
        pathname: '/inventario/agregarProducto',
        params: {
          productId: product.id,
          productName: product.name,
          productEmoji: product.emoji,
          productCategory: 'Sin categoría',
        },
      })
    } else {
      router.push(productRoute)
    }
  }

  /**
   * Handles back navigation based on mode
   */
  const handleBackToHome = () => {
    if (mode === 'select') {
      returnTo ? router.replace(`/${returnTo}`) : router.back()
    } else {
      router.replace('/')
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <ScreenHeader
              title="Inventario"
              subtitle={`(${TOTAL_PRODUCTS} productos)`}
              onBackPress={handleBackToHome}
            />

            <InventarioContent
              onProductPress={handleProductPress}
              onFilterPress={toggleModal}
              mode={mode}
              returnTo={returnTo}
            />
          </ScrollView>

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
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

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
