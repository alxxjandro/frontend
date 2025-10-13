import { useState } from 'react'
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

export default function AgregarProducto() {
  const router = useRouter()
  const { productName, productEmoji, productCategory } = useLocalSearchParams()

  const [selectedIcon] = useState(productEmoji || '📦')
  const [nombreProducto, setNombreProducto] = useState(productName || '')
  const [categoria, setCategoria] = useState(
    productCategory || 'Higiene personal'
  )
  const [hasExpirationDate, setHasExpirationDate] = useState(false)
  const [expirationDays, setExpirationDays] = useState(7)
  const [timeUnit, setTimeUnit] = useState('Días')
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState('Unidad')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const categoryOptions = ['Comida', 'Higiene personal', 'Enlatados', 'Frutas']
  const timeUnitOptions = ['Días', 'Semanas', 'Meses']
  const unitOptions = ['Unidad', 'Kg', 'Paquete', 'Litro', 'Gramos']

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
      unit,
      hasExpirationDate,
      expirationDays: hasExpirationDate ? expirationDays : null,
      timeUnit: hasExpirationDate ? timeUnit : null,
    }
    /* eslint-disable-next-line */
    console.log('Producto agregado:', newProduct)
    router.back()
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
                  unit={unit}
                  onUnitChange={setUnit}
                  unitOptions={unitOptions}
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
