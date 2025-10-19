import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONTS } from '../styles/globalStyles'
import CustomDropdown from './CustomDropdown'

export default function QuantityToggle({
  quantity,
  onQuantityChange,
  unit,
  onUnitChange,
  unitOptions = ['Unidad', 'Kg', 'Paquete', 'Litro', 'Gramos'],
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const incrementQuantity = () => onQuantityChange(quantity + 1)
  const decrementQuantity = () => {
    if (quantity > 1) onQuantityChange(quantity - 1)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subLabel}>Cantida</Text>

      <View style={styles.controlsRow}>
        {/* Contador numérico */}
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={decrementQuantity}
            disabled={quantity <= 1}
          >
            <Ionicons
              name="remove"
              size={20}
              color={quantity <= 1 ? COLORS.greyBorder : COLORS.primaryBlue}
            />
          </TouchableOpacity>

          <Text style={styles.counterValue}>{quantity}</Text>

          <TouchableOpacity
            style={styles.counterButton}
            onPress={incrementQuantity}
          >
            <Ionicons name="add" size={20} color={COLORS.primaryBlue} />
          </TouchableOpacity>
        </View>

        {/* Dropdown de unidades */}
        <View style={styles.dropdownWrapper}>
          <CustomDropdown
            value={unit}
            placeholder="Unidad"
            options={unitOptions}
            onSelect={onUnitChange}
            isOpen={isDropdownOpen}
            setIsOpen={setIsDropdownOpen}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 12,
  },
  subLabel: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.sm,
    color: COLORS.greyText,
    marginBottom: 8,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    height: 48,
  },
  counterButton: {
    paddingHorizontal: 6,
  },
  counterValue: {
    fontSize: FONTS.size.lg,
    color: COLORS.blackText,
    textAlign: 'center',
    minWidth: 30,
  },
  dropdownWrapper: {
    flex: 1,
    position: 'relative',
    overflow: 'visible',
  },
})
