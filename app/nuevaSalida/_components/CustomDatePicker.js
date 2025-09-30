import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { COLORS, FONTS } from '../../../styles/globalStyles'

export default function CustomDatePicker({
  label,
  isVisible,
  onDateSelect,
  onToggle,
  onCancel,
}) {
  const [selected, setSelected] = useState('')

  const handleDayPress = (day) => {
    setSelected(day.dateString)
    onDateSelect(day.dateString)
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.input} onPress={onToggle}>
        <Text style={styles.dateText}>{selected || 'Seleccionar fecha'}</Text>
      </TouchableOpacity>

      {isVisible && (
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={
              selected
                ? {
                    [selected]: {
                      selected: true,
                      selectedColor: COLORS.primaryBlue,
                    },
                  }
                : {}
            }
            theme={{
              selectedDayBackgroundColor: COLORS.primaryBlue,
              todayTextColor: COLORS.primaryBlue,
              arrowColor: COLORS.primaryBlue,
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '600',
            }}
          />
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    zIndex: 1000,
  },
  label: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    marginBottom: 5,
    color: COLORS.primaryBlue,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    borderRadius: 6,
    padding: 12,
    backgroundColor: COLORS.background,
    minHeight: 50,
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: COLORS.blackText,
  },
  calendarContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1500,
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    borderRadius: 8,
    padding: 10,
    backgroundColor: COLORS.background,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cancelButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    padding: 8,
  },
  cancelButtonText: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    fontWeight: '500',
  },
})
