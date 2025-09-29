import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { globalStyles, COLORS } from '../styles/globalStyles'

/**
 * Custom button with optional icons (left/right).
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The button label text.
 * @param {() => void} props.onPress - Function executed when the button is pressed.
 * @param {number} [props.size=20] - Icon size.
 * @param {string} [props.color="#fff"] - Icon color.
 * @param {string | boolean} [props.iconLeft] - Ionicons icon name.
 * @param {string | boolean} [props.iconRight] - Ionicons icon name.
 * @param {number|string} [props.width] - Optional width.
 * @param {number} [props.borderRadius] - Optional border radius.
 * @param {boolean} [props.outlined=false] - If true, renders button as outlined.
 */
export default function CustomButton({
  title,
  onPress,
  size = 20,
  color = '#fff',
  iconLeft,
  iconRight,
  width,
  borderRadius,
  outlined = false,
}) {
  const renderIcon = (iconName) => (
    <Ionicons
      name={iconName}
      size={size}
      color={outlined ? COLORS.primaryBlue : color}
      style={{ marginHorizontal: 4 }}
    />
  )

  return (
    <TouchableOpacity
      style={[
        globalStyles.customButton,
        width && { width },
        borderRadius && { borderRadius },
        outlined && {
          backgroundColor: COLORS.background,
          borderWidth: 2,
          borderColor: COLORS.primaryBlue,
        },
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {iconLeft && renderIcon(iconLeft)}
        <Text
          style={[
            globalStyles.customButtonText,
            outlined && { color: COLORS.primaryBlue },
          ]}
        >
          {title}
        </Text>
        {iconRight && renderIcon(iconRight)}
      </View>
    </TouchableOpacity>
  )
}
