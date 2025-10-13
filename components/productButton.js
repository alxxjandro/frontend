import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  emojiContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emoji: {
    marginBottom: 40,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    color: '#000000',
    marginTop: 2,
  },
  icon: {
    marginLeft: 4,
  },
})

export default function ProductButton({
  title,
  subtitle,
  emoji,
  icon,
  size = 20,
  color = '#000000',
  onPress,
  buttonStyle,
  titleStyle,
  emojiStyle,
  subtitleStyle,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, buttonStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.emojiContainer}>
        <Text style={[styles.emoji, emojiStyle]}>{emoji}</Text>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.textContainer}>
          <Text style={titleStyle} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>

        {icon && (
          <Ionicons name={icon} size={size} color={color} style={styles.icon} />
        )}
      </View>
    </TouchableOpacity>
  )
}
