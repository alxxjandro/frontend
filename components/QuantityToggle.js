import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONTS } from '../styles/globalStyles'
import CustomDropdown from './CustomDropdown'

export default function QuantityToggle({
  quantity,
  onQuantityChange,
  unit,
  onUnitChange,
  unitOptions = ['unidades', 'kg', 'paquetes', 'L', 'g'],
}) {
  const incrementQuantity = () => {
    onQuantityChange(quantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cantidad del producto</Text>
      <View style={styles.quantityControls}>
        <View style={styles.quantityCounter}>
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
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={incrementQuantity}
          >
            <Ionicons name="add" size={20} color={COLORS.primaryBlue} />
          </TouchableOpacity>
        </View>
        <View style={styles.unitDropdown}>
          <CustomDropdown
            value={unit}
            placeholder="unidades"
            options={unitOptions}
            onSelect={onUnitChange}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    zIndex: 2000,
  },
  label: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    color: COLORS.primaryBlue,
    marginBottom: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.background,
  },
  counterButton: {
    padding: 8,
  },
  quantityText: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.lg,
    color: COLORS.blackText,
    marginHorizontal: 16,
    minWidth: 30,
    textAlign: 'center',
  },
  unitDropdown: {
    flex: 1,
  },
})
