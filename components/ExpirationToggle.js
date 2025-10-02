import React from 'react'
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONTS } from '../styles/globalStyles'
import CustomDropdown from './CustomDropdown'

export default function ExpirationToggle({
  hasExpirationDate,
  onToggleChange,
  expirationDays,
  onDaysChange,
  timeUnit,
  onTimeUnitChange,
  timeUnitOptions = ['Días', 'Semanas', 'Meses'],
}) {
  const incrementDays = () => {
    onDaysChange(expirationDays + 1)
  }

  const decrementDays = () => {
    if (expirationDays > 1) {
      onDaysChange(expirationDays - 1)
    }
  }

  return (
    <View style={styles.container}>
      {/* Toggle Switch */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>
          Este producto tiene fecha de caducidad
        </Text>
        <Switch
          value={hasExpirationDate}
          onValueChange={onToggleChange}
          trackColor={{
            false: COLORS.greyBorder,
            true: COLORS.primaryBlue,
          }}
          thumbColor={COLORS.background}
        />
      </View>

      {/* Expiration Controls */}
      {hasExpirationDate && (
        <View style={styles.expirationSection}>
          <Text style={styles.expirationLabel}>
            Tiempo estimado de caducidad
          </Text>
          <View style={styles.expirationControls}>
            <View style={styles.dayCounter}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={decrementDays}
                disabled={expirationDays <= 1}
              >
                <Ionicons
                  name="remove"
                  size={20}
                  color={
                    expirationDays <= 1 ? COLORS.greyBorder : COLORS.primaryBlue
                  }
                />
              </TouchableOpacity>
              <Text style={styles.dayText}>{expirationDays}</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={incrementDays}
              >
                <Ionicons name="add" size={20} color={COLORS.primaryBlue} />
              </TouchableOpacity>
            </View>
            <View style={styles.timeUnitDropdown}>
              <CustomDropdown
                value={timeUnit}
                placeholder="Días"
                options={timeUnitOptions}
                onSelect={onTimeUnitChange}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    zIndex: 1000,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleLabel: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    color: COLORS.primaryBlue,
    flex: 1,
    marginRight: 16,
  },
  expirationSection: {
    marginTop: 16,
  },
  expirationLabel: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.sm,
    color: '#666',
    marginBottom: 12,
  },
  expirationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dayCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.background,
  },
  counterButton: {
    padding: 8,
  },
  dayText: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.lg,
    color: COLORS.blackText,
    marginHorizontal: 16,
    minWidth: 30,
    textAlign: 'center',
  },
  timeUnitDropdown: {
    flex: 1,
  },
})
