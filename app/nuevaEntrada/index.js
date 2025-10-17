import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
import { useAuth } from '../../hooks/useAuth' // ✅ importamos el hook de auth

export default function NuevaEntrada() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [user, setUser] = useState(null) // ✅ aquí guardaremos el usuario autenticado

  const router = useRouter()
  const params = useLocalSearchParams() || {}
  const newProduct = params?.newProduct ? JSON.parse(params.newProduct) : null
  const returnTo = params.returnTo ?? null

  const [fecha, setFecha] = useState()
  const [monto, setMonto] = useState()
  const [productos, setProductos] = useState([])
  const [opcionEntrada, setOpcionEntrada] = useState('')

  const { save, loading, error } = useEntradas()
  const { isAuthenticated } = useAuth() // ✅ solo para verificar si hay sesión
  const opcionesEntrada = ['Compra', 'Donación']

  // ✅ Recuperamos el usuario autenticado desde AsyncStorage al iniciar
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user')
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
          console.log('Usuario autenticado:', parsedUser)
        } else {
          console.warn('No hay usuario autenticado en AsyncStorage')
        }
      } catch (e) {
        console.error('Error al cargar usuario:', e)
      }
    }
    fetchUser()
  }, [])

  // ✅ Mismo useEffect para productos, no lo tocamos
  useEffect(() => {
    if (params.newProduct) {
      try {
        const productObj = JSON.parse(params.newProduct)
        setProductos((prev) => [...prev, productObj])
        router.replace({
          pathname: router.pathname,
          params: {},
        })
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

  const handleRegistrarEntrada = async () => {
    if (!fecha || !opcionEntrada) {
      alert('Por favor completa todos los campos obligatorios.')
      return
    }

    if (!user) {
      alert('Usuario no autenticado. Inicia sesión antes de registrar.')
      return
    }

    const productosParaBackend = productos.map((p) => ({
      idProducto: p.idProducto,
      idUnidad: p.idUnidad || 1,
      cantidad: p.quantity.toString(),
      fechaEstimada: p.hasExpirationDate ? new Date(p.hasExpirationDate) : new Date(), // ✅ usamos directamente la fecha ya existente
    }))

    const entradaData = {
      idUsuario_usuario: user.idUsuario || user.id, // ✅ usamos el id dinámico
      fechaEntrada: fecha,
      emisor: opcionEntrada === 'Donación' ? 'Donante' : 'Compra',
      compra: opcionEntrada === 'Compra' ? parseFloat(monto) : 0,
      productos: productosParaBackend,
    }

    console.log('📦 Datos que se enviarán al backend:', entradaData)

    const result = await save(entradaData)
    if (result.success) {
      alert('Entrada registrada con éxito.')
      router.push('/nuevaEntrada')
    } else {
      alert(`Error al registrar la entrada: ${error || 'Inténtalo de nuevo.'}`)
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
              navigateTo="/inventario?mode=select&returnTo=nuevaEntrada"
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
