import { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../styles/globalStyles'

/**
 * Custom text input with label.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.label - Input label text.
 * @param {string} props.placeholder - Placeholder text.
 * @param {string} [props.value] - Current input value.
 * @param {(text: string) => void} [props.onChangeText] - Callback for input change.
 * @returns {JSX.Element} Styled input with label.
 */
export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={styles}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          { borderColor: isFocused ? COLORS.primaryBlue : COLORS.greyBorder },
        ]}
        placeholderTextColor={COLORS.greyBorder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    marginTop: 10,
    color: COLORS.primaryBlue,
    marginBottom: 4,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    backgroundColor: COLORS.background,
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.sm,
    color: COLORS.blackText,
  },
})
