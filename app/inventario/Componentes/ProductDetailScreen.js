import { View, Text, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { globalStyles, COLORS, FONTS } from '../../../styles/globalStyles'
import ExtraButton from '../../../components/extraButton'

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  emoji: {
    fontSize: 50,
    marginEnd: 8,
  },
  productDetails: {
    fontSize: 14,
    marginTop: 4,
  },
  entriesSection: {
    width: '100%',
    paddingHorizontal: 25,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: FONTS.size.xl,
    fontFamily: FONTS.bold,
    color: COLORS.primaryBlue,
    marginBottom: 10,
  },
  entryCard: {
    backgroundColor: COLORS.cardBackgroundOne,
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  entryQuantity: {
    fontSize: 14,
    marginTop: 2,
  },
})

const SAMPLE_ENTRIES = [
  { date: '8 de septiembre', quantity: '23 unidades' },
  { date: '6 de septiembre', quantity: '18 unidades' },
  { date: '5 de septiembre', quantity: '12 unidades' },
]

/**
 * Product Detail Screen - Shows detailed information about a specific product
 * @param {string} productName - Name of the product
 * @param {string} emoji - Product emoji icon
 * @param {string} category - Product category
 * @param {number} quantity - Product quantity
 * @param {string} unit - Unit of measurement
 * @param {Array} entries - Array of product entries
 * @returns {JSX.Element} Product detail screen component
 */

export default function ProductDetailScreen({
  productName,
  emoji,
  category = 'Categoria',
  quantity,
  unit = 'disponibles',
  entries = SAMPLE_ENTRIES,
}) {
  const router = useRouter()

  return (
    <View
      style={[
        globalStyles.container,
        {
          flex: 1,
          backgroundColor: COLORS.background,
          justifyContent: 'flex-start',
          paddingTop: 10,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={globalStyles.h1}>Detalle producto</Text>
        <ExtraButton
          icon="chevron-back"
          color={COLORS.blackText}
          style={styles.backButton}
          size={30}
          onPress={() => router.push('/inventario')}
        />
      </View>

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={globalStyles.h1}>{productName}</Text>
        <Text style={styles.productDetails}>
          {category} • {quantity} {unit}
        </Text>
      </View>

      {/* Entries Section */}
      <View style={styles.entriesSection}>
        <Text style={styles.sectionTitle}>Últimas entradas:</Text>

        {entries.map((entry, index) => (
          <View key={index} style={styles.entryCard}>
            <Text style={globalStyles.h3}>Entrada del {entry.date}</Text>
            <Text style={styles.entryQuantity}>{entry.quantity}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
