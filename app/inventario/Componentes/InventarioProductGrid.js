import { View, StyleSheet } from 'react-native'
import ProductButton from '../../../components/productButton'
import { COLORS, FONTS } from '../../../styles/globalStyles'

const styles = StyleSheet.create({
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
  productButton: {
    borderRadius: 12,
    width: 165,
    height: 165,
    backgroundColor: COLORS.cardBackgroundOne,
  },
  productTitle: {
    color: COLORS.blackText,
    fontSize: FONTS.size.md,
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
  },
  productEmoji: {
    fontSize: 50,
  },
})

export default function InventarioProductGrid({ products, onProductPress }) {
  const formatProductSubtitle = (quantity, unit) => {
    return `${quantity} ${unit}`
  }

  return (
    <View style={styles.productsGrid}>
      {products.map((product) => (
        <ProductButton
          key={product.id}
          emoji={product.emoji}
          emojiStyle={styles.productEmoji}
          title={product.name}
          subtitle={formatProductSubtitle(product.quantity, product.unit)}
          icon="chevron-down"
          titleStyle={styles.productTitle}
          buttonStyle={styles.productButton}
          onPress={() => onProductPress(product.route)}
        />
      ))}
    </View>
  )
}
