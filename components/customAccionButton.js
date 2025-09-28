import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalStyles'

export default function CustomActionButton({
  title,
  onPress,
  size = 20,
  color = '#fff',
  iconLeft,
  iconRight,
}) {
  return (
    <TouchableOpacity style={globalStyles.customButton} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {iconLeft && (
          <Ionicons
            name={iconLeft}
            size={size}
            color={color}
            style={{ marginRight: 8 }}
          />
        )}
        <Text style={globalStyles.customButtonText}>{title}</Text>
        {iconRight && (
          <Ionicons
            name={iconRight}
            size={size}
            color={color}
            style={{ marginRight: 8 }}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}
