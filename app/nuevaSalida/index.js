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
import ProductList from '../../components/ProductList'
import CustomButton from '../../components/customButton'
import { useRouter } from 'expo-router'

export default function NuevaSalida() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const [fecha, setFecha] = useState('14/09/2025')
  const [motivo, setMotivo] = useState('')
  /* eslint-disable-next-line */
  const [productos, setProductos] = useState([])

  const opcionesMotivo = ['Merma', 'Uso cocina', 'Uso personal']

  const router = useRouter()

  const handleOutsidePress = () => {
    Keyboard.dismiss()
    setIsDropdownOpen(false)
    setDatePickerVisibility(false)
  }

  const handleRegisterSalida = () => {
    /* eslint-disable-next-line */
    console.log('Registrando salida:', { motivo, fecha, productos })
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.container}>
            <ScreenHeader
              onBackPress={() => router.navigate('/')}
              title="Nueva salida"
              paddingHorizontal={0}
            />

            {(isDropdownOpen || isDatePickerVisible) && (
              <TouchableWithoutFeedback onPress={handleOutsidePress}>
                <View style={styles.backdrop} />
              </TouchableWithoutFeedback>
            )}

            <View style={styles.dropdownWrapper}>
              <CustomDropdown
                label="Motivo de la salida"
                value={motivo}
                placeholder="Seleccionar"
                options={opcionesMotivo}
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
                onSelect={setMotivo}
              />
            </View>

            <View style={styles.dateWrapper}>
              <CustomDatePicker
                label="Fecha de salida"
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
              title="Productos de la salida"
              products={productos}
              addButtonText="Agregar un producto del inventario"
              emptyMessage="Esta salida no cuenta con ningún productos..."
              navigateTo="/inventario"
            />

            <View style={styles.bottomButton}>
              <CustomButton
                title="Registrar salida"
                iconRight="chevron-forward"
                onPress={handleRegisterSalida}
                backgroundColor={COLORS.primaryBlue}
                textColor={COLORS.whiteText}
                textSize={12}
                borderRadius={6}
                width="332"
                height="52"
              />
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
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  dropdownWrapper: {
    height: 80,
    zIndex: 10,
    position: 'relative',
  },
  dateWrapper: {
    paddingVertical: 8,
    zIndex: 5,
    position: 'relative',
  },
  bottomButton: {
    height: 52,
    marginTop: 'auto',
    marginBottom: 10,
  },
})
