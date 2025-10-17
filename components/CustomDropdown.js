import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONTS } from '../styles/globalStyles'

export default function CustomDropdown({
  label,
  options,
  value,
  onSelect,
  isOpen,
  setIsOpen,
  bgColor = COLORS.background,
  borderColor = COLORS.greyBorder,
  textColor = COLORS.blackText,
  textAlign = 'left',
}) {
  const handleSelect = (option) => {
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <View style={[styles.wrapper, { zIndex: isOpen ? 9999 : 1 }]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Pressable
        style={[
          styles.input,
          {
            borderColor,
            backgroundColor: bgColor,
          },
        ]}
        onPress={() => setIsOpen && setIsOpen(!isOpen)}
      >
        <Text
          style={{
            flex: 1,
            color: value ? textColor : COLORS.greyText,
            fontFamily: FONTS.regular,
            fontSize: FONTS.size.md,
            textAlign,
          }}
          numberOfLines={1}
        >
          {value || 'Seleccionar...'}
        </Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={textColor}
          style={{ marginLeft: 8 }}
        />
      </Pressable>

      {isOpen && (
        <View
          style={[
            styles.dropdown,
            {
              borderColor,
              backgroundColor: bgColor,
            },
          ]}
        >
          <ScrollView
            style={{ maxHeight: 180 }}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {options.map((item, index) => (
              <Pressable
                key={index}
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={[styles.optionText, { color: textColor }]}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    overflow: 'visible',
  },
  label: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    color: COLORS.primaryBlue,
    marginBottom: 4,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 4,
    maxHeight: 150,
    zIndex: -1,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'flex-start',
  },
  optionText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
  },
})
