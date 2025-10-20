import { useState, useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
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
import { useEntradas } from '../../hooks/useEntradas'
import { useAuth } from '../../hooks/useAuth'
import { useNuevaEntradaStore } from '../../stores/useNuevaEntradaStore'
import Toast from '../../components/Toast'
import Spinner from '../../components/Spinner'

export default function NuevaEntrada() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [sending, setSending] = useState(false)

  const router = useRouter()
  const params = useLocalSearchParams() || {}

  const {
    fecha,
    monto,
    opcionEntrada,
    productos,
    setFecha,
    setMonto,
    setOpcionEntrada,
    addProducto,
    clearEntrada,
  } = useNuevaEntradaStore()

  const { save, loading, error } = useEntradas()
  const { user } = useAuth()
  const opcionesEntrada = ['Compra', 'Donación']

  useEffect(() => {
    if (params.newProduct) {
      try {
        const productObj = JSON.parse(params.newProduct)
        addProducto(productObj)
        router.replace({ pathname: router.pathname, params: {} })
      } catch (e) {
        console.error('Error parsing newProduct:', e)
      }
    }
  }, [params.newProduct])

  const handleOutsidePress = () => {
    Keyboard.dismiss()
    setIsDropdownOpen(false)
    setDatePickerVisibility(false)
  }

  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return ''
    const fecha = new Date(fechaISO)
    const localDate = new Date(
      fecha.getTime() + fecha.getTimezoneOffset() * 60000
    )

    return localDate.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const handleRegistrarEntrada = async () => {
    if (!fecha || !opcionEntrada) {
      Toast.show('Por favor completa todos los campos obligatorios.', 'error')
      return
    }

    if (!user) {
      Toast.show(
        'Usuario no autenticado. Inicia sesión antes de registrar.',
        'error'
      )
      return
    }

    if (productos.length === 0) {
      Toast.show('Agrega al menos un producto a la entrada.', 'error')
      return
    }

    setSending(true)
    const productosParaBackend = productos.map((p) => ({
      idProducto: p.idProducto,
      idUnidad: p.idUnidad || 1,
      cantidad: Number(p.cantidad ?? p.quantity) || 1,
      fechaEstimada: p.hasExpirationDate
        ? new Date(p.hasExpirationDate)
        : new Date(),
    }))

    const entradaData = {
      idUsuario_usuario: user.idUsuario || user.id,
      fechaEntrada: new Date(fecha),
      emisor: opcionEntrada === 'Donación' ? 'Donante' : 'Compra',
      compra: opcionEntrada === 'Compra' ? parseFloat(monto || 0) : 0,
      productos: productosParaBackend,
    }

    const result = await save(entradaData)

    if (result?.success) {
      Toast.show('Entrada registrada con éxito', 'success')
      clearEntrada()
      setTimeout(() => router.push('/'), 800)
    } else {
      Toast.show(
        `Error al registrar la entrada: ${error || 'Inténtalo de nuevo.'}`,
        'error'
      )
    }
    setSending(false)
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
                date={formatearFecha(fecha)}
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
              navigateTo="/inventario?mode=select&returnTo=nuevaEntrada"
            />

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <View style={styles.buttonGroup}>
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

            <Toast.Container />
          </View>
        </TouchableWithoutFeedback>

        <Spinner isVisible={sending} />
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
    zIndex: -1,
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
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    height: 50,
    gap: 10,
    width: '100%',
    marginTop: 10,
  },
})
