import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalStyles'
import { COLORS } from '../styles/globalStyles'

export default function CustomActionButton({
  title,
  onPress,
  size = 20,
  color = '#fff',
  colorR = COLORS.blackText,
  iconLeft,
  iconRight,
}) {
  return (
    <TouchableOpacity style={globalStyles.customActionButton} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {iconLeft && (
          <View className="iconRight">
            <Ionicons
              name={iconLeft}
              size={size}
              color={color}
              style={{ marginRight: 8 }}
            />
          </View>
        )}
        <Text style={globalStyles.customActionButtonText}>{title}</Text>

        {iconRight && (
          <View
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'end',
            }}
          >
            <Ionicons
              name={iconRight}
              size={size}
              color={colorR}
              style={{ marginRight: 8 }}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

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
    <TouchableOpacity style={globalStyles.customActionButton} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {iconLeft && (
          <View className="iconRight">
            <Ionicons
              name={iconLeft}
              size={size}
              color={color}
              style={{ marginRight: 8 }}
            />
          </View>
        )}
        <Text style={globalStyles.customActionButtonText}>{title}</Text>

        {iconRight && (
          <View
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'end',
            }}
          >
            <Ionicons
              name={iconRight}
              size={size}
              color={color}
              style={{ marginRight: 8 }}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}
