import { StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../../../styles/globalStyles'

export const reportesStyles = StyleSheet.create({

  //Esto es para ReportList
  table: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#BCD2E0',
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    color: '#00568F',
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.sm,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: '#BCD2E0',
  },
  rowAlt: {
    backgroundColor: '#D5E2EB',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.sm,
    color: COLORS.blackText,
  },
})

export const customFilterStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionsContainer: {
    position: 'absolute',
    backgroundColor: COLORS.background,
    borderRadius: 8,
    maxHeight: '60%',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greyBorder,
  },
  optionText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: COLORS.blackText,
    textAlign: 'center',
  },
});