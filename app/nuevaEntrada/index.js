import { useState } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles, COLORS } from '../../styles/globalStyles'
import ScreenHeader from '../../components/ScreenHeader'
import CustomDropdown from '../../components/CustomDropdown'
import CustomDatePicker from '../../components/CustomDatePicker'
import CustomButton from '../../components/customButton'
import MoneyInput from '../../components/MoneyInput'
import ProductList from '../../components/ProductList'
import { useRouter } from 'expo-router'
import { useEntradas } from '../../hooks/useEntradas'

export default function NuevaEntrada() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const router = useRouter()

  const [fecha, setFecha] = useState()
  const [monto, setMonto] = useState()
  // eslint-disable-next-line
  const [productos, setProductos] = useState([])
  const [opcionEntrada, setOpcionEntrada] = useState('')
  const { save, loading, error} = useEntradas()
  const opcionesEntrada = ['Compra', 'Donación']

  const handleOutsidePress = () => {
    Keyboard.dismiss()
    setIsDropdownOpen(false)
    setDatePickerVisibility(false)
  }

  const handleRegistrarEntrada = async () => {
    if (!fecha || !opcionEntrada) {
      alert('Por favor completa todos los campos obligatorios.')
      return
    }

  const entradaData = {
    tipoEntrada: opcionEntrada,
    fechaEntrada: fecha,
    monto: opcionEntrada === 'Compra' ? parseFloat(monto) : 0,
    productos: productos,
    }

    const result = await save(entradaData)

    if (result.success) {
      alert('Entrada registrada exitosamente.')
      router.push('/nuevaEntrada')
    }
    else {
      alert('Error al registrar la entrada: ' + (error || 'Inténtalo de nuevo.'))
    }
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.container}>
            <ScreenHeader
              onBackPress={() => router.navigate('/')}
              title="Nueva entrada"
              paddingHorizontal={0}
            />

            {isDatePickerVisible && (
              <TouchableWithoutFeedback
                onPress={() => setDatePickerVisibility(false)}
              >
                <View style={styles.backdrop} />
              </TouchableWithoutFeedback>
            )}

            <View style={styles.wrapper}>
              <CustomDropdown
                label="Tipo de entrada"
                value={opcionEntrada}
                placeholder="Seleccionar"
                options={opcionesEntrada}
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
                onSelect={setOpcionEntrada}
              />
            </View>

            <View>
              {opcionEntrada === 'Compra' && (
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
            </View>

            <View style={styles.dateWrapper}>
              <CustomDatePicker
                label="Fecha de entrada"
                date={fecha}
                isVisible={isDatePickerVisible}
                onToggle={() => setDatePickerVisibility(true)}
                onDateSelect={(d) => {
                  setFecha(d)
                  setDatePickerVisibility(false)
                }}
                onCancel={() => setDatePickerVisibility(false)}
              />
            </View>
            <ProductList
              title="Productos de la entrada"
              products={productos}
              addButtonText="Agregar del inventario"
              emptyMessage="Esta entrada no cuenta con ningún producto..."
              navigateTo="/inventario"
            />
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <View style={styles.buttonGroup}>
                <CustomButton
                  title="Guardar borrador"
                  onPress={() => {}}
                  borderRadius={4}
                  textColor={COLORS.primaryBlue}
                  borderColor={COLORS.primaryBlue}
                  backgroundColor={COLORS.background}
                  textSize={12}
                />
                <CustomButton
                  title="Registrar Entrada"
                  onPress={handleRegistrarEntrada}
                  borderRadius={4}
                  backgroundColor={COLORS.primaryBlue}
                  iconRight="chevron-forward"
                  textSize={12}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 332,
    alignSelf: 'center',
    backgroundColor: COLORS.background,
    position: 'relative',
    overflow: 'visible',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 15,
  },
  wrapper: {
    height: 80,
    zIndex: 10,
    position: 'relative',
  },
  dateWrapper: {
    paddingVertical: 8,
    zIndex: 1,
    position: 'relative',
  },
  formContainer: {
    width: '100%',
    marginBottom: 12,
  },
  inputBlock: {
    marginBottom: 18,
    position: 'relative',
  },
  productsContainer: {
    flex: 1,
    width: '100%',
    marginTop: 4,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    height: 50,
    gap: 10,
    width: '100%',
    marginTop: 10,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: 332,
    height: 52,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
})
