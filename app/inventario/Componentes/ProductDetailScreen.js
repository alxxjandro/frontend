import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, globalStyles } from '../../../styles/globalStyles'
import ScreenHeader from '../../../components/ScreenHeader'
import { useRouter } from 'expo-router'

export default function ProductDetailScreen({
  productName,
  emoji,
  category,
  quantity,
  unit,
  entries = [],
}) {
  const router = useRouter()

  const formatDate = (fechaISO) => {
    if (!fechaISO) return '—'
    const fecha = new Date(fechaISO)
    return fecha.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <View style={[globalStyles.body, styles.container]}>
          <ScreenHeader
            paddingHorizontal={0}
            title="Detalle de producto"
            onBackPress={() => router.push('/inventario')}
          />

          <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.productInfo}>
              <Text style={styles.emoji}>{emoji}</Text>
              <Text style={globalStyles.h1}>{productName}</Text>
              <Text style={styles.productDetails}>
                {category} • {quantity} {unit}
              </Text>
            </View>

            <View style={styles.entriesSection}>
              <Text style={styles.sectionTitle}>Últimas entradas:</Text>

              {entries && entries.length > 0 ? (
                entries.map((entry, index) => (
                  <View
                    key={entry.idEntradaProducto || index}
                    style={styles.entryCard}
                  >
                    <Text style={globalStyles.h3}>
                      Entrada del {formatDate(entry.entrada?.fechaEntrada)}
                    </Text>
                    <Text style={styles.entryQuantity}>
                      +{entry.cantidad} {unit}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>
                  Este producto aún no tiene entradas registradas.
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  productInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 10,
  },
  productDetails: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: COLORS.greyText,
    marginTop: 4,
  },
  entriesSection: {
    width: '100%',
    marginTop: 10,
    gap: 8,
  },
  sectionTitle: {
    fontSize: FONTS.size.lg,
    fontFamily: FONTS.bold,
    color: COLORS.primaryBlue,
    marginBottom: 10,
  },
  entryCard: {
    backgroundColor: COLORS.cardBackgroundOne,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  entryQuantity: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.sm,
    color: COLORS.blackText,
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.greyText,
    marginTop: 10,
  },
})
