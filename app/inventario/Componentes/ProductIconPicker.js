import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../../styles/globalStyles'

const PRODUCT_ICONS = [
  ['🍎', '🍌', '🥩', '🥛', '🧀'],
  ['🥬', '📦', '🍅', '🥚', '🐟'],
  ['🥫', '🥑', '🌽', '➕'],
]

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  selectedIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.cardBackgroundOne,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: COLORS.greyBorder,
  },
  selectedIcon: {
    fontSize: 50,
  },
  iconGrid: {
    alignItems: 'center',
    gap: 12,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 6,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.cardBackgroundOne,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconButtonSelected: {
    borderColor: COLORS.primaryBlue,
    backgroundColor: COLORS.background,
  },
  iconText: {
    fontSize: 20,
  },
})

/**
 * Product Icon Picker - Allows users to select an emoji icon for products
 * @param {string} selectedIcon - Currently selected icon
 * @param {Function} onIconSelect - Callback when icon is selected
 * @returns {JSX.Element} Icon picker component
 */
export default function ProductIconPicker({ selectedIcon, onIconSelect }) {
  return (
    <View style={styles.container}>
      <View style={styles.selectedIconContainer}>
        <Text style={styles.selectedIcon}>{selectedIcon}</Text>
      </View>

      <View style={styles.iconGrid}>
        {PRODUCT_ICONS.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.iconRow}>
            {row.map((icon, iconIndex) => (
              <TouchableOpacity
                key={`${rowIndex}-${iconIndex}`}
                style={[
                  styles.iconButton,
                  selectedIcon === icon && styles.iconButtonSelected,
                ]}
                onPress={() => onIconSelect(icon)}
                activeOpacity={0.7}
              >
                <Text style={styles.iconText}>{icon}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}
