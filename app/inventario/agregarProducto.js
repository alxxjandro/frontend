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
import ExpirationToggle from '../../components/ExpirationToggle'
import CustomButton from '../../components/customButton'
import { useUnidades } from '../../hooks/useUnidades'

export default function AgregarProducto() {
  const router = useRouter()
  const params = useLocalSearchParams()

  const {
    productName,
    productEmoji,
    productCategory,
    productId,
    idUnidad,
    returnTo = 'nuevaEntrada',
  } = params

  const { unidades } = useUnidades()
  const [unitFromId, setUnitFromId] = useState('Unidad')

  useEffect(() => {
    if (unidades?.length > 0 && idUnidad) {
      const match = unidades.find((u) => u.idUnidad === Number(idUnidad))
      if (match) {
        setUnitFromId(match.unidad)
      }
    }
  }, [unidades, idUnidad])

  const [selectedIcon] = useState(productEmoji || '📦')
  const [nombreProducto] = useState(productName || '')
  const [categoria] = useState(productCategory || '')
  const [hasExpirationDate, setHasExpirationDate] = useState(false)
  const [expirationDays, setExpirationDays] = useState(7)
  const [timeUnit, setTimeUnit] = useState('Días')
  const [quantity, setQuantity] = useState(1)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const timeUnitOptions = ['Días', 'Semanas', 'Meses']

  const handleOutsidePress = () => {
    Keyboard.dismiss()
    setIsCategoryOpen(false)
  }

  const handleAddProduct = () => {
    const newProduct = {
      name: nombreProducto,
      icon: selectedIcon,
      category: categoria,
      quantity,
      unit: unitFromId,
      hasExpirationDate,
      expirationDays: hasExpirationDate ? expirationDays : null,
      timeUnit: hasExpirationDate ? timeUnit : null,
      idProducto: Number(productId),
      idUnidad: Number(idUnidad),
    }

    router.push({
      pathname: `/${returnTo}`,
      params: { newProduct: JSON.stringify(newProduct) },
    })
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.container}>
            <ScreenHeader
              paddingHorizontal={0}
              title="Agregar producto"
              showBackButton={true}
              backIconName="close"
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
                  onSelect={() => {}}
                  isOpen={isCategoryOpen}
                  disabled={true}
                  setIsOpen={setIsCategoryOpen}
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

              <View style={{ marginTop: 12 }}>
                <QuantityToggle
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  unit={unitFromId}
                  onUnitChange={() => {}}
                  unitOptions={[unitFromId]}
                />
              </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
              <CustomButton
                title="Agregar a entrada"
                iconRight="add"
                onPress={handleAddProduct}
                backgroundColor={COLORS.primaryGreen}
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
  scrollContent: {
    paddingBottom: 120,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  productIcon: {
    fontSize: 72,
  },
  dropdownWrapper: {
    marginTop: 10,
    zIndex: 10,
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
