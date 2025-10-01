import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { COLORS, FONTS } from '../../../styles/globalStyles'

export default function CustomDatePicker({
  label,
  date,
  isVisible,
  onDateSelect,
  onToggle,
  onCancel,
}) {
  const handleDayPress = (day) => {
    const formatted =
      day.day.toString().padStart(2, '0') +
      '/' +
      day.month.toString().padStart(2, '0') +
      '/' +
      day.year
    onDateSelect(formatted)
  }

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.input} onPress={onToggle}>
        <Text style={styles.dateText}>{date}</Text>
      </TouchableOpacity>

      {isVisible && (
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [date.split('/').reverse().join('-')]: {
                selected: true,
                selectedColor: COLORS.primaryBlue,
              },
            }}
            monthFormat={'MMMM yyyy'}
            firstDay={1}
            theme={{
              selectedDayBackgroundColor: COLORS.primaryBlue,
              todayTextColor: '#ff0000',
              arrowColor: COLORS.primaryBlue,
              textDayFontWeight: '500',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '600',
              textDayHeaderFontSize: 14,
              textDayFontFamily: FONTS.regular,
              textMonthFontFamily: FONTS.bold,
              textDayHeaderFontFamily: FONTS.bold,
            }}
            dayNames={['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']}
            monthNames={[
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre',
            ]}
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
  label: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    marginTop: 10,
    color: COLORS.primaryBlue,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    borderRadius: 6,
    padding: 12,
    marginTop: 5,
    backgroundColor: COLORS.background,
  },
  dateText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: COLORS.blackText,
  },
  calendarContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    borderRadius: 8,
    padding: 10,
    backgroundColor: COLORS.background,
    elevation: 4,
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
