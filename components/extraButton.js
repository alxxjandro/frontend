import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../styles/globalStyles'

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  icon: {
    marginLeft: 4,
  },
})

export default function ExtraButton({
  title,
  onPress,
  icon,
  size = 20,
  color = '#000000',
  style,
  textStyle,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {title && (
          <Text style={[styles.text, textStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
        {icon && (
          <Ionicons name={icon} size={size} color={color} style={styles.icon} />
        )}
      </View>
    </TouchableOpacity>
  )
}
