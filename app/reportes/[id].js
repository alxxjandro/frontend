import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ScreenHeader from '../../components/ScreenHeader'
import CustomButton from '../../components/customButton'
import { globalStyles, COLORS, FONTS } from '../../styles/globalStyles'
import { mockReports } from './data/mockData'

const REPORT_DATA = [
  {
    id: '1',
    cantidad: '54',
    producto: '🍎 Manzana',
    categoria: 'Categoría 1',
    fecha: '19/04/24',
  },
  {
    id: '2',
    cantidad: '45L',
    producto: '🥛 Leche',
    categoria: 'Categoría 2',
    fecha: '11/04/25',
  },
  {
    id: '3',
    cantidad: '76',
    producto: '🥚 Huevo',
    categoria: 'Categoría 1',
    fecha: '05/03/24',
  },
  {
    id: '4',
    cantidad: '12',
    producto: '🍌 Plátano',
    categoria: 'Categoría 1',
    fecha: '21/04/24',
  },
]

export default function ReporteDetalleScreen() {
  const { id, name } = useLocalSearchParams()
  const report = mockReports.find((r) => r.id === id)
  const cleanName = decodeURIComponent(name).replace(/^(<<|>>)\s*/, '')

  const handleDownloadExcel = () => console.log('Descargar Excel')
  const handleDownloadPDF = () => console.log('Descargar PDF')

  const renderTableRow = ({ item, index }) => (
    <View style={[styles.tableRow, index % 2 !== 0 && styles.tableRowAlt]}>
      <Text style={[styles.tableCell, styles.colCantidad]}>
        {item.cantidad}
      </Text>
      <Text style={[styles.tableCell, styles.colProducto]}>
        {item.producto}
      </Text>
      <Text style={[styles.tableCell, styles.colCategoria]}>
        {item.categoria}
      </Text>
      <Text style={[styles.tableCell, styles.colFecha]}>{item.fecha}</Text>
    </View>
  )

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Header */}
            <ScreenHeader
              title={cleanName}
              subtitle="Realizada por Persona"
              showBackButton
              paddingHorizontal={0}
            />

            {/* Scrollable content */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: 'center',
                paddingBottom: 100,
              }}
            >
              {/* Tabla */}
              <View style={styles.table}>
                {/* Encabezado */}
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderCell, styles.colCantidad]}>
                    Cantidad
                  </Text>
                  <Text style={[styles.tableHeaderCell, styles.colProducto]}>
                    Producto
                  </Text>
                  <Text style={[styles.tableHeaderCell, styles.colCategoria]}>
                    Categoría
                  </Text>
                  <Text style={[styles.tableHeaderCell, styles.colFecha]}>
                    Fecha Entrada
                  </Text>
                </View>

                {/* Filas */}
                <FlatList
                  data={REPORT_DATA}
                  renderItem={renderTableRow}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  ListEmptyComponent={
                    <Text style={styles.emptyText}>
                      No hay datos disponibles.
                    </Text>
                  }
                />
              </View>

              {/* Botones */}
              <View style={styles.buttonsContainer}>
                <CustomButton
                  title="Descargar PDF"
                  onPress={handleDownloadPDF}
                  backgroundColor={COLORS.primaryBlue}
                  textColor={COLORS.whiteText}
                />
                <CustomButton
                  title="Descargar Excel"
                  onPress={handleDownloadExcel}
                  backgroundColor={COLORS.primaryBlue}
                  textColor={COLORS.whiteText}
                />
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 332,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  table: {
    width: 332,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#BCD2E0',
    paddingVertical: 10,
  },
  tableHeaderCell: {
    textAlign: 'center',
    color: '#00568F',
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.sm,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#D5E2EB',
    paddingVertical: 12,
  },
  tableRowAlt: {
    backgroundColor: '#BCD2E0',
  },
  tableCell: {
    textAlign: 'center',
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.sm,
    color: COLORS.blackText,
  },

  // 🔹 Proporciones de columnas
  colCantidad: {
    flex: 0.7, // más angosta
  },
  colProducto: {
    flex: 1.3, // más espacio para texto + emoji
  },
  colCategoria: {
    flex: 1,
  },
  colFecha: {
    flex: 1,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontFamily: FONTS.regular,
    color: COLORS.blackText,
  },
})
