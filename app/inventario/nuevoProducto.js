import { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { COLORS, FONTS, globalStyles } from '../../styles/globalStyles'
import ScreenHeader from '../../components/ScreenHeader'
import CustomInput from '../../components/customInput'
import CustomDropdown from '../../components/CustomDropdown'
import ExpirationToggle from '../../components/ExpirationToggle'
import CustomButton from '../../components/customButton'
import ProductIconPicker from './Componentes/ProductIconPicker'
import { useProducto } from '../../hooks/useProducto'
import Spinner from '../../components/Spinner'
import Toast from '../../components/Toast'
import { useUnidades } from '../../hooks/useUnidades'

export default function NuevoProducto() {
  const router = useRouter()
  const { mode, returnTo } = useLocalSearchParams()
  const { categorias, loading, fetchCategorias, create } = useProducto()
  const { unidades } = useUnidades()

  // Estados
  const [selectedIcon, setSelectedIcon] = useState('🧻')
  const [nombreProducto, setNombreProducto] = useState('')
  const [categoria, setCategoria] = useState('')
  const [unidad, setUnidad] = useState('')
  const [hasExpirationDate, setHasExpirationDate] = useState(false)
  const [expirationDays, setExpirationDays] = useState(7)
  const [timeUnit, setTimeUnit] = useState('Días')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isUnidadOpen, setIsUnidadOpen] = useState(false)

  const timeUnitOptions = ['Días', 'Semanas', 'Meses']

  useEffect(() => {
    fetchCategorias()
  }, [])

  const categoryOptions = categorias.map((cat) => cat.nombreDepartamento)
  const unidadOptions = unidades?.map((u) => u.unidad) || []

  const handleGoBack = () => {
    if (mode === 'select' && returnTo) {
      router.replace({
        pathname: '/inventario',
        params: { mode: 'select', returnTo },
      })
    } else router.back()
  }

  const handleOutsidePress = () => {
    Keyboard.dismiss()
    setIsCategoryOpen(false)
    setIsUnidadOpen(false)
  }

  const handleCreateProduct = async () => {
    if (!nombreProducto.trim()) {
      Toast.show('Por favor ingresa el nombre del producto', 'error')
      return
    }

    if (!categoria) {
      Toast.show('Por favor selecciona una categoría', 'error')
      return
    }

    if (!unidad) {
      Toast.show('Por favor selecciona una unidad', 'error')
      return
    }

    const categoriaSeleccionada = categorias.find(
      (cat) => cat.nombreDepartamento === categoria
    )
    const unidadSeleccionada = unidades.find((u) => u.unidad === unidad)

    if (!categoriaSeleccionada || !unidadSeleccionada) {
      Toast.show('Datos inválidos. Revisa las selecciones.', 'error')
      return
    }

    const payload = {
      nombreProducto: nombreProducto.trim(),
      emoji: selectedIcon,
      idDepartamento_departamento: categoriaSeleccionada.idDepartamento,
      idUnidad_unidad: unidadSeleccionada.idUnidad,
    }

    try {
      const result = await create(payload)
      if (result.success) {
        Toast.show('Producto creado correctamente', 'success')
        setTimeout(() => router.back(), 1500)
      } else {
        Toast.show(result.message || 'Error al crear el producto', 'error')
      }
    } catch (error) {
      Toast.show('Error al crear el producto', 'error')
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.container}>
            <ScreenHeader
              paddingHorizontal={0}
              title="Nuevo producto"
              showBackButton={true}
              backIconName="close"
              onBackPress={handleGoBack}
            />

            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.iconContainer}>
                <Text style={styles.productIcon}>{selectedIcon}</Text>
                <ProductIconPicker
                  selectedIcon={selectedIcon}
                  onIconSelect={setSelectedIcon}
                />
              </View>

              <CustomInput
                label="Nombre del producto"
                placeholder="Ej. Pasta dental"
                value={nombreProducto}
                onChangeText={setNombreProducto}
              />

              <View style={styles.dropdownWrapper}>
                <CustomDropdown
                  label="Categoría"
                  value={categoria}
                  options={categoryOptions}
                  onSelect={setCategoria}
                  isOpen={isCategoryOpen}
                  setIsOpen={setIsCategoryOpen}
                />

                <CustomDropdown
                  label="Unidad"
                  value={unidad}
                  options={unidadOptions}
                  onSelect={setUnidad}
                  isOpen={isUnidadOpen}
                  setIsOpen={setIsUnidadOpen}
                />
              </View>

              <View style={{ marginTop: 10 }}>
                <ExpirationToggle
                  hasExpirationDate={hasExpirationDate}
                  onToggleChange={setHasExpirationDate}
                  expirationDays={expirationDays}
                  onDaysChange={setExpirationDays}
                  timeUnit={timeUnit}
                  onTimeUnitChange={setTimeUnit}
                  timeUnitOptions={timeUnitOptions}
                />
              </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
              <CustomButton
                title="Crear producto"
                iconRight="add"
                onPress={handleCreateProduct}
                backgroundColor={COLORS.primaryGreen}
                textColor="#fff"
                textSize={FONTS.size.sm}
                borderRadius={8}
                width={332}
                height="52"
                disabled={loading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Spinner isVisible={loading} />
        <Toast.Container />
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
  scrollContent: {
    paddingBottom: 120,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productIcon: {
    fontSize: 72,
  },
  dropdownWrapper: {
    marginTop: 10,
    zIndex: 10,
    gap: 10,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
})
