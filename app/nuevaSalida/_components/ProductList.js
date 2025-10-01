import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../../../styles/globalStyles'

export default function ProductList({
  title = 'Productos de la salida',
  products = [],
  onAddProduct,
  addButtonText = 'Agregar un producto del inventario +',
  emptyMessage = 'Esta salida no cuenta con ningún producto...',
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
          {products.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <Text style={styles.productText}>{product}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.addButton} onPress={onAddProduct}>
        <Text style={styles.addButtonText}>{addButtonText}</Text>
      </TouchableOpacity>
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
  addButton: {
    backgroundColor: COLORS.primaryBlue,
    padding: 12,
    borderRadius: 6,
    marginTop: 15,
  },
  addButtonText: {
    color: COLORS.whiteText,
    textAlign: 'center',
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    fontWeight: '500',
  },
})
