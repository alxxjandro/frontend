import { View, StyleSheet } from 'react-native'
import SearchBar from '../../../components/searchBar'
import ExtraButton from '../../../components/extraButton'
import { COLORS, FONTS } from '../../../styles/globalStyles'

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
  addButton: {
    width: 140,
    height: 41,
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.whiteText,
    fontSize: FONTS.size.xxs,
    textAlign: 'center',
    fontFamily: FONTS.regular,
  },
})

export default function InventarioSearchSection({
  searchText,
  onSearchChange,
  onAddPress,
}) {
  return (
    <View style={styles.searchSection}>
      <View style={styles.searchContainer}>
        <SearchBar
          icon="search-outline"
          placeholder="Buscar producto"
          value={searchText}
          onChangeText={onSearchChange}
        />
      </View>
      <ExtraButton
        color={COLORS.whiteText}
        style={styles.addButton}
        textStyle={styles.addButtonText}
        title="Agregar producto"
        icon="add"
        size={15}
        onPress={onAddPress}
      />
    </View>
  )
}
