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
 * @param {boolean} [props.error] - If true, styles input with error state.
 * @param {boolean} [props.password] - If true, masks input for passwords.
 * @returns {JSX.Element} Styled input with label.
 */
export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
  error = false,
  password = false, // 👈 nueva prop
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [isHidden, setIsHidden] = useState(password)

  return (
    <View>
      <Text style={[styles.label, error && { color: COLORS.error }]}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          {
            borderColor: error
              ? COLORS.error
              : isFocused
                ? COLORS.primaryBlue
                : COLORS.greyBorder,
          },
        ]}
        placeholderTextColor={COLORS.greyBorder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={isHidden} // 👈 activa censura
        autoCapitalize={password ? 'none' : 'sentences'} // 👈 evita mayúsculas si es password
      />
      {/* 
        👇 Si en el futuro quieres un icono para mostrar/ocultar contraseña:
        <TouchableOpacity onPress={() => setIsHidden(!isHidden)} style={styles.icon}>
          <Ionicons
            name={isHidden ? 'eye-off' : 'eye'}
            size={20}
            color={COLORS.greyText}
          />
        </TouchableOpacity>
      */}
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
  errorText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.xs,
    color: COLORS.error,
    marginTop: 4,
  },
  // icon: {
  //   position: 'absolute',
  //   right: 10,
  //   top: 40,
  // },
})
