import React, { useState } from 'react'
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
  // Estado para controlar la apertura del dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const incrementDays = () => onDaysChange(expirationDays + 1)
  const decrementDays = () => {
    if (expirationDays > 1) onDaysChange(expirationDays - 1)
  }

  return (
    <View style={styles.container}>
      {/* Toggle principal */}
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

      {/* Si tiene caducidad, muestra controles */}
      {hasExpirationDate && (
        <View style={styles.innerSection}>
          <Text style={styles.subLabel}>Tiempo estimado de caducidad</Text>

          <View style={styles.controlsRow}>
            {/* Contador de días */}
            <View style={styles.counterContainer}>
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

              <Text style={styles.counterValue}>{expirationDays}</Text>

              <TouchableOpacity
                style={styles.counterButton}
                onPress={incrementDays}
              >
                <Ionicons name="add" size={20} color={COLORS.primaryBlue} />
              </TouchableOpacity>
            </View>

            {/* Dropdown de unidad de tiempo */}
            <View style={styles.dropdownWrapper}>
              <CustomDropdown
                value={timeUnit}
                placeholder="Días"
                options={timeUnitOptions}
                onSelect={onTimeUnitChange}
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
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
    width: '100%',
    marginTop: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleLabel: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.sm,
    color: COLORS.primaryBlue,
    flex: 1,
    marginRight: 10,
  },
  innerSection: {
    marginTop: 8,
  },
  subLabel: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.sm,
    color: COLORS.greyText,
    marginBottom: 8,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    height: 48,
  },
  counterButton: {
    paddingHorizontal: 6,
  },
  counterValue: {
    fontSize: FONTS.size.lg,
    color: COLORS.blackText,
    textAlign: 'center',
    minWidth: 30,
  },
  dropdownWrapper: {
    flex: 1,
    position: 'relative',
    overflow: 'visible',
  },
})
