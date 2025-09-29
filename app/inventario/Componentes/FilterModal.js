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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#00568F',
    marginBottom: 16,
    textAlign: 'center',
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
    borderColor: '#00568F',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#00568F',
  },
  optionText: {
    fontSize: 14,
    color: '#000000',
    flex: 1,
  },
})

export default function FilterModal({ visible, onClose, title, options }) {
  const [selectedOptions, setSelectedOptions] = useState(
    options.reduce((acc, option) => {
      acc[option] = false
      return acc
    }, {})
  )

  const toggleOption = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }))
  }

  const renderCheckbox = (isSelected) => (
    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
      {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
    </View>
  )

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
