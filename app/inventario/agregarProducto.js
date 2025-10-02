import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONTS } from '../../styles/globalStyles'
import MoneyInput from '../../components/MoneyInput'
import CustomButton from '../../components/customButton'
import ExpirationToggle from '../../components/ExpirationToggle'
import QuantityToggle from '../../components/QuantityToggle'
import CustomDropdown from '../../components/CustomDropdown'

export default function AgregarProducto() {
  const router = useRouter()
  const { productId, productName, productEmoji, productCategory } =
    useLocalSearchParams()

  // State for product details (pre-filled from the selected product)
  const [selectedIcon] = useState(productEmoji || '📦')
  const [name] = useState(productName || '')
  const [category] = useState(productCategory || '')

  // State for expiration settings
  const [hasExpirationDate, setHasExpirationDate] = useState(false)
  const [expirationDays, setExpirationDays] = useState(7)
  const [timeUnit, setTimeUnit] = useState('Días')

  // State for quantity settings
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState('unidades')

  const categoryOptions = ['Comida', 'Higiene personal', 'Enlatados', 'Frutas']
  const timeUnitOptions = ['Días', 'Semanas', 'Meses']
  const unitOptions = ['unidades', 'kg', 'paquetes', 'L', 'g']

  const handleGoBack = () => {
    router.back()
  }

  const handleCategorySelect = (selectedCategory) => {
    // Category is disabled, so this won't be called
    console.log('Category selection disabled')
  }

  const handleTimeUnitSelect = (selectedUnit) => {
    setTimeUnit(selectedUnit)
  }

  const handleDaysChange = (newDays) => {
    setExpirationDays(newDays)
  }

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity)
  }

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit)
  }

  const handleAddProduct = () => {
    // Logic to add the product to inventory
    const productToAdd = {
      id: productId,
      icon: selectedIcon,
      name,
      category,
      quantity,
      unit,
      hasExpirationDate,
      expirationDays: hasExpirationDate ? expirationDays : null,
      timeUnit: hasExpirationDate ? timeUnit : null,
    }
    console.log('Adding product to inventory:', productToAdd)
    // Navigate back to inventario
    router.back()
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Agregar producto</Text>
        <TouchableOpacity onPress={handleGoBack} style={styles.closeButton}>
          <Ionicons name="close" size={28} color={COLORS.blackText} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Icon Display (no picker, just display) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Producto seleccionado</Text>
          <View style={styles.productDisplay}>
            <Text style={styles.productIcon}>{selectedIcon}</Text>
          </View>
        </View>

        {/* Product Name (disabled) */}
        <View style={styles.section}>
          <MoneyInput
            label="Nombre del producto"
            value={name}
            onChangeText={() => {}} // Disabled
            placeholder="Nombre del producto"
            keyboardType="default"
            numbersOnly={false}
            editable={false}
          />
        </View>

        {/* Category (disabled) */}
        <View style={[styles.section, styles.categorySection]}>
          <Text style={styles.sectionLabel}>Categoría</Text>
          <View style={styles.disabledInput}>
            <Text style={styles.disabledText}>
              {category || 'Sin categoría'}
            </Text>
          </View>
        </View>

        {/* Quantity Toggle */}
        <QuantityToggle
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          unit={unit}
          onUnitChange={handleUnitChange}
          unitOptions={unitOptions}
        />

        {/* Expiration Toggle */}
        <ExpirationToggle
          hasExpirationDate={hasExpirationDate}
          onToggleChange={setHasExpirationDate}
          expirationDays={expirationDays}
          onDaysChange={handleDaysChange}
          timeUnit={timeUnit}
          onTimeUnitChange={handleTimeUnitSelect}
          timeUnitOptions={timeUnitOptions}
        />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <CustomButton
          title="Agregar a inventario"
          icon="add"
          onPress={handleAddProduct}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greyBorder,
  },
  headerTitle: {
    fontSize: FONTS.size.xxl,
    fontFamily: FONTS.bold,
    color: COLORS.blackText,
  },
  closeButton: {
    padding: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  categorySection: {
    zIndex: 4000,
  },
  sectionLabel: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    color: COLORS.primaryBlue,
    marginBottom: 12,
  },
  productDisplay: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.cardBackgroundOne,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
  },
  productIcon: {
    fontSize: 64,
  },
  disabledInput: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    borderRadius: 8,
    padding: 16,
    minHeight: 50,
    justifyContent: 'center',
  },
  disabledText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: '#999',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.greyBorder,
  },
})
