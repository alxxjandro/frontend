import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { COLORS, FONTS } from '../styles/globalStyles'

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
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Campo de selección */}
      <Pressable style={styles.input} onPress={onToggle}>
        <Text
          style={[
            styles.dateText,
            { color: selected ? COLORS.blackText : COLORS.greyText },
          ]}
        >
          {selected || 'Seleccionar fecha'}
        </Text>
      </Pressable>

      {/* Calendario y backdrop */}
      {isVisible && (
        // style={styles.overlay}
        <View  style={[styles.overlay, { backgroundColor: 'red', borderWidth: 2, borderStyle: 'solid' }]}> 
          {/* Backdrop clickeable */}
          <TouchableWithoutFeedback onPress={onCancel}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          {/* Calendario */}
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
            <Pressable onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: -1,
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
    borderColor: COLORS.greyBorder,
    backgroundColor: COLORS.background,
  },
  dateText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    flex: 1,
  },

  /* --- Overlay general --- */
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 10,
  },


  /* --- Contenedor del calendario --- */
  calendarContainer: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 4,
    borderColor: COLORS.greyBorder,
    backgroundColor: COLORS.background,
    zIndex: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    padding: 8,
  },
  cancelButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
    padding: 6,
  },
  cancelButtonText: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    fontWeight: '500',
  },
})
