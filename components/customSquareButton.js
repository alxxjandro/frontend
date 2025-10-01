import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SIZE, COLORS, FONTS } from '../styles/globalStyles'

export default function CustomFrameButton({
  borderColor = COLORS.primaryGreen,
  backgroundColor = '#ecf3d9',
  icon = 'cube-outline',
  title = 'Hola Mundo',
  subtitle = 'subtexto',
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'column',
        backgroundColor,
        borderWidth: 2,
        borderColor,
        width: 160,
        height: 120,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          width: 41,
          height: 41,
          borderRadius: 41 / 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: borderColor,
          marginTop: 9,
          marginLeft: 7,
          marginBottom: 22,
        }}
      >
        {' '}
        <Ionicons name={icon} size={SIZE.xxl} color={COLORS.whiteText} />{' '}
      </View>

      <View
        style={{
          marginLeft: 11,
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            fontSize: SIZE.md,
            color: COLORS.white,
            fontFamily: FONTS.regular,
            fontWeight: '700',
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: SIZE.xs,
            color: COLORS.white,
            fontFamily: FONTS.regular,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
