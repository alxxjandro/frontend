import { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { useRouter } from 'expo-router'
import SearchBar from '../../../components/searchBar'
import ExtraButton from '../../../components/extraButton'
import ProductButton from '../../../components/productButton'
import CompactProductCard from '../../../components/CompactProductCard'
import { COLORS, FONTS } from '../../../styles/globalStyles'
import { useUnidades } from '../../../hooks/useUnidades'

const FILTER_OPTIONS = [
  { key: 'tipoVista', title: 'Tipo de vista' },
  { key: 'ordenarPor', title: 'Ordenar por' },
  { key: 'categorias', title: 'Categorías' },
]

export default function InventarioContent({
  inventario = [],
  productos = [],
  onProductPress,
  onFilterPress,
  mode,
  returnTo,
  loading,
  tipoVista = 'Completa',
  ordenarPor = 'Nombre',
}) {
  const { unidades } = useUnidades()
  const router = useRouter()
  const [searchText, setSearchText] = useState('')

  const products = inventario.map((item) => {
    const producto = productos.find(
      (p) => p.idProducto === item.idProducto_producto
    )
    return {
      id: item.idInventario,
      productId: item.idProducto_producto,
      idUnidad_unidad: item.idUnidad_unidad,
      name: producto?.nombreProducto || `Producto ${item.idProducto_producto}`,
      emoji: producto?.emoji || '📦',
      category: producto?.departamento?.nombreDepartamento || 'Sin categoría',
      quantity: parseFloat(item.cantidadTotal),
      unit:
        unidades?.find((u) => u.idUnidad === item.idUnidad_unidad)?.unidad ||
        'disponibles',
      route: '/inventario/producto',
    }
  })

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  )

  //hay cosas hardcodeadas dentro de esta funcion como los ultimos 3
  //pq no nos estamos trayendo bien los datos del bd, si hay tiempo lo cambiamos!!!
  const sortProducts = (products, sortBy) => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'Nombre':
          return a.name.localeCompare(b.name)
        case 'Cantidad':
          return b.quantity - a.quantity
        case 'Categoria':
          return a.category.localeCompare(b.category)
        case 'FechaEntrada':
          return b.id - a.id
        case 'FechaSalida':
          return a.id - b.id
        case 'Caducidad':
          return a.id - b.id
        default:
          return 0
      }
    })
  }

  const sortedAndFilteredProducts = sortProducts(filteredProducts, ordenarPor)

  const handleAddPress = () => {
    if (mode === 'select' && returnTo) {
      router.push({
        pathname: '/inventario/nuevoProducto',
        params: { mode: 'select', returnTo },
      })
    } else {
      router.push('/inventario/nuevoProducto')
    }
  }

  const formatSubtitle = (q, u) => `${q} ${u}`

  return (
    <View style={{ flex: 1 }}>
      {/* Search */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <SearchBar
            icon="search-outline"
            placeholder="Buscar producto"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {mode === 'view' && (
          <ExtraButton
            color={COLORS.background}
            style={styles.addButton}
            textStyle={styles.buttonText}
            title="Agregar producto"
            icon="add"
            size={15}
            onPress={handleAddPress}
          />
        )}
      </View>

      {mode === 'view' && (
        <View style={styles.filtersSection}>
          {FILTER_OPTIONS.map((filter) => (
            <ExtraButton
              key={filter.key}
              color={COLORS.whiteText}
              style={styles.filterButton}
              textStyle={styles.buttonText}
              title={filter.title}
              icon="chevron-down"
              size={12}
              onPress={() => onFilterPress(filter.key)}
            />
          ))}
        </View>
      )}

      <View style={styles.productsWrapper}>
        <ScrollView
          contentContainerStyle={[
            tipoVista === 'Completa'
              ? styles.productsGrid
              : styles.productsList,
            sortedAndFilteredProducts.length === 0 && {
              flexGrow: 1,
              justifyContent: 'center',
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {!loading && sortedAndFilteredProducts.length === 0 ? (
            <Text style={styles.noProductsText}>
              No se encontraron productos
            </Text>
          ) : (
            sortedAndFilteredProducts.map((p) =>
              tipoVista === 'Completa' ? (
                <ProductButton
                  key={`${p.idInventario || p.idProducto}-${p.name}`}
                  emoji={p.emoji}
                  emojiStyle={styles.productEmoji}
                  title={p.name}
                  subtitle={formatSubtitle(p.quantity, p.unit)}
                  icon="chevron-down"
                  titleStyle={styles.productTitle}
                  buttonStyle={styles.productButton}
                  onPress={() => onProductPress(p.route, p)}
                />
              ) : (
                <CompactProductCard
                  key={`${p.idInventario || p.idProducto}-${p.name}`}
                  emoji={p.emoji}
                  title={p.name}
                  subtitle={formatSubtitle(p.quantity, p.unit)}
                  onPress={() => onProductPress(p.route, p)}
                />
              )
            )
          )}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  searchContainer: { flex: 1 },
  filtersSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 12,
    gap: 4,
  },
  productsWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'stretch',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  productsList: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  noProductsText: {
    width: '100%',
    textAlign: 'center',
    color: COLORS.greyText,
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    paddingVertical: 40,
  },
  addButton: {
    width: 140,
    height: 41,
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    height: 35,
    backgroundColor: COLORS.primaryBlue,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    minWidth: 100,
    maxWidth: 120,
  },
  productButton: {
    borderRadius: 12,
    width: 165,
    height: 165,
    backgroundColor: COLORS.cardBackgroundOne,
  },
  buttonText: {
    color: COLORS.whiteText,
    fontSize: FONTS.size.xs,
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  productTitle: {
    fontSize: FONTS.size.md,
    fontFamily: FONTS.bold,
    color: COLORS.blackText,
  },
  productEmoji: { fontSize: 50 },
})
