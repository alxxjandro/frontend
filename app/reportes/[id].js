import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import ScreenHeader from '../../components/ScreenHeader'
import CustomButton from '../../components/customButton'
import { globalStyles, COLORS, FONTS } from '../../styles/globalStyles'
import { useLogs } from '../../hooks/useLogs'
import { useEffect, useState } from 'react'

export default function ReporteDetalleScreen() {
  const { id, name, year, month, day, tipo } = useLocalSearchParams()
  const { fetchReportesByDetail } = useLogs()

  const [reportData, setReportData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const cleanName = decodeURIComponent(name || '').replace(/^(<<|>>)\s*/, '')

  // Cargar datos desde la base de datos
  useEffect(() => {

    const loadReportDetail = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetchReportesByDetail(year, month, day, tipo)

        let data = []

        if (res?.success) {
          if (Array.isArray(res.data)) {
            data = res.data
          } else if (Array.isArray(res?.data?.data)) {
            data = res.data.data
          }
        }

        setReportData(data)
      } catch (err) {
        console.error('❌ Error cargando detalle del reporte:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (year && month && day && tipo) {
      loadReportDetail()
    } else {
      console.warn('⚠️ Faltan parámetros. No se llama a la BD.')
    }
  }, [year, month, day, tipo])

  const handleDownloadExcel = () => console.log('Descargar Excel')
  const handleDownloadPDF = () => console.log('Descargar PDF')

  // Renderizado de filas 
  const renderTableRow = ({ item, index }) => (
    <View style={[styles.tableRow, index % 2 !== 0 && styles.tableRowAlt]}>
      <Text style={[styles.tableCell, styles.colCantidad]}>
        {item.cantidad ?? '-'}
      </Text>
      <Text style={[styles.tableCell, styles.colProducto]}>
        {item.producto || '-'}
      </Text>
      <Text style={[styles.tableCell, styles.colCategoria]}>
        {item.categoria || '-'}
      </Text>
      <Text style={[styles.tableCell, styles.colFecha]}>
        {item.fechaEntrada
          ? new Date(item.fechaEntrada).toLocaleDateString('es-MX')
          : '-'}
      </Text>
    </View>
  )

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Header */}
            <ScreenHeader
              title={cleanName || 'Detalle del reporte'}   
              subtitle={`Realizado por ...`}
              showBackButton
              paddingHorizontal={0}
            />

            {/* Contenido Scrollable */}
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
                    Fecha entrada
                  </Text>
                </View>

                {/* Estado de carga */}
                {loading ? (
                  <ActivityIndicator
                    size="large"
                    color={COLORS.primaryBlue}
                    style={{ marginVertical: 20 }}
                  />
                ) : error ? (
                  <Text style={[styles.emptyText, { color: 'red' }]}>
                    {error}
                  </Text>
                ) : reportData.length === 0 ? (
                  <Text style={styles.emptyText}>
                    No hay datos disponibles para este reporte.
                  </Text>
                ) : (
                  <FlatList
                    data={reportData}
                    renderItem={renderTableRow}
                    keyExtractor={(item, index) =>
                      `${item.producto || 'item'}-${index}`
                    }
                    scrollEnabled={false}
                  />
                )}
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

  // 🔹 Nuevas columnas
  colCantidad: { flex: 1 },
  colProducto: { flex: 2 },
  colCategoria: { flex: 1.5 },
  colFecha: { flex: 1.5 },

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
