import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

import SearchBar from '../../../components/searchBar'
import ExtraButton from '../../../components/extraButton'
import ProductButton from '../../../components/productButton'
import { COLORS, FONTS } from '../../../styles/globalStyles'

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

const FILTER_OPTIONS = [
  { key: 'tipoVista', title: 'Tipo de vista' },
  { key: 'ordenarPor', title: 'Ordenar por' },
  { key: 'categorias', title: 'Categorías' },
]

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  searchContainer: {
    flex: 1,
  },
  filtersSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 12,
    gap: 4,
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
    fontSize: FONTS.size.xxs,
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
  productTitle: {
    fontSize: FONTS.size.md,
    fontFamily: FONTS.bold,
    color: COLORS.blackText,
  },
  productEmoji: {
    fontSize: 50,
  },
})

/**
 * Consolidated component that combines search, filters, and product grid
 * @param {Function} onProductPress - Callback for product selection
 * @param {Function} onFilterPress - Callback for filter modal toggle
 * @param {string} mode - Current screen mode ('view' or 'select')
 * @param {string} returnTo - Return destination when in select mode
 * @returns {JSX.Element} Complete inventario content
 */
export default function InventarioContent({
  onProductPress,
  onFilterPress,
  mode,
  returnTo,
}) {
  const router = useRouter()
  const [searchText, setSearchText] = useState('')
  const [products] = useState(INITIAL_PRODUCTS)

  /**
   * Filters products based on search text
   */
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  )

  /**
   * Handles add product button press
   */
  const handleAddPress = () => {
    if (mode === 'select' && returnTo) {
      // When in select mode, pass the context to nuevoProducto
      router.push({
        pathname: '/inventario/nuevoProducto',
        params: {
          mode: 'select',
          returnTo: returnTo,
        },
      })
    } else {
      // Regular view mode
      router.push('/inventario/nuevoProducto')
    }
  }

  /**
   * Formats product subtitle with quantity and unit
   * @param {number} quantity - Product quantity
   * @param {string} unit - Product unit
   * @returns {string} Formatted subtitle
   */
  const formatProductSubtitle = (quantity, unit) => {
    return `${quantity} ${unit}`
  }

  return (
    <View>
      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <SearchBar
            icon="search-outline"
            placeholder="Buscar producto"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        {/* Show "Agregar producto" button in view mode OR when coming from nuevaEntrada (but NOT from nuevaSalida) */}
        {(mode === 'view' ||
          (mode === 'select' && returnTo === 'nuevaEntrada')) && (
          <ExtraButton
            color={COLORS.whiteText}
            style={styles.addButton}
            textStyle={styles.buttonText}
            title="Agregar producto"
            icon="add"
            size={15}
            onPress={handleAddPress}
          />
        )}
      </View>

      {/* Filters Section - only show in view mode */}
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
              size={15}
              onPress={() => onFilterPress(filter.key)}
            />
          ))}
        </View>
      )}

      {/* Products Grid */}
      <View style={styles.productsGrid}>
        {filteredProducts.map((product) => (
          <ProductButton
            key={product.id}
            emoji={product.emoji}
            emojiStyle={styles.productEmoji}
            title={product.name}
            subtitle={formatProductSubtitle(product.quantity, product.unit)}
            icon="chevron-down"
            titleStyle={styles.productTitle}
            buttonStyle={styles.productButton}
            onPress={() => onProductPress(product.route, product)}
          />
        ))}
      </View>
    </View>
  )
}
