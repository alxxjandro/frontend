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

export const inventarioStyles = StyleSheet.create({
    body: {
        boxSizing: 'border-box',
        backgroundColor: COLORS.background,
        height: '93vh',
        width: '100vw',
    },

  header: {
    flexDirection: "row",
    alignItems: "center", 
    width: "97%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20
 },
  
  searchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    paddingHorizontal: 25,
  },
  
  filtersSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10
  },

  customButton: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  filterButton: {
    width: 120,
    height: 35,
    backgroundColor: COLORS.primaryBlue,
    flex: 1, 
    marginHorizontal: 4,
    alignItems: "center"
  },

  addButton: {
    width: 150,
    height: 41,
    backgroundColor: COLORS.primaryGreen
  },

  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: "center"
  },

  buttonProduct: {
    borderRadius: 12,
    width: 180,
    height: 180,
    backgroundColor:'#E6E6E7' 
  },

  customButtonTextFilter: {
    color: 'white',
    alignItems: "center",
    fontSize: 11,
    marginRight: 8,
    alignItems: "center"
  },
  
  customButtonTextAdd: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8
  },

  customButtonTextEmoji: {
    fontSize: 50,
    marginEnd: 8
  },
  
  buttonGrid: {
    flexDirection: "row", 
    flexWrap: "wrap",     
    justifyContent: "space-between", 
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 25, 
    paddingTop: 10
  }
})
