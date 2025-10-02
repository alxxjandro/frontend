import { View, Text, StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../styles/globalStyles'

/**
 * Circular user icon that displays initials based on the provided name.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.name - Full name of the user (used to extract initials).
 * @param {number} [props.size=48] - Diameter of the circle in pixels.
 * @param {string} [props.backgroundColor] - Background color (optional).
 * @param {string} [props.color] - Text color (optional).
 * @returns {JSX.Element} A styled circle with user initials inside.
 */
export default function UserIcon({
  name = '',
  size = 48,
  backgroundColor = COLORS.primaryBlue,
  color = COLORS.whiteText,
}) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <View
      style={[
        styles.icon,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          ...(backgroundColor ? { backgroundColor } : {}),
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          { fontSize: size * 0.4, ...(color ? { color } : {}) },
        ]}
      >
        {initials}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONTS.bold,
  },
})
