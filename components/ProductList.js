import { View, Text, StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../styles/globalStyles'
import AddProductButton from './addProductButton'

export default function ProductList({
  title = 'Productos de la salida',
  products = [],
  onAddProduct,
  addButtonText = 'Agregar un producto del inventario',
  emptyMessage = 'Esta salida no cuenta con ningún producto...',
  navigateTo = '/inventario',
}) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>

      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        </View>
      ) : (
        <View style={styles.productList}>
          {products.map((product) => (
            <View key={product._uid} style={styles.productItem}>
              <Text style={styles.productText}>
                {product.emoji} {product.nombre} - {product.cantidad}{' '}
                {product.unidad}
              </Text>
            </View>
          ))}
        </View>
      )}

      <AddProductButton
        text={addButtonText}
        onPress={onAddProduct}
        navigateTo={navigateTo}
        mode="select"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.lg,
    marginTop: 20,
    color: COLORS.primaryBlue,
  },
  emptyContainer: {
    backgroundColor: COLORS.cardBackgroundOne,
    borderRadius: 8,
    padding: 40,
    marginTop: 10,
  },
  emptyText: {
    fontFamily: FONTS.italic,
    fontSize: FONTS.size.sm,
    color: '#525252',
    marginTop: 10,
  },
  productList: {
    marginTop: 10,
  },
  productItem: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  productText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: COLORS.blackText,
  },
})
