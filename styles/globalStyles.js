import { StyleSheet } from 'react-native'

export const COLORS = {
  primaryGreen: '#95C416',
  primaryBlue: '#00568F',
  background: '#FBFBFB',
  greyBorder: '#D3D3D3',
  cardBackgroundOne: '#E6E6E7',
  cardBackgroundTwo: '#C6C7C7',
  blackText: '#000000',
  whiteText: '#E6E6E7',
  error: '#991B1B',
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
  },
}

export const globalStyles = StyleSheet.create({
  body: {
    boxSizing: 'border-box',
    backgroundColor: COLORS.background,
    height: '100vh',
    width: '100vw',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.xxl,
  },
  h2: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.xl,
  },
  h3: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.lg,
  },
  caption: {
    fontFamily: FONTS.italic,
    fontSize: FONTS.size.sm,
  },
  customButton: {
    width: '100%',
    maxWidth: 332,
    height: 48,
    backgroundColor: COLORS.primaryBlue,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  customButtonText: {
    color: COLORS.whiteText,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
