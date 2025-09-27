import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../../../styles/globalStyles'

export default function CustomDropdown({
  label,
  value,
  placeholder = 'Seleccionar',
  options = [],
  isOpen,
  onToggle,
  onSelect,
}) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.dropdown} onPress={onToggle}>
        <Text
          style={[
            styles.dropdownText,
            { color: value ? COLORS.primaryBlue : '#888' },
          ]}
        >
          {value || placeholder}
        </Text>
        <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownList}>
          {options.map((item, index) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.item,
                index === options.length - 1 && styles.lastItem,
              ]}
              onPress={() => onSelect(item)}
            >
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    marginTop: 10,
    color: COLORS.primaryBlue,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    borderRadius: 6,
    padding: 12,
    marginTop: 5,
    backgroundColor: COLORS.background,
  },
  dropdownText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
  },
  arrow: {
    fontSize: FONTS.size.md,
    color: '#555',
    fontFamily: FONTS.regular,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    marginTop: 5,
    borderRadius: 6,
    backgroundColor: COLORS.background,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greyBorder,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: COLORS.blackText,
  },
})
