import { useMemo, useState } from 'react'
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
import { mockReports } from '../data/mockData'

// Meses en español
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

export default function Group() {
  const router = useRouter()
  const { group } = useLocalSearchParams() // ej: "2023-01"

  // Estados de los filtros
  const [reportType, setReportType] = useState('Todos')
  const [sortOrder, setSortOrder] = useState('Más reciente')
  const [isTypeOpen, setIsTypeOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  const reportTypeOptions = ['Todos', 'Entrada', 'Salida']
  const sortOptions = ['Más reciente', 'Más antiguo']

  const [year, month] = group ? group.split('-') : []
  const monthName = MONTH_NAMES[parseInt(month, 10) - 1]

  // Filtrar reportes diarios del mes
  const filteredReports = useMemo(() => {
    if (!group) return []
    return mockReports.filter((r) => {
      if (r.type !== 'diario') return false
      const d = new Date(r.date)
      const sameMonth =
        d.getFullYear().toString() === year &&
        String(d.getMonth() + 1).padStart(2, '0') === month
      const matchesType =
        reportType === 'Todos' || r.subtype === reportType.toLowerCase()
      return sameMonth && matchesType
    })
  }, [group, reportType])

  // Agrupar por día
  const groupedReports = useMemo(() => {
    const map = {}
    filteredReports.forEach((r) => {
      const day = new Date(r.date).getDate()
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
    router.push(
      `/reportes/${report.id}?name=${encodeURIComponent(report.name)}`
    )
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
          {/* HEADER + FILTROS (NO SCROLLEAN) */}
          <View style={{ alignItems: 'center' }}>
            {/* Header */}
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

            {/* Filtros */}
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

          {/* LISTA SCROLLEABLE */}
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: 80,
            }}
            showsVerticalScrollIndicator={false}
          >
            {groupedReports.map(({ day, reports }) => (
              <View key={day} style={styles.daySection}>
                <Text style={styles.sectionHeader}>
                  {day} de {monthName} del {year}
                </Text>

                {reports.map((r, index) => (
                  <TouchableOpacity
                    key={r.id}
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
                        {r.subtype === 'entrada'
                          ? 'Reporte de entrada'
                          : 'Reporte de salida'}
                      </Text>
                      <Text style={styles.reportDate}>
                        {new Date(r.date).toLocaleDateString('es-MX')}
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
            ))}

            {groupedReports.length === 0 && (
              <Text style={styles.emptyText}>
                No hay reportes disponibles para este mes.
              </Text>
            )}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
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
