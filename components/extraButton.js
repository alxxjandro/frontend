import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { inventarioStyles } from '../styles/inventarioStyles'

export default function ExtraButton({
  title,
  onPress,
  size,
  color,
  icon,
  marginLeft,
  style,
  styleText,
  product,
  productStyle
}) {
  return (
    <TouchableOpacity style={[inventarioStyles.customButton, style]} onPress={onPress}>
      <View>
        <Text style={[productStyle]}>{product}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styleText]}>{title}</Text>
        {icon && (
          <Ionicons
            name={icon}
            size={size}
            color={color}
            style={{ marginLeft }}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}