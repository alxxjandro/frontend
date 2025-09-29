import { View, Text, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { globalStyles, COLORS } from '../../../styles/globalStyles'
import ExtraButton from '../../../components/extraButton'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 10,
  },
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
  productName: {
    ...globalStyles.h1,
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
    ...globalStyles.h2,
    color: '#00568F',
    marginBottom: 10,
  },
  entryCard: {
    backgroundColor: '#E6E6E7',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  entryTitle: {
    ...globalStyles.h3,
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
        styles.container,
        globalStyles.container,
        { justifyContent: 'flex-start' },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={globalStyles.h1}>Detalle producto</Text>
        </View>
        <ExtraButton
          icon="chevron-back"
          color="black"
          style={styles.backButton}
          size={30}
          onPress={() => router.push('/inventario')}
        />
      </View>

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.productName}>{productName}</Text>
        <Text style={styles.productDetails}>
          {category} • {quantity} {unit}
        </Text>
      </View>

      {/* Entries Section */}
      <View style={styles.entriesSection}>
        <Text style={styles.sectionTitle}>Últimas entradas:</Text>

        {entries.map((entry, index) => (
          <View key={index} style={styles.entryCard}>
            <Text style={styles.entryTitle}>Entrada del {entry.date}</Text>
            <Text style={styles.entryQuantity}>{entry.quantity}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
