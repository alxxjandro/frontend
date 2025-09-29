import { View, StyleSheet } from 'react-native'
import ExtraButton from '../../../components/extraButton'
import { COLORS, FONTS } from '../../../styles/globalStyles'

const styles = StyleSheet.create({
  filtersSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 12,
    gap: 4,
  },
  filterButton: {
    height: 35,
    backgroundColor: COLORS.primaryBlue,
    flex: 1,
    minWidth: 100,
    maxWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  filterButtonText: {
    color: COLORS.whiteText,
    fontSize: FONTS.size.xxs,
    textAlign: 'center',
    fontFamily: FONTS.regular,
  },
})

const FILTER_OPTIONS = [
  { key: 'tipoVista', title: 'Tipo de vista' },
  { key: 'ordenarPor', title: 'Ordenar por' },
  { key: 'categorias', title: 'Categorías' },
]

export default function InventarioFilters({ onFilterPress }) {
  return (
    <View style={styles.filtersSection}>
      {FILTER_OPTIONS.map((filter) => (
        <ExtraButton
          key={filter.key}
          color={COLORS.whiteText}
          style={styles.filterButton}
          textStyle={styles.filterButtonText}
          title={filter.title}
          icon="chevron-down"
          size={15}
          onPress={() => onFilterPress(filter.key)}
        />
      ))}
    </View>
  )
}
