import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONTS } from '../../../styles/globalStyles'

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 220,
    padding: 20,
    backgroundColor: COLORS.whiteText,
    borderRadius: 12,
    elevation: 5,
    shadowColor: COLORS.blackText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: FONTS.size.md,
    color: COLORS.primaryBlue,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: FONTS.bold,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.primaryBlue,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.primaryBlue,
  },
  optionText: {
    fontSize: FONTS.size.sm,
    color: COLORS.blackText,
    flex: 1,
    fontFamily: FONTS.regular,
  },
})

/**
 * Filter Modal Component - Shows filterable options in a modal overlay
 * @param {boolean} visible - Whether the modal is visible
 * @param {Function} onClose - Callback to close the modal
 * @param {string} title - Modal title
 * @param {Array<string>} options - Array of filter options
 * @returns {JSX.Element} Filter modal component
 */

export default function FilterModal({ visible, onClose, title, options }) {
  const [selectedOptions, setSelectedOptions] = useState(
    options.reduce((acc, option) => {
      acc[option] = false
      return acc
    }, {})
  )

  /**
   * Toggles option selection state
   * @param {string} option - Option to toggle
   */
  const toggleOption = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }))
  }

  /**
   * Renders checkbox component
   * @param {boolean} isSelected - Whether option is selected
   * @returns {JSX.Element} Checkbox component
   */
  const renderCheckbox = (isSelected) => (
    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
      {isSelected && (
        <Ionicons name="checkmark" size={14} color={COLORS.whiteText} />
      )}
    </View>
  )

  /**
   * Renders individual option with checkbox
   * @param {string} option - Option text
   * @returns {JSX.Element} Option component
   */
  const renderOption = (option) => (
    <TouchableOpacity
      key={option}
      style={styles.optionContainer}
      onPress={() => toggleOption(option)}
      activeOpacity={0.7}
    >
      {renderCheckbox(selectedOptions[option])}
      <Text style={styles.optionText}>{option}</Text>
    </TouchableOpacity>
  )

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>{title}</Text>
            {options.map(renderOption)}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  )
}
