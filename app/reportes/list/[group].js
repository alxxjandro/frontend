import { useEffect, useMemo, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomIcon from '../../../components/customIcon'
import CustomDropdown from '../../../components/CustomDropdown'
import { globalStyles, COLORS, FONTS } from '../../../styles/globalStyles'
import { useLogs } from '../../../hooks/useLogs'
import Spinner from '../../../components/Spinner'

const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

const MONTH_TO_NUMBER = {
  enero: 1,
  febrero: 2,
  marzo: 3,
  abril: 4,
  mayo: 5,
  junio: 6,
  julio: 7,
  agosto: 8,
  septiembre: 9,
  octubre: 10,
  noviembre: 11,
  diciembre: 12,
}

export default function Group() {
  const router = useRouter()
  const { group } = useLocalSearchParams()
  const { fetchReportesByDate } = useLogs()

  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [reportType, setReportType] = useState('Todos')
  const [sortOrder, setSortOrder] = useState('Más reciente')
  const [isTypeOpen, setIsTypeOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  const reportTypeOptions = ['Todos', 'Entrada', 'Salida']
  const sortOptions = ['Más reciente', 'Más antiguo']
  const [year, rawMonth] = group ? group.split('-') : []

  const monthName =
    MONTH_NAMES.find((m) => m.toLowerCase() === rawMonth?.toLowerCase()) ||
    rawMonth

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true)
        setError(null)

        let monthNumber = parseInt(rawMonth)
        if (isNaN(monthNumber)) {
          monthNumber = MONTH_TO_NUMBER[rawMonth?.toLowerCase()?.trim()]
        }

        if (!monthNumber) {
          throw new Error(`Mes inválido o no reconocido: ${rawMonth}`)
        }

        const res = await fetchReportesByDate(year, monthNumber)

        let fetchedReports = []

        if (res?.success) {
          if (Array.isArray(res.data)) {
            fetchedReports = res.data
          } else if (Array.isArray(res?.data?.reportes)) {
            fetchedReports = res.data.reportes
          } else if (Array.isArray(res?.data?.data)) {
            fetchedReports = res.data.data
          }
        }

        if (!Array.isArray(fetchedReports) || fetchedReports.length === 0) {
          console.warn('No se encontraron reportes válidos en la respuesta.')
        }

        setReports(
          fetchedReports.map((r) => ({
            ...r,
            tipo: r.tipo?.toLowerCase() || 'desconocido',
          }))
        )
      } catch (err) {
        console.error('Error cargando reportes:', err)
        setReports([])
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (year && rawMonth) {
      loadReports()
    }
  }, [year, rawMonth])

  const filteredReports = useMemo(() => {
    if (reportType === 'Todos') return reports
    return reports.filter(
      (r) => r.tipo?.toLowerCase() === reportType.toLowerCase()
    )
  }, [reports, reportType])

  const groupedReports = useMemo(() => {
    const map = {}

    filteredReports.forEach((r) => {
      const date = new Date(r.fecha)
      const day = date.getUTCDate()

      if (!map[day]) map[day] = []
      map[day].push(r)
    })

    const sortedDays = Object.entries(map)
      .map(([day, reports]) => ({ day, reports }))
      .sort((a, b) =>
        sortOrder === 'Más reciente' ? b.day - a.day : a.day - b.day
      )

    return sortedDays
  }, [filteredReports, sortOrder])

  const handleReportPress = (report) => {
    const fecha = new Date(report.fecha)

    const year = fecha.getUTCFullYear()
    const month = fecha.getUTCMonth() + 1
    const day = fecha.getUTCDate()

    router.push({
      pathname: '/reportes/detalle',
      params: {
        id: report.id,
        name: report.titulo,
        year,
        month,
        day,
        tipo: report.tipo,
      },
    })
  }

  const handleOutsidePress = () => {
    Keyboard.dismiss()
    setIsTypeOpen(false)
    setIsSortOpen(false)
  }

  return (
    <SafeAreaView style={globalStyles.body}>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <Text style={globalStyles.h1}>
                  {monthName} {year}
                </Text>
                <Text style={styles.countText}>
                  ({groupedReports.length} días con reportes)
                </Text>
              </View>
              <CustomIcon
                name="chevron-back"
                size={44}
                iconColor={COLORS.blackText}
                bgColor={COLORS.background}
                onPress={() => router.navigate('/reportes')}
              />
            </View>

            <View style={styles.filterContainer}>
              <CustomDropdown
                label="Tipo de reporte"
                options={reportTypeOptions}
                value={reportType}
                onSelect={(val) => {
                  setReportType(val)
                  setIsTypeOpen(false)
                }}
                isOpen={isTypeOpen}
                setIsOpen={(val) => {
                  setIsTypeOpen(val)
                  if (val) setIsSortOpen(false)
                }}
                bgColor={COLORS.primaryBlue}
                borderColor={COLORS.primaryBlue}
                textColor={COLORS.whiteText}
              />
              <CustomDropdown
                label="Ordenar por"
                options={sortOptions}
                value={sortOrder}
                onSelect={(val) => {
                  setSortOrder(val)
                  setIsSortOpen(false)
                }}
                isOpen={isSortOpen}
                setIsOpen={(val) => {
                  setIsSortOpen(val)
                  if (val) setIsTypeOpen(false)
                }}
                bgColor={COLORS.primaryBlue}
                borderColor={COLORS.primaryBlue}
                textColor={COLORS.whiteText}
              />
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: 80,
            }}
            showsVerticalScrollIndicator={false}
          >
            {loading ? (
              <Text style={styles.emptyText}>Cargando reportes...</Text>
            ) : error ? (
              <Text style={[styles.emptyText, { color: 'red' }]}>{error}</Text>
            ) : groupedReports.length === 0 ? (
              <Text style={styles.emptyText}>
                No hay reportes disponibles para este mes.
              </Text>
            ) : (
              groupedReports.map(({ day, reports }) => (
                <View key={day} style={styles.daySection}>
                  <Text style={styles.sectionHeader}>
                    {day} de {monthName} de {year}
                  </Text>

                  {reports.map((r, index) => (
                    <TouchableOpacity
                      key={`${r.titulo}-${index}`}
                      style={[
                        styles.reportCard,
                        index % 2 === 0
                          ? styles.cardVariant1
                          : styles.cardVariant2,
                      ]}
                      onPress={() => handleReportPress(r)}
                    >
                      <View>
                        <Text style={styles.reportTitle}>
                          {r.tipo === 'entrada'
                            ? 'Reporte de entrada'
                            : 'Reporte de salida'}
                        </Text>
                        <Text style={styles.reportDate}>
                          {new Date(r.fecha).toLocaleDateString('es-MX')}
                        </Text>
                      </View>
                      <CustomIcon
                        name="chevron-forward"
                        size={28}
                        iconColor={COLORS.blackText}
                        bgColor={COLORS.transparent}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
      <Spinner isVisible={loading} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 332,
    marginBottom: 8,
    paddingTop: 10,
  },
  header: { flex: 1 },
  countText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.sm,
    color: COLORS.greyText,
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginVertical: 12,
    width: 332,
  },
  daySection: { width: 332, marginTop: 16 },
  sectionHeader: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.lg,
    color: COLORS.primaryBlue,
    marginBottom: 8,
  },
  reportCard: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardVariant1: { backgroundColor: COLORS.cardBackgroundOne },
  cardVariant2: { backgroundColor: COLORS.cardBackgroundTwo },
  reportTitle: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    color: COLORS.blackText,
  },
  reportDate: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.sm,
    color: COLORS.blackText,
    opacity: 0.7,
    marginTop: 2,
  },
  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    textAlign: 'center',
    color: COLORS.greyText,
    marginTop: 40,
  },
})
