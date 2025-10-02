import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { globalStyles, COLORS, SIZE } from '../styles/globalStyles'

/**
 * Custom button with optional icons (left/right).
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The button label text.
 * @param {() => void} props.onPress - Function executed when the button is pressed.
 * @param {number} [props.size=20] - Icon size.
 * @param {string} [props.colorLeft="#fff"] - Left icon color.
 * @param {string} [props.colorRight="#fff"] - Right icon color.
 * @param {string | boolean} [props.iconLeft] - Ionicons icon name for left.
 * @param {string | boolean} [props.iconRight] - Ionicons icon name for right.
 * @param {number|string} [props.width] - Optional width.
 * @param {number} [props.borderRadius] - Optional border radius.
 * @param {boolean} [props.outlined=false] - If true, renders button as outlined.
 * @param {string} [props.backgroundColor] - Button background color.
 * @param {string} [props.textColor] - Text color.
 * @param {number} [props.textSize] - Text size.
 * @param {"left" | "text" | "right"} [props.expand] - Expands one element (left, text, or right).
 * @returns {JSX.Element} A styled button with optional icons and expand behavior.
 */
export default function CustomButton({
  title,
  onPress,
  size = 20,
  colorLeft = '#fff',
  colorRight = '#fff',
  iconLeft,
  iconRight,
  width,
  borderRadius,
  outlined = false,
  backgroundColor = COLORS.background,
  textColor = COLORS.whiteText,
  textSize = SIZE.md,
  expand,
}) {
  const renderIcon = (iconName, color, expandTarget) => {
    if (expand === expandTarget) {
      return (
        <View
          style={{
            flex: 1,
            alignItems:
              expandTarget === 'left'
                ? 'flex-start'
                : expandTarget === 'right'
                  ? 'flex-end'
                  : 'center',
          }}
        >
          <Ionicons
            name={iconName}
            size={size}
            color={outlined ? COLORS.primaryBlue : color}
          />
        </View>
      )
    }

    return (
      <Ionicons
        name={iconName}
        size={size}
        color={outlined ? COLORS.primaryBlue : color}
        style={{ marginHorizontal: 4 }}
      />
    )
  }

  return (
    <TouchableOpacity
      style={[
        globalStyles.customButton,
        width && { width },
        borderRadius && { borderRadius },
        backgroundColor && { backgroundColor },
        outlined && {
          backgroundColor: COLORS.background,
          borderWidth: 2,
          borderColor: COLORS.primaryBlue,
        },
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        {iconLeft && renderIcon(iconLeft, colorLeft, 'left')}
        <Text
          style={[
            globalStyles.customButtonText,
            outlined && { color: COLORS.primaryBlue },
            textColor && { color: textColor },
            textSize && { fontSize: textSize },
            expand === 'text' && { flex: 1, textAlign: 'center' },
          ]}
        >
          {title}
        </Text>
        {iconRight && renderIcon(iconRight, colorRight, 'right')}
      </View>
    </TouchableOpacity>
  )
}