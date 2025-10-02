import { StyleSheet } from 'react-native'

export const COLORS = {
  primaryGreen: '#95C416',
  primaryGreen15: 'rgba(149, 196, 22, .15)',
  primaryBlue: '#00568F',
  primaryBlue15: 'rgba(0, 86, 143, .15)',
  brownAccent: '#824917',
  brownAccent15: 'rgba(130, 73, 23, .15)',
  yellowAccent: '#FFBF00',
  yellowAccent15: 'rgba(255, 191, 0, .15)',
  background: '#FBFBFB',
  greyBorder: '#D3D3D3',
  cardBackgroundOne: '#E6E6E7',
  cardBackgroundTwo: '#C6C7C7',
  blackText: '#000000',
  whiteText: '#E6E6E7',
  greyText: '#7d7d7dff',
  error: '#991B1B',
  errorAccent: '#B91C1C',
  testing: '#444',
}
export const SIZE = {
  xxs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
}

export const FONTS = {
  regular: 'Roboto-Regular',
  bold: 'Roboto-Bold',
  italic: 'Roboto-Italic',
  light: 'Roboto-Light',
  size: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
  },
}

export const globalStyles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.background,
    width: '100%',
    height: '100%',
    padding: '10',
    fontFamily: FONTS.regular,
  },
  authContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerView: {
    padding: 100,
    display: 'flex',
    flexDirection: 'row',
    rowGap: 16,
  },
  h1: {
    maxWidth: '332',
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.xxxl,
  },
  h2: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.xl,
  },
  h3: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.lg,
  },
  h4: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
  },
  subtitle: {
    fontSize: FONTS.size.lg,
  },
  caption: {
    fontFamily: FONTS.italic,
    fontSize: FONTS.size.sm,
  },
  customButton: {
    flex: 1,
    maxHeight: 48,
    backgroundColor: COLORS.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  customButtonText: {
    color: COLORS.whiteText,
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },

  customActionButton: {
    width: '100%',
    maxWidth: 332,
    height: 48,
    backgroundColor: COLORS.cardBackgroundOne,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  customActionButtonText: {
    color: COLORS.blackText,
    fontSize: 16,
  },
})
