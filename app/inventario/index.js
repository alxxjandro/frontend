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
import Spinner from '../../components/Spinner'

export default function InventarioScreen() {
  const router = useRouter()
  const { mode = 'view' } = useLocalSearchParams()
  const params = useLocalSearchParams() || {}
  const returnTo = params.returnTo || null
  const { inventario, fetchAll } = useInventario()
  const {
    productos,
    categorias,
    loading,
    fetchAll: fetchProductos,
    fetchCategorias,
  } = useProducto()

  const [tipoVista, setTipoVista] = useState('Completa')
  const [ordenarPor, setOrdenarPor] = useState('Nombre')
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([])

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
      tipoVista: {
        title: 'Tipo de vista',
        options: ['Completa', 'Compacta'],
        single: true,
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
        single: true,
      },
      categorias: {
        title: 'Categorías',
        options: categorias.map((c) => c.nombreDepartamento),
        single: false,
      },
    }),
    [categorias]
  )

  const toggleModal = (modalName) =>
    setModalStates((prev) => ({ ...prev, [modalName]: !prev[modalName] }))

  const handleSingleOptionSelect = (modalKey, option) => {
    if (modalKey === 'tipoVista') setTipoVista(option)
    if (modalKey === 'ordenarPor') setOrdenarPor(option)
    toggleModal(modalKey)
  }

  const handleCategoryToggle = (option) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(option)
        ? prev.filter((cat) => cat !== option)
        : [...prev, option]
    )
  }

  const handleProductPress = (productRoute, product) => {
    if (mode === 'select') {
      const path =
        returnTo === 'nuevaSalida'
          ? '/inventario/agregarProductoSalida'
          : '/inventario/agregarProducto'

      router.push({
        pathname: path,
        params: {
          productId: product.productId,
          productName: product.name,
          productEmoji: product.emoji,
          productCategory: product.category,
          idUnidad: product.idUnidad_unidad,
          returnTo,
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
    <>
      <SafeAreaProvider>
        <SafeAreaView style={globalStyles.body}>
          <View style={styles.container}>
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={{
                ...styles.scrollContent,
                width: 380,
                alignSelf: 'center',
              }}
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
                loading={loading}
                tipoVista={tipoVista}
                ordenarPor={ordenarPor}
              />
            </ScrollView>

            {Object.entries(MODAL_CONFIGS).map(([modalKey, config]) => (
              <FilterModal
                key={modalKey}
                visible={modalStates[modalKey]}
                onClose={() => toggleModal(modalKey)}
                title={config.title}
                options={config.options}
                selectedOption={
                  config.single
                    ? modalKey === 'tipoVista'
                      ? tipoVista
                      : ordenarPor
                    : undefined
                }
                onOptionSelect={
                  config.single
                    ? (option) => handleSingleOptionSelect(modalKey, option)
                    : handleCategoryToggle
                }
              />
            ))}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>

      <Spinner isVisible={loading} />
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, minWidth: 332 },
  scrollContainer: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 20 },
})
