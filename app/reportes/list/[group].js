import { useMemo, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SectionList,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ScreenHeader from '../../../components/screenHeader'
import CustomDropdown from '../../../components/CustomDropdown'
import { globalStyles, COLORS, FONTS } from '../../../styles/globalStyles'
import { mockReports } from '../data/mockData'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

// Month names in Spanish
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

/**
 * Group reports screen showing daily reports for a specific month
 * @returns {JSX.Element} Group component
 */
const Group = () => {
  const router = useRouter()
  const { group } = useLocalSearchParams() // e.g. "2023-01"
  const [reportType, setReportType] = useState(null)
  const [sortOrder, setSortOrder] = useState(null)

  const reportTypeOptions = ['Entrada', 'Salida']
  const sortOptions = ['Más reciente', 'Más antiguo']

  // Get month name for title
  const groupTitle = useMemo(() => {
    if (!group) return 'Reportes'
    const [year, month] = group.split('-')
    const monthIndex = parseInt(month, 10) - 1
    return `${MONTH_NAMES[monthIndex]} ${year}`
  }, [group])

  // Filter reports to show only daily reports for this month
  const reportsToShow = useMemo(() => {
    if (!group) return []
    const [year, month] = group.split('-')
    return mockReports.filter((r) => {
      if (!r.date) return false
      const date = new Date(r.date)
      return (
        r.type === 'diario' &&
        date.getFullYear().toString() === year &&
        String(date.getMonth() + 1).padStart(2, '0') === month
      )
    })
  }, [group])

  /**
   * Handle navigation to specific report
   * @param {Object} report - Report object to navigate to
   */
  const handleReportPress = (report) => {
    router.push(
      `/reportes/${report.id}?name=${encodeURIComponent(report.name)}`
    )
  }

  // Group reports by year
  const groupedData = reportsToShow.reduce((acc, report) => {
    const reportDate = new Date(report.date)
    const year = reportDate.getFullYear().toString()
    const existingGroup = acc.find((g) => g.title === year)
    if (existingGroup) {
      existingGroup.data.push(report)
    } else {
      acc.push({ title: year, data: [report] })
    }
    return acc
  }, [])

  /**
   * Render individual report item
   * @param {Object} item - Report item
   * @param {number} index - Item index
   * @returns {JSX.Element} Report item component
   */
  const renderReportItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => handleReportPress(item)}
      style={[styles.reportButton, index % 2 === 0 && styles.reportButtonAlt]}
    >
      <Text style={styles.reportName}>{item.name}</Text>
      <Text style={styles.reportDate}>{item.date}</Text>
    </TouchableOpacity>
  )

  /**
   * Render section header
   * @param {Object} section - Section object with title
   * @returns {JSX.Element} Section header component
   */
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  )

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <View style={styles.container}>
          <ScreenHeader title={groupTitle} />

          <View style={styles.filtersContainer}>
            <CustomDropdown
              label="Tipo de Reporte"
              value={reportType}
              options={reportTypeOptions}
              onSelect={setReportType}
              placeholder="Seleccionar"
            />
            <CustomDropdown
              label="Orden por"
              value={sortOrder}
              options={sortOptions}
              onSelect={setSortOrder}
              placeholder="Seleccionar"
            />
          </View>

          <SectionList
            sections={groupedData}
            keyExtractor={(item) => item.id}
            renderItem={renderReportItem}
            renderSectionHeader={renderSectionHeader}
            style={styles.reportsList}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No hay reportes disponibles para este mes.
              </Text>
            }
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  reportsList: {
    flex: 1,
    marginTop: 10,
  },
  sectionHeader: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.lg,
    color: COLORS.blackText,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  reportButton: {
    backgroundColor: '#C6C7C7',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  reportButtonAlt: {
    backgroundColor: '#E6E6E7',
  },
  reportName: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: COLORS.blackText,
  },
  reportDate: {
    fontFamily: FONTS.light,
    fontSize: FONTS.size.sm,
    color: COLORS.blackText,
  },
  separator: {
    height: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontFamily: FONTS.regular,
    color: COLORS.blackText,
  },
})

export default Group
