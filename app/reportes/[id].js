import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import ScreenHeader from '../../components/screenHeader'
import CustomButton from '../../components/customButton'
import { globalStyles, COLORS, FONTS } from '../../styles/globalStyles'
import { mockReports } from './data/mockData'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

// Mock data for the report details table
const REPORT_DATA = [
  {
    id: '1',
    cantidad: '54',
    producto: '🍎 Manzana',
    categoria: 'Categoria 1',
    fecha: '19/04/24',
  },
]

/**
 * Report detail screen showing specific report data in table format
 * @returns {JSX.Element} ReporteDetalleScreen component
 */
const ReporteDetalleScreen = () => {
  const { id, name } = useLocalSearchParams()
  const report = mockReports.find((r) => r.id === id)

  // Clean the name by removing << and >>
  const cleanName = decodeURIComponent(name).replace(/^(<<|>>)\s*/, '')

  /**
   * Handle Excel download
   */
  const handleDownloadExcel = () => {
    console.log('Descargar Excel')
  }

  /**
   * Handle PDF download
   */
  const handleDownloadPDF = () => {
    console.log('Descargar PDF')
  }

  /**
   * Render table row item
   * @param {Object} item - Row data
   * @param {number} index - Row index
   * @returns {JSX.Element} Table row component
   */
  const renderTableRow = ({ item, index }) => (
    <View style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlt]}>
      <Text style={styles.tableCell}>{item.cantidad}</Text>
      <Text style={styles.tableCell}>{item.producto}</Text>
      <Text style={styles.tableCell}>{item.categoria}</Text>
      <Text style={styles.tableCell}>{item.fecha}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <ScreenHeader title={cleanName} />

      {/* Data Table */}
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Cantidad</Text>
          <Text style={styles.tableHeaderCell}>Producto</Text>
          <Text style={styles.tableHeaderCell}>Categoría</Text>
          <Text style={styles.tableHeaderCell}>Fecha Entrada</Text>
        </View>

        {/* Table Rows */}
        <FlatList
          data={REPORT_DATA}
          renderItem={renderTableRow}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay datos disponibles.</Text>
          }
        />
      </View>

      {/* Download buttons */}
      <View style={styles.buttonsContainer}>
        <CustomButton
          title="Descargar Excel"
          onPress={handleDownloadExcel}
          backgroundColor={COLORS.primaryBlue}
        />
        <CustomButton
          title="Descargar PDF"
          onPress={handleDownloadPDF}
          backgroundColor={COLORS.primaryBlue}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  table: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#BCD2E0',
    paddingVertical: 10,
  },
  tableHeaderCell: {
    flex: 1,
    color: '#00568F',
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.sm,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: '#BCD2E0',
  },
  tableRowAlt: {
    backgroundColor: '#D5E2EB',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.sm,
    color: COLORS.blackText,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontFamily: FONTS.regular,
    color: COLORS.blackText,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    gap: 10,
  },
})

export default ReporteDetalleScreen
