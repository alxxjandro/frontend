import { StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../../../styles/globalStyles'

export const nuevaSalidaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  fixedBottom: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: COLORS.greyBorder,
    backgroundColor: COLORS.background,
  },
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
  label: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    marginTop: 10,
    color: COLORS.primaryBlue,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.lg,
    marginTop: 20,
    color: COLORS.primaryBlue,
  },
  emptyContainer: {
    backgroundColor: COLORS.cardBackgroundOne,
    borderRadius: 8,
    padding: 40,
    marginTop: 10,
  },
  emptyText: {
    fontFamily: FONTS.italic,
    fontSize: FONTS.size.sm,
    color: '#525252',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: COLORS.primaryBlue,
    padding: 12,
    borderRadius: 6,
    marginTop: 15,
  },
  addButtonText: {
    color: COLORS.whiteText,
    textAlign: 'center',
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: COLORS.greyBorder,
    padding: 12,
    borderRadius: 6,
  },
  registerButtonText: {
    textAlign: 'center',
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    color: COLORS.blackText,
  },
})
