import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useRouter, usePathname } from 'expo-router'
import { COLORS, FONTS } from '../styles/globalStyles'

export default function AddProductButton({
  text = 'Agregar un producto del inventario +',
  onPress,
  navigateTo = '/inventario/nuevoProducto',
  mode = 'view',
  backgroundColor = COLORS.primaryBlue,
  textColor = COLORS.whiteText,
  style,
}) {
  const router = useRouter()
  const pathname = usePathname()

  const handlePress = () => {
    if (onPress) {
      onPress()
    } else {
      // Check if we should navigate to inventario for selection or to new product creation
      if (mode === 'select') {
        // Determine return route based on current pathname
        let returnTo = 'nuevaEntrada' // default
        if (pathname.includes('nuevaSalida')) {
          returnTo = 'nuevaSalida'
        }

        router.push({
          pathname: '/inventario',
          params: { mode, returnTo },
        })
      } else {
        // Use push for new product creation
        router.push(navigateTo)
      }
    }
  }

  return (
    <TouchableOpacity
      style={[styles.addButton, { backgroundColor }, style]}
      onPress={handlePress}
    >
      <Text style={[styles.addButtonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  addButton: {
    padding: 12,
    borderRadius: 6,
    marginTop: 15,
  },
  addButtonText: {
    textAlign: 'center',
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    fontWeight: '500',
  },
})
