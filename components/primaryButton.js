import { TouchableOpacity, Text } from 'react-native'
import { globalStyles, COLORS } from '../styles/globalStyles'

export default function PrimaryButton({ title, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        globalStyles.customButton,
        disabled && { backgroundColor: COLORS.cardBackgroundTwo },
      ]}
    >
      <Text style={globalStyles.customButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}
