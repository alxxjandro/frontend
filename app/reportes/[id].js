import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { COLORS, FONTS } from '../../styles/globalStyles'
import ScreenHeader from '../../components/screenHeader'
import ReportList from './_components/ReportList'
import { mockReports } from './data/mockData'

const ReporteDetalleScreen = () => {
  const { id, name } = useLocalSearchParams()
  const report = mockReports.find((r) => r.id === id)

  // Limpiar el nombre quitando << y >>
  const cleanName = decodeURIComponent(name).replace(/^(<<|>>)\s*/, '')

  const handleDownloadExcel = () => console.log('Descargar Excel')
  const handleDownloadPDF = () => console.log('Descargar PDF')

  return (
    <View style={styles.container}>
      <ScreenHeader title={cleanName} />
      <ReportList report={report} />

      {/* Botones de descarga debajo de la tabla */}
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleDownloadExcel}
        >
          <Text style={styles.buttonText}>Descargar Excel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={handleDownloadPDF}
        >
          <Text style={styles.buttonText}>Descargar PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.background },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  downloadButton: {
    backgroundColor: COLORS.primaryBlue,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    maxHeight: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: COLORS.whiteText,
  },
})

export default ReporteDetalleScreen
