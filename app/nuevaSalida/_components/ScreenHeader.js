import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { COLORS, FONTS } from '../../../styles/globalStyles'

export default function ScreenHeader({
  title,
  backRoute = '/',
  showBackButton = true,
}) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {showBackButton && (
        <Link href={backRoute} asChild>
          <TouchableOpacity style={styles.backIcon}>
            <Text style={styles.backIconText}>{'<'}</Text>
          </TouchableOpacity>
        </Link>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.xxl,
    color: COLORS.blackText,
  },
  backIcon: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  backIconText: {
    color: COLORS.blackText,
    fontSize: 25,
    fontFamily: FONTS.bold,
  },
})
