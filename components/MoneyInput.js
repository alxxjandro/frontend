import { View, Text, TextInput, StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../styles/globalStyles'

export default function MoneyInput({
  label,
  value,
  onChangeText,
  placeholder = 'Ingrese valor',
  showCurrencySymbol = false,
  currencySymbol = '$',
  keyboardType = 'default',
  returnKeyType = 'done',
  numbersOnly = false,
  style,
  ...props
}) {
  const handleTextChange = (text) => {
    if (numbersOnly) {
      // Only allow numbers (including decimals)
      const numericText = text.replace(/[^0-9.]/g, '')
      // Ensure only one decimal point
      const parts = numericText.split('.')
      const formattedText =
        parts.length > 2
          ? parts[0] + '.' + parts.slice(1).join('')
          : numericText
      onChangeText(formattedText)
    } else {
      onChangeText(text)
    }
  }
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {showCurrencySymbol && (
          <Text style={styles.currencySymbol}>{currencySymbol}</Text>
        )}
        <TextInput
          style={[styles.input, showCurrencySymbol && styles.inputWithSymbol]}
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor="#888"
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          {...props}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    marginBottom: 5,
    color: COLORS.primaryBlue,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.greyBorder,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: COLORS.background,
    minHeight: 50,
  },
  currencySymbol: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    color: COLORS.primaryBlue,
    paddingLeft: 15,
    paddingRight: 5,
  },
  input: {
    flex: 1,
    padding: 15,
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: COLORS.primaryBlue,
  },
  inputWithSymbol: {
    paddingLeft: 5,
  },
})
