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
  const [userName, setUserName] = useState('Desconocido')

  const cleanName = decodeURIComponent(name || '').replace(/^(<<|>>)\s*/, '')

  // Cargar datos desde la base de datos
  useEffect(() => {
    const loadReportDetail = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetchReportesByDetail(year, month, day, tipo)

        let data = []
        let usuario = null

        if (res?.success) {
          // Backend returns { success: true, data: [...] } with flat structure
          if (Array.isArray(res.data)) {
            data = res.data

            // Try to get usuario from different possible locations
            usuario =
              res.usuario || // Top level
              res.data[0]?.usuario || // First item
              res.data[0]?.entrada?.usuario // Nested in entrada
          } else if (res.data?.productos && Array.isArray(res.data.productos)) {
            data = res.data.productos
            usuario = res.data.usuario || res.usuario
          } else if (typeof res.data === 'object' && res.data !== null) {
            // If data is a single object, wrap it in array
            data = [res.data]
            usuario = res.data.usuario || res.usuario
          } else {
            console.warn('⚠️ [ReportDetail] Unknown data structure:', res.data)
          }
        } else {
          console.error('❌ [ReportDetail] Response not successful:', res)
        }

        setReportData(data)

        // Set user name for subtitle
        if (usuario) {
          const fullName =
            `${usuario.nombreUsuario || ''} ${usuario.apellidoPaterno || ''}`.trim()
          setUserName(fullName || 'Desconocido')
        } else {
          setUserName('Desconocido')
        }
      } catch (err) {
        console.error(
          '❌ [ReportDetail] Error cargando detalle del reporte:',
          err
        )
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
  const renderTableRow = ({ item, index }) => {
    // Handle flat structure from backend
    // Backend returns: { cantidad, producto, categoria, fechaEntrada }
    const cantidad = item.cantidad ?? item.entradaProducto?.cantidad ?? '-'

    // For flat structure: producto is a string
    // For nested structure: producto.nombreProducto
    const nombreProducto =
      typeof item.producto === 'string'
        ? item.producto
        : item.producto?.nombreProducto ||
          item.entradaProducto?.producto?.nombreProducto ||
          '-'

    // For flat structure: categoria is a string
    // For nested structure: producto.departamento.nombreDepartamento
    const nombreDepartamento =
      typeof item.categoria === 'string'
        ? item.categoria
        : item.producto?.departamento?.nombreDepartamento ||
          item.entradaProducto?.producto?.departamento?.nombreDepartamento ||
          item.categoria ||
          '-'

    // Unit might be in item.unidad or nested
    const unidad =
      item.unidad?.unidad ||
      item.entradaProducto?.unidad?.unidad ||
      item.unidad ||
      ''

    // For reports, the date should be the report date itself (when the entrada/salida was created)
    // Not the expiration date or any other date
    const fecha = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`

    // Format quantity with unit
    const cantidadConUnidad = unidad ? `${cantidad} ${unidad}` : cantidad

    return (
      <View style={[styles.tableRow, index % 2 !== 0 && styles.tableRowAlt]}>
        <Text style={[styles.tableCell, styles.colCantidad]}>
          {cantidadConUnidad}
        </Text>
        <Text style={[styles.tableCell, styles.colProducto]}>
          {nombreProducto}
        </Text>
        <Text style={[styles.tableCell, styles.colCategoria]}>
          {nombreDepartamento}
        </Text>
        <Text style={[styles.tableCell, styles.colFecha]}>{fecha}</Text>
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Header */}
            <ScreenHeader
              title={cleanName || 'Detalle del reporte'}
              subtitle={`Realizado por ${userName}`}
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
                    {tipo === 'entrada' ? 'Fecha entrada' : 'Fecha salida'}
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
