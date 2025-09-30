import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { COLORS, FONTS } from '../../../styles/globalStyles'

export default function CustomDropdown({
  label,
  value,
  options = [],
  onSelect,
  placeholder = 'Seleccionar',
}) {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value)

  // Transform options array to dropdown picker format
  const items = options.map((option, index) => ({
    label: option,
    value: option,
    key: index.toString(),
  }))

  const handleValueChange = (val) => {
    setSelectedValue(val)
    onSelect(val)
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedValue}
        onChangeValue={handleValueChange}
        placeholder={placeholder}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropDownContainerStyle={styles.dropdownList}
        placeholderStyle={styles.placeholderText}
        arrowIconStyle={styles.arrowIcon}
        tickIconStyle={styles.tickIcon}
        zIndex={1000}
        zIndexInverse={3000}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    zIndex: 1000,
  },
  label: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    marginBottom: 5,
    color: COLORS.primaryBlue,
  },
  dropdown: {
    borderColor: COLORS.greyBorder,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: COLORS.background,
    minHeight: 50,
  },
  dropdownText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: COLORS.primaryBlue,
  },
  placeholderText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: '#888',
  },
  dropdownList: {
    borderColor: COLORS.greyBorder,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderRadius: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  tickIcon: {
    width: 20,
    height: 20,
  },
})
