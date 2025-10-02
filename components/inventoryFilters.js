import { View } from 'react-native'
import { COLORS, SIZE } from '../styles/globalStyles'
import { useState } from 'react'
import SearchBar from './searchBar'
import { StyleSheet } from 'react-native'
import CustomButton from './customButton'

export default function InventoryFilters() {
  const [search, setSearch] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          icon="search-outline"
          placeholder="Buscar producto"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <CustomButton
        title="Agregar Producto"
        textSize={SIZE.xs}
        onPress={() => {}}
        expand="text"
        borderRadius={4}
        backgroundColor={COLORS.primaryGreen}
        textColor={COLORS.background}
        iconRight="add"
        size={18}
      />
      <View style={styles.filters}>
        <CustomButton
          title="Tipo de vista"
          textSize={SIZE.xxs}
          onPress={() => {}}
          expand="text"
          borderRadius={4}
          backgroundColor={COLORS.primaryBlue}
          textColor={COLORS.background}
          iconRight="chevron-down"
          size={14}
          horizontalPadding={10}
        />
        <CustomButton
          title="Ordenar por"
          textSize={SIZE.xxs}
          onPress={() => {}}
          expand="text"
          borderRadius={4}
          backgroundColor={COLORS.primaryBlue}
          textColor={COLORS.background}
          iconRight="chevron-down"
          size={14}
          horizontalPadding={4}
        />
        <CustomButton
          title="Categorias"
          textSize={SIZE.xxs}
          onPress={() => {}}
          expand="text"
          borderRadius={4}
          backgroundColor={COLORS.primaryBlue}
          textColor={COLORS.background}
          iconRight="chevron-down"
          size={14}
          horizontalPadding={2}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 16,
    maxWidth: 332,
    flexWrap: 'wrap',
  },
  searchContainer: {
    marginRight: 10,
    width: '55%',
    display: 'flex',
  },
  filters: {
    width: 332,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 2,
    gap: 8,
    height: '100%',
  },
})
