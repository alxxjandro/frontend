import { View, Text, StyleSheet } from 'react-native'
import ExtraButton from '../../../components/extraButton'
import { globalStyles, COLORS, FONTS } from '../../../styles/globalStyles'

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 16,
  },
  headerText: {
    flex: 1,
  },
  productCount: {
    fontSize: FONTS.size.sm,
    color: COLORS.blackText,
    marginTop: 4,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
})

export default function InventarioHeader({ totalProducts, onGoBack }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        <Text style={globalStyles.h1}>Inventario</Text>
        <Text style={styles.productCount}>({totalProducts} productos)</Text>
      </View>
      <ExtraButton
        icon="chevron-back"
        color={COLORS.blackText}
        style={styles.backButton}
        size={30}
        onPress={onGoBack}
      />
    </View>
  )
}
