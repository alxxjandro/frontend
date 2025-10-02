import { View, ScrollView, StatusBar, StyleSheet } from 'react-native'
import { useState } from 'react'
import CustomButton from '../../components/customButton'
import ScreenHeader from '../../components/screenHeader'
import CustomDropdown from '../../components/CustomDropdown'
import CustomDatePicker from '../../components/CustomDatePicker'
import ProductList from '../../components/ProductList'
import { globalStyles, COLORS } from '../../styles/globalStyles'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

export default function NuevaSalida() {
  const [fecha, setFecha] = useState('27/09/2025')
  const [productos, setProductos] = useState([])
  const [motivo, setMotivo] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const opcionesMotivo = ['Merma', 'Uso cocina', 'Uso personal']

  const handleMotivoSelect = (selectedMotivo) => {
    setMotivo(selectedMotivo)
    setIsDropdownOpen(false)
  }

  const handleDateSelect = (selectedDate) => {
    setFecha(selectedDate)
    setDatePickerVisibility(false)
  }

  const handleRegisterSalida = () => {
    // Logic for registering the salida
    console.log('Registering salida:', { fecha, motivo, productos })
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
              <ScreenHeader title="Nueva salida" />

              {/* Dropdown de motivo */}
              <CustomDropdown
                label="Motivo de la salida"
                value={motivo}
                placeholder="Seleccionar"
                options={opcionesMotivo}
                isOpen={isDropdownOpen}
                onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                onSelect={handleMotivoSelect}
              />

              {/* Date Picker */}
              <CustomDatePicker
                label="Fecha de salida"
                date={fecha}
                isVisible={isDatePickerVisible}
                onToggle={() => setDatePickerVisibility(true)}
                onDateSelect={handleDateSelect}
                onCancel={() => setDatePickerVisibility(false)}
              />

              {/* Product List */}
              <ProductList products={productos} />
            </ScrollView>

            {/* Fixed Bottom Button */}
            <View style={styles.fixedBottom}>
              <CustomButton
                title="Registrar salida"
                onPress={handleRegisterSalida}
              />
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
  fixedBottom: {
    paddingVertical: 20,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.greyBorder,
  },
})
