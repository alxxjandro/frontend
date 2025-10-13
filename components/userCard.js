import { View, Text, StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../styles/globalStyles'
import UserIcon from './userIcon'
import CustomIcon from './customIcon'

/**
 * UserCard component that displays a user profile with name, role, and an action icon.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.name - User's full name (used for initials and display).
 * @param {string} props.role - User's role or description.
 * @param {() => void} [props.onEdit] - Callback fired when the action icon is pressed.
 * @param {string} [props.iconName="create-outline"] - Ionicon name for the action button.
 * @param {string} [props.iconColor=COLORS.primaryGreen] - Color of the action icon.
 * @param {string} [props.bgColor=COLORS.cardBackgroundOne] - Background color for the action icon circle.
 * @returns {JSX.Element} A card layout with user info and an action button.
 */
export default function UserCard({
  name,
  role,
  onEdit,
  iconName = 'create-outline',
  iconColor = COLORS.primaryGreen,
  bgColor = COLORS.cardBackgroundOne,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <UserIcon name={name} size={48} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>
      </View>

      <CustomIcon
        name={iconName}
        iconColor={iconColor}
        bgColor={bgColor}
        onPress={onEdit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    minWidth: 332,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: FONTS.size.xxs,
    backgroundColor: COLORS.background,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: FONTS.size.sm,
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    color: COLORS.blackText,
  },
  role: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.sm,
    color: COLORS.testing,
  },
})
