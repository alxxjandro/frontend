import { View, TextInput, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
})

export default function SearchBar({
  placeholder = 'Buscar...',
  size = 20,
  color = '#414040',
  icon,
  onChangeText,
  value = '',
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <Ionicons name={icon} size={size} color={color} style={styles.icon} />
      )}
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#737373"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  )
}
