import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalStyles'

export default function CustomButton({
  title,
  onPress,
  size = 20,
  color = '#fff',
  icon,
}) {
  return (
    <TouchableOpacity style={globalStyles.customButton} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon && (
          <Ionicons
            name={icon}
            size={size}
            color={color}
            style={{ marginRight: 8 }}
          />
        )}
        <Text style={globalStyles.customButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}