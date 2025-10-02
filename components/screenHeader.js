import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONTS, globalStyles } from '../styles/globalStyles'

export default function ScreenHeader({
  title,
  subtitle,
  showBackButton = true,
  onBackPress,
  backIconName = 'chevron-back',
}) {
  const router = useRouter()

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      router.back()
    }
  }

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={[globalStyles.h1, styles.title]}>{title}</Text>
        {subtitle && (
          <Text style={[globalStyles.h2, styles.subtitle]}>{subtitle}</Text>
        )}
      </View>

      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name={backIconName} size={28} color={COLORS.blackText} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: COLORS.blackText,
    marginBottom: 2,
  },
  subtitle: {
    color: '#666',
    fontFamily: FONTS.regular,
    fontWeight: '300',
  },
  backButton: {
    padding: 8,
    marginTop: -4,
  },
})
