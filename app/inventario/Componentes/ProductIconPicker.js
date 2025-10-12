import { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import { COLORS } from '../../../styles/globalStyles'

export default function ProductIconPicker({ selectedIcon, onIconSelect }) {
  // Base de emojis (último es "+")
  const BASE_ICONS = [
    '🍎',
    '🥩',
    '🥛',
    '🥬',
    '🍞',
    '📦',
    '🥫',
    '🥑',
    '🌽',
    '➕',
  ]
  const [icons, setIcons] = useState(BASE_ICONS)
  /* eslint-disable-next-line */
  const [customEmoji, setCustomEmoji] = useState(null)

  const handleAddCustomIcon = () => {
    Alert.prompt(
      'Elige un emoji',
      'Escribe o pega un emoji para usar como ícono del producto:',
      (text) => {
        if (text && text.trim().length > 0) {
          const emoji = text.trim().slice(0, 2)
          setCustomEmoji(emoji)

          const updated = [...BASE_ICONS]
          updated[updated.length - 2] = emoji
          setIcons(updated)

          onIconSelect(emoji)
        }
      },
      'plain-text',
      '',
      'default'
    )
  }

  // Dividimos los íconos en 2 filas de 5
  const rows = [icons.slice(0, 5), icons.slice(5)]

  return (
    <View style={styles.container}>
      <View style={styles.iconGrid}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.iconRow}>
            {row.map((icon, iconIndex) => (
              <TouchableOpacity
                key={`${rowIndex}-${iconIndex}`}
                style={[
                  styles.iconButton,
                  selectedIcon === icon && styles.iconButtonSelected,
                ]}
                onPress={() =>
                  icon === '➕' ? handleAddCustomIcon() : onIconSelect(icon)
                }
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconGrid: {
    alignItems: 'center',
    gap: 10,
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
    fontSize: 22,
  },
})
