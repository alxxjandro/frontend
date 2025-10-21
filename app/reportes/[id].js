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
import Spinner from '../../components/Spinner'

export default function ReporteDetalleScreen() {
  const { id, name, year, month, day, tipo } = useLocalSearchParams()
  const { fetchReportesByDetail } = useLogs()

  const [reportData, setReportData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userName, setUserName] = useState('Desconocido')

  const cleanName = decodeURIComponent(name || '').replace(/^(<<|>>)\s*/, '')

  useEffect(() => {
    const loadReportDetail = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetchReportesByDetail(year, month, day, tipo)

        let data = []
        let usuario = null

        if (res?.success) {
          if (Array.isArray(res.data)) {
            data = res.data

            usuario =
              res.usuario ||
              res.data[0]?.usuario ||
              res.data[0]?.entrada?.usuario
          } else if (res.data?.productos && Array.isArray(res.data.productos)) {
            data = res.data.productos
            usuario = res.data.usuario || res.usuario
          } else if (typeof res.data === 'object' && res.data !== null) {
            data = [res.data]
            usuario = res.data.usuario || res.usuario
          } else {
            console.warn('[ReportDetail] Unknown data structure:', res.data)
          }
        } else {
          console.error('[ReportDetail] Response not successful:', res)
        }

        setReportData(data)

        if (usuario) {
          setUserName(usuario.nombreUsuario || 'Desconocido')
        } else {
          setUserName('Desconocido')
        }
      } catch (err) {
        console.error('[ReportDetail] Error cargando detalle del reporte:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (year && month && day && tipo) {
      loadReportDetail()
    } else {
      console.warn('Faltan parámetros. No se llama a la BD.')
    }
  }, [year, month, day, tipo])

  const handleDownloadExcel = () => console.log('Descargar Excel')
  const handleDownloadPDF = () => console.log('Descargar PDF')

  const renderTableRow = ({ item, index }) => {
    const cantidad = item.cantidad ?? item.entradaProducto?.cantidad ?? '-'
    const nombreProducto =
      typeof item.producto === 'string'
        ? item.producto
        : item.producto?.nombreProducto ||
          item.entradaProducto?.producto?.nombreProducto ||
          '-'

    const nombreDepartamento =
      typeof item.categoria === 'string'
        ? item.categoria
        : item.producto?.departamento?.nombreDepartamento ||
          item.entradaProducto?.producto?.departamento?.nombreDepartamento ||
          item.categoria ||
          '-'

    const unidad =
      item.unidad?.unidad ||
      item.entradaProducto?.unidad?.unidad ||
      item.unidad ||
      ''

    const fecha = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
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
            <ScreenHeader
              title={cleanName || 'Detalle del reporte'}
              subtitle={`Realizado por ${userName}`}
              showBackButton
              paddingHorizontal={0}
            />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: 'center',
                paddingBottom: 100,
              }}
            >
              <View style={styles.table}>
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

              <View style={styles.buttonsContainer}>
                <CustomButton
                  title="Descargar PDF"
                  onPress={handleDownloadPDF}
                  backgroundColor={COLORS.primaryBlue}
                  textColor={COLORS.whiteText}
                  borderRadius={8}
                />
                <CustomButton
                  title="Descargar Excel"
                  onPress={handleDownloadExcel}
                  backgroundColor={COLORS.primaryBlue}
                  textColor={COLORS.whiteText}
                  borderRadius={8}
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
