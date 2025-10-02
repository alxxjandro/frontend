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
import CustomDropdown from '../../components/CustomDropdown'
import ProductIconPicker from './Componentes/ProductIconPicker'

export default function NuevoProducto() {
  const router = useRouter()
  const { mode, returnTo } = useLocalSearchParams()
  const [selectedIcon, setSelectedIcon] = useState('🧻')
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [hasExpirationDate, setHasExpirationDate] = useState(false)
  const [expirationDays, setExpirationDays] = useState(7)
  const [timeUnit, setTimeUnit] = useState('Días')

  const categoryOptions = ['Comida', 'Higiene personal', 'Enlatados', 'Frutas']
  const timeUnitOptions = ['Días', 'Semanas', 'Meses']

  const handleGoBack = () => {
    if (mode === 'select' && returnTo) {
      // Return to inventario with the same mode and returnTo context
      router.replace({
        pathname: '/inventario',
        params: {
          mode: 'select',
          returnTo: returnTo,
        },
      })
    } else {
      // Regular flow - go back to inventario view mode
      router.replace('/inventario')
    }
  }

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon)
  }

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory)
  }

  const handleTimeUnitSelect = (unit) => {
    setTimeUnit(unit)
  }

  const handleDaysChange = (newDays) => {
    setExpirationDays(newDays)
  }

  const handleAddProduct = () => {
    // Logic to add the product
    const newProduct = {
      icon: selectedIcon,
      name: productName,
      category,
      hasExpirationDate,
      expirationDays: hasExpirationDate ? expirationDays : null,
      timeUnit: hasExpirationDate ? timeUnit : null,
    }
    console.log('Adding product:', newProduct)
    // Navigate back to inventario using replace to avoid stack issues
    router.replace('/inventario')
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nuevo Producto</Text>
        <TouchableOpacity onPress={handleGoBack} style={styles.closeButton}>
          <Ionicons name="close" size={28} color={COLORS.blackText} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Icon Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Icono del producto</Text>
          <ProductIconPicker
            selectedIcon={selectedIcon}
            onIconSelect={handleIconSelect}
          />
        </View>

        {/* Product Name */}
        <View style={styles.section}>
          <MoneyInput
            label="Nombre del producto"
            value={productName}
            onChangeText={setProductName}
            placeholder="Papel de baño"
            keyboardType="default"
            numbersOnly={false}
          />
        </View>

        {/* Category */}
        <View style={[styles.section, styles.categorySection]}>
          <CustomDropdown
            label="Categoria"
            value={category}
            placeholder="Higiene personal"
            options={categoryOptions}
            onSelect={handleCategorySelect}
          />
        </View>

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
          title="Agregar a entrada"
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
