import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { COLORS, FONTS } from '../styles/globalStyles'

export default function AddProductButton({
  text = 'Agregar un producto del inventario +',
  onPress,
  navigateTo = '/inventario',
  mode = 'view',
  backgroundColor = COLORS.primaryBlue,
  textColor = COLORS.whiteText,
  style,
}) {
  const router = useRouter()

  const handlePress = () => {
    if (onPress) {
      onPress()
    } else {
      router.push({
        pathname: navigateTo,
        params: { mode },
      })
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
