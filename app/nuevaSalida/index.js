import { useMemo, useState } from 'react'
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
import ProductListSalida from '../../components/ProductListSalida'
import CustomButton from '../../components/customButton'
import Spinner from '../../components/Spinner'
import Toast from '../../components/Toast'
import { useRouter } from 'expo-router'

import { useAuth } from '../../hooks/useAuth'
import { useRazonesSalida } from '../../hooks/useRazonesSalida'
import { useNuevaSalidaStore } from '../../stores/useNuevaSalidaStore'
import SalidasServiceProxy from '../../api/proxies/salidaService'

export default function NuevaSalida() {
  const router = useRouter()
  const { user } = useAuth()
  const salidasProxy = SalidasServiceProxy()

  const { razones, loading: loadingRazones } = useRazonesSalida()
  const {
    fechaSalida,
    setFechaSalida,
    idRazon,
    setRazon,
    productos,
    clearSalida,
  } = useNuevaSalidaStore()

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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [sending, setSending] = useState(false)

  const opcionesMotivo = useMemo(() => razones.map((r) => r.razon), [razones])

  const handleOutsidePress = () => {
    Keyboard.dismiss()
    setIsDropdownOpen(false)
    setDatePickerVisibility(false)
  }

  const handleSelectMotivo = (nombreRazon) => {
    const razonObj = razones.find((r) => r.razon === nombreRazon)
    if (razonObj) setRazon(razonObj.idRazon)
  }

  const handleRegisterSalida = async () => {
    try {
      if (!user?.id) {
        return Toast.show('Usuario no autenticado.', 'error')
      }

      if (!idRazon) {
        return Toast.show('Selecciona un motivo de salida.', 'error')
      }

      if (!fechaSalida) {
        return Toast.show('Selecciona una fecha de salida.', 'error')
      }

      if (productos.length === 0) {
        return Toast.show('Agrega al menos un producto.', 'error')
      }

      const payload = {
        idUsuario: user.id,
        idRazon,
        fechaSalida,
        productos: productos.map(({ idProducto, cantidad }) => ({
          idProducto,
          cantidad,
        })),
      }

      setSending(true)

      const resp = await salidasProxy.createSalida(payload)

      if (resp?.success) {
        Toast.show('Salida registrada correctamente', 'success')

        setTimeout(() => {
          clearSalida()
          router.replace('/')
        }, 1200)
      } else {
        throw new Error(resp?.message || 'Error al registrar salida.')
      }
    } catch (err) {
      console.error('Error al registrar salida:', err)
      Toast.show(err.message || 'No se pudo registrar la salida.', 'error')
    } finally {
      setSending(false)
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <Toast.Container />
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
                value={
                  idRazon
                    ? razones.find((r) => r.idRazon === idRazon)?.razon
                    : ''
                }
                placeholder={loadingRazones ? 'Cargando...' : 'Seleccionar'}
                options={opcionesMotivo}
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
                onSelect={handleSelectMotivo}
                disabled={loadingRazones || opcionesMotivo.length === 0}
              />
            </View>

            <View style={styles.dateWrapper}>
              <CustomDatePicker
                label="Fecha de salida"
                date={formatearFecha(fechaSalida)}
                isVisible={isDatePickerVisible}
                onToggle={() => setDatePickerVisibility(true)}
                onDateSelect={(d) => {
                  setFechaSalida(d)
                  setDatePickerVisibility(false)
                }}
                onCancel={() => setDatePickerVisibility(false)}
              />
            </View>

            <ProductListSalida
              title="Productos de la salida"
              addButtonText="Agregar del inventario"
              emptyMessage="Esta salida no cuenta con ningún producto..."
              navigateTo="/inventario?mode=select&returnTo=nuevaSalida"
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

        <Spinner isVisible={loadingRazones || sending} />
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
