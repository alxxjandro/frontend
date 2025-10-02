import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../styles/globalStyles'

/**
 * Circular action icon with customizable background and press handler.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.name - Ionicons icon name (e.g. "create-outline").
 * @param {number} [props.size=40] - Diameter of the circle in pixels.
 * @param {string} [props.iconColor=COLORS.primaryGreen] - Icon color.
 * @param {string} [props.bgColor="#ecfccb"] - Background color of the circle.
 * @param {() => void} [props.onPress] - Function executed when the icon is pressed.
 * @returns {JSX.Element} A styled circular button with an Ionicon.
 */
export default function CustomIcon({
  name,
  size = 40,
  iconColor = COLORS.primaryGreen,
  bgColor = '#ecfccb',
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        style={[
          styles.icon,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: bgColor,
          },
        ]}
      >
        <Ionicons name={name} size={size * 0.5} color={iconColor} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
