import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { inventarioStyles } from '../styles/inventarioStyles'

export default function ProductButton({
  title,
  onPress,
  size = 20,
  color,
  icon,
  styleText,
  product,
  productStyle,
  subtitle
}) {
  return (
    <TouchableOpacity style={[inventarioStyles.buttonProduct, { justifyContent: 'center', alignItems: 'center' }]} onPress={onPress}>
      <View>
        <Text style={[productStyle, { marginBottom: 40 }]}>{product}</Text>
      </View>
      <View style={{ position: 'absolute', bottom: 8, left: 8, right: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <View style={{ flexDirection: 'column' }}>
            <Text style={[styleText]}>{title}</Text>
            <Text style={{ fontSize: 12, color: 'Black' }}>{subtitle}</Text>
        </View>

        {icon && (
          <Ionicons
            name={icon}
            size={size}
            color={color}
            style={{ marginLeft: 4 }}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}