import { View, ScrollView, StatusBar } from 'react-native'
import { useState } from 'react'
import CustomButton from '../../components/customButton'
import {
  ScreenHeader,
  CustomDropdown,
  CustomDatePicker,
  ProductList,
} from './_components'
import { nuevaSalidaStyles } from './_styles/nuevaSalidaStyles'
import { COLORS } from '../../styles/globalStyles'

export default function NuevaSalida() {
  const [fecha, setFecha] = useState('27/09/2025')
  const [productos, setProductos] = useState([])
  const [motivo, setMotivo] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const opcionesMotivo = ['Venta', 'Donación', 'Descarte']

  const handleMotivoSelect = (selectedMotivo) => {
    setMotivo(selectedMotivo)
    setIsDropdownOpen(false)
  }

  const handleDateSelect = (selectedDate) => {
    setFecha(selectedDate)
    setDatePickerVisibility(false)
  }

  const handleAddProduct = () => {
    setProductos([...productos, 'Producto nuevo'])
  }

  const handleRegisterSalida = () => {
    // Logic for registering the salida
    console.log('Registering salida:', { fecha, motivo, productos })
  }

  return (
    <View style={nuevaSalidaStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={nuevaSalidaStyles.wrapper}>
        <ScrollView contentContainerStyle={nuevaSalidaStyles.scrollContent}>
          {/* Header */}
          <ScreenHeader title="Nueva salida" backRoute="/" />

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
          <ProductList products={productos} onAddProduct={handleAddProduct} />
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={nuevaSalidaStyles.fixedBottom}>
          <CustomButton
            title="Registrar salida >>"
            onPress={handleRegisterSalida}
          />
        </View>
      </View>
    </View>
  )
}
