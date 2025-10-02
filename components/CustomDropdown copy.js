import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONTS } from '../styles/globalStyles'

/**
 * Custom dropdown with label and selectable options.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.label - Dropdown label text.
 * @param {string[]} props.options - Array of string options.
 * @param {string} [props.value] - Currently selected option.
 * @param {(value: string) => void} props.onSelect - Callback when an option is selected.
 * @param {boolean} props.isOpen - Whether dropdown is visible.
 * @param {(boolean) => void} props.setIsOpen - Function to toggle dropdown state.
 * @returns {JSX.Element} Styled dropdown with label and menu.
 */
export default function CustomDropdown({
  label,
  options,
  value,
  onSelect,
  isOpen,
  setIsOpen,
}) {
  const handleSelect = (option) => {
    onSelect(option)
    setIsOpen(false)
  }

  const borderColor = isOpen ? COLORS.primaryBlue : COLORS.greyBorder
  const chevronColor = borderColor

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        style={[styles.input, { borderColor }]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text
          style={{
            flex: 1,
            color: value ? COLORS.blackText : COLORS.greyBorder,
            fontFamily: FONTS.regular,
            fontSize: FONTS.size.sm,
          }}
        >
          {value || 'Selecciona una opción'}
        </Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={chevronColor}
        />
      </Pressable>

      {isOpen && (
        <View style={styles.dropdown}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Pressable
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    zIndex: 10,
  },
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
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {
    position: 'absolute',
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    top: 72,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: COLORS.primaryBlue,
    borderRadius: 6,
    marginTop: 4,
    backgroundColor: COLORS.background,
    maxHeight: 150,
    zIndex: 20,
  },
  option: {
    padding: 12,
  },
  optionText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.sm,
    color: COLORS.blackText,
  },
})
