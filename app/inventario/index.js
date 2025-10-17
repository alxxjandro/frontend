import { useState, useEffect, useMemo } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import ScreenHeader from '../../components/ScreenHeader'
import InventarioContent from './Componentes/InventarioContent'
import FilterModal from './Componentes/FilterModal'
import { globalStyles, COLORS } from '../../styles/globalStyles'
import { useInventario } from '../../hooks/useInventario'
import { useProducto } from '../../hooks/useProducto'

export default function InventarioScreen() {
  const router = useRouter()
  const { mode = 'view', returnTo } = useLocalSearchParams()
  const { inventario, fetchAll } = useInventario()
  const {
    productos,
    categorias,
    fetchAll: fetchProductos,
    fetchCategorias,
  } = useProducto()
  const [modalStates, setModalStates] = useState({
    tipoVista: false,
    ordenarPor: false,
    categorias: false,
  })

  useEffect(() => {
    fetchAll()
    fetchProductos()
    fetchCategorias()
  }, [])

  const MODAL_CONFIGS = useMemo(
    () => ({
      tipoVista: { title: 'Tipo de vista', options: ['Completa', 'Compacta'] },
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
        options: categorias.map((c) => c.nombreDepartamento),
      },
    }),
    [categorias]
  )

  const toggleModal = (modalName) =>
    setModalStates((prev) => ({ ...prev, [modalName]: !prev[modalName] }))

  const handleProductPress = (productRoute, product) => {
    if (mode === 'select') {
      router.push({
        pathname: '/inventario/agregarProducto',
        params: {
          productId: product.productId,
          productName: product.name,
          productEmoji: product.emoji,
          productCategory: product.category,
        },
      })
    } else {
      router.push({
        pathname: productRoute.toLowerCase(),
        params: {
          id: product.id,
          productId: product.productId,
          name: product.name,
          emoji: product.emoji,
          quantity: product.quantity,
          unit: product.unit,
          category: product.category,
        },
      })
    }
  }

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
              subtitle={`(${inventario.length} productos)`}
              onBackPress={handleBackToHome}
            />

            <InventarioContent
              inventario={inventario}
              productos={productos}
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
  container: { flex: 1, backgroundColor: COLORS.background, minWidth: 332 },
  scrollContainer: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 20 },
})
