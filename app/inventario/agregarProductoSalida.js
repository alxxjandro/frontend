import { useEffect, useState } from 'react'
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
import QuantityToggle from '../../components/QuantityToggle'
import CustomButton from '../../components/customButton'
import { useUnidades } from '../../hooks/useUnidades'
import { useInventario } from '../../hooks/useInventario'
import { useNuevaSalidaStore } from '../../stores/useNuevaSalidaStore'
import Toast from '../../components/Toast'

export default function AgregarProductoSalida() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { productName, productEmoji, productCategory, productId, idUnidad } =
    params

  const { unidades } = useUnidades()
  const { fetchAll: fetchInventario } = useInventario()
  const { addProducto } = useNuevaSalidaStore()

  const [inventario, setInventario] = useState([])
  const [unitFromId, setUnitFromId] = useState('Unidad')
  const [quantity, setQuantity] = useState(1)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  useEffect(() => {
    if (unidades?.length > 0 && idUnidad) {
      const match = unidades.find((u) => u.idUnidad === Number(idUnidad))
      if (match) setUnitFromId(match.unidad)
    }
  }, [unidades, idUnidad])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await fetchInventario()
        if (res?.success && Array.isArray(res.data)) {
          setInventario(res.data)
        }
      } catch (e) {
        Toast.show('Error al leer inventario', 'error')
        console.error('Error al leer inventario: ', e)
      }
    }
    fetch()
  }, [])

  const [selectedIcon] = useState(productEmoji || '📦')
  const [nombreProducto] = useState(productName || '')
  const [categoria] = useState(productCategory || '')

  const handleOutsidePress = () => {
    Keyboard.dismiss()
    setIsCategoryOpen(false)
  }

  const handleAddProduct = () => {
    const cantidadSolicitada = Number(quantity)
    const inventarioProducto = inventario?.find(
      (item) => item.idProducto_producto === Number(productId)
    )

    if (!inventarioProducto) {
      return Toast.show(
        'No se pudo verificar la cantidad disponible en inventario.',
        'error'
      )
    }

    const disponible = Number(inventarioProducto.cantidadTotal)
    if (cantidadSolicitada > disponible) {
      return Toast.show(
        `Solo hay ${disponible} ${unitFromId} disponibles de este producto.`,
        'error'
      )
    }

    const newProduct = {
      nombre: nombreProducto,
      emoji: selectedIcon,
      categoria,
      cantidad: cantidadSolicitada,
      unidad: unitFromId,
      idProducto: Number(productId),
      idUnidad: Number(idUnidad),
      _uid: Date.now() + Math.random(),
    }

    addProducto(newProduct)
    Toast.show('Producto agregado a la salida', 'success')
    router.replace('/nuevaSalida')
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <Toast.Container />

        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.container}>
            <ScreenHeader
              paddingHorizontal={0}
              title="Agregar producto (salida)"
              showBackButton={true}
              backIconName="close"
              onBackPress={() => router.back()}
            />

            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.iconContainer}>
                <Text style={styles.productIcon}>{selectedIcon}</Text>
              </View>

              <CustomInput
                label="Nombre del producto"
                placeholder="Ej. Pasta dental"
                value={nombreProducto}
                disabled={true}
              />

              <View style={styles.dropdownWrapper}>
                <CustomDropdown
                  label="Categoría"
                  value={categoria}
                  options={[categoria]}
                  isOpen={isCategoryOpen}
                  disabled={true}
                  setIsOpen={setIsCategoryOpen}
                />
              </View>

              <View style={{ marginTop: 20 }}>
                <QuantityToggle
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  unit={unitFromId}
                  onUnitChange={() => {}}
                  unitOptions={[unitFromId]}
                />
                {inventario.length > 0 && (
                  <Text
                    style={{
                      fontFamily: FONTS.regular,
                      fontSize: FONTS.size.sm,
                      color: COLORS.greyText,
                      marginTop: 8,
                      textAlign: 'center',
                    }}
                  >
                    Disponibles:{' '}
                    {inventario.find(
                      (i) => i.idProducto_producto === Number(productId)
                    )?.cantidadTotal ?? '—'}{' '}
                    {unitFromId}
                  </Text>
                )}
              </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
              <CustomButton
                title="Agregar a salida"
                iconRight="add"
                onPress={handleAddProduct}
                backgroundColor={COLORS.primaryBlue}
                textColor="#fff"
                textSize={FONTS.size.sm}
                borderRadius={8}
                width={332}
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
  scrollContent: { paddingBottom: 120 },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  productIcon: { fontSize: 72 },
  dropdownWrapper: { marginTop: 10, zIndex: 10 },
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
