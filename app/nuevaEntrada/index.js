import {
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import ScreenHeader from '../../components/screenHeader'
import CustomButton from '../../components/customButton'
import MoneyInput from '../../components/MoneyInput'
import CustomDropdown from '../../components/CustomDropdown'
import CustomDatePicker from '../../components/CustomDatePicker'
import ProductList from '../../components/ProductList'
import { globalStyles, COLORS, FONTS } from '../../styles/globalStyles'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

export default function NuevaEntrada() {
  const [fecha, setFecha] = useState('27/09/2025')
  const [productos, setProductos] = useState([])
  const [motivo, setMotivo] = useState(null)
  const [monto, setMonto] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const opcionesMotivo = ['Donación', 'Compra']

  const handleMotivoSelect = (selectedMotivo) => {
    setMotivo(selectedMotivo)
    setIsDropdownOpen(false)
    // Reset monto when motivo changes
    if (selectedMotivo !== 'Compra') {
      setMonto('')
    }
  }

  const handleDateSelect = (selectedDate) => {
    setFecha(selectedDate)
    setDatePickerVisibility(false)
  }

  const handleScanBarcode = () => {
    // Navigate to barcode scanner screen
    router.push('/nuevaEntrada/escaner')
  }

  const handleSaveDraft = () => {
    // Logic for saving draft
  }

  const handleRegisterEntrada = () => {
    // Logic for registering the entrada
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <View style={styles.container}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={COLORS.background}
          />
          <View style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              {/* Header */}
              <ScreenHeader title="Nueva entrada" />

              {/* Dropdown de motivo */}
              <CustomDropdown
                label="Motivo de la entrada"
                value={motivo}
                placeholder="Seleccionar"
                options={opcionesMotivo}
                isOpen={isDropdownOpen}
                onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                onSelect={handleMotivoSelect}
              />

              {/* Money Input - only shown when Compra is selected */}
              {motivo === 'Compra' && (
                <MoneyInput
                  label="Monto"
                  value={monto}
                  onChangeText={setMonto}
                  placeholder="Monto"
                  showCurrencySymbol={true}
                  currencySymbol="$"
                  keyboardType="numeric"
                  numbersOnly={true}
                />
              )}

              {/* Date Picker */}
              <CustomDatePicker
                label="Fecha de entrada"
                date={fecha}
                isVisible={isDatePickerVisible}
                onToggle={() => setDatePickerVisibility(true)}
                onDateSelect={handleDateSelect}
                onCancel={() => setDatePickerVisibility(false)}
              />

              {/* Product List */}
              <ProductList
                title="Productos de la entrada"
                products={productos}
                addButtonText="Agregar del inventario +"
                emptyMessage="Esta entrada no cuenta con ningún producto..."
                navigateTo="/inventario"
              />

              {/* Additional Buttons Section */}
              {/* <View style={styles.additionalButtonsContainer}>
                <TouchableOpacity
                  style={styles.barcodeButton}
                  onPress={handleScanBarcode}
                >
                  <View style={styles.buttonContent}>
                    <Ionicons
                      name="barcode"
                      size={20}
                      color={COLORS.whiteText}
                      style={styles.buttonIcon}
                    />
                    <Text style={styles.barcodeButtonText}>
                      Escanear código de barras
                    </Text>
                  </View>
                </TouchableOpacity>
              </View> */}
            </ScrollView>

            {/* Fixed Bottom Buttons */}
            <View style={styles.fixedBottomButtons}>
              <TouchableOpacity
                style={styles.draftButton}
                onPress={handleSaveDraft}
              >
                <View style={styles.buttonContent}>
                  <Ionicons
                    name="save"
                    size={20}
                    color={COLORS.blackText}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.draftButtonText}>Guardar borrador</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.registerButtonWrapper}>
                <CustomButton
                  title="Registrar Entrada >>"
                  onPress={handleRegisterEntrada}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  additionalButtonsContainer: {
    marginTop: 15,
  },
  barcodeButton: {
    backgroundColor: COLORS.primaryBlue,
    padding: 12,
    borderRadius: 6,
    marginTop: 5,
  },
  barcodeButtonText: {
    color: COLORS.whiteText,
    textAlign: 'center',
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    fontWeight: '500',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  fixedBottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderColor: COLORS.greyBorder,
    backgroundColor: COLORS.background,
    gap: 12,
  },
  draftButton: {
    backgroundColor: COLORS.cardBackgroundOne,
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    padding: 12,
    borderRadius: 6,
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  draftButtonText: {
    color: COLORS.blackText,
    textAlign: 'center',
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
  },
  registerButtonWrapper: {
    flex: 1,
  },
})
