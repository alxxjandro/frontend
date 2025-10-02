import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from 'react-native'
import { useRouter } from 'expo-router'
import ScreenHeader from '../../components/screenHeader'
import CustomDropdown from '../../components/CustomDropdown'
import { globalStyles, COLORS, FONTS } from '../../styles/globalStyles'
import { mockReports } from './data/mockData'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

/**
 * Main reports screen displaying list of available reports
 * @returns {JSX.Element} ReportesScreen component
 */
export default function ReportesScreen() {
  const router = useRouter()
  const [reportType, setReportType] = useState(null)
  const [sortOrder, setSortOrder] = useState(null)

  const reportTypeOptions = ['Anual', 'Mensual', 'Diario']
  const sortOptions = ['Más reciente', 'Más antiguo']

  // Filter reports (excluding daily reports for main view)
  const reportsToShow = mockReports.filter((r) => r.type !== 'diario')

  /**
   * Handle navigation to specific report
   * @param {Object} report - Report object to navigate to
   */
  const handleReportPress = (report) => {
    if (report.type === 'mensual') {
      const reportDate = new Date(report.date)
      const group = `${reportDate.getFullYear()}-${String(reportDate.getMonth() + 1).padStart(2, '0')}`
      router.push(`/reportes/list/${group}`)
    } else {
      router.push(
        `/reportes/${report.id}?name=${encodeURIComponent(report.name)}`
      )
    }
  }

  // Group reports by year
  const groupedData = reportsToShow.reduce((acc, report) => {
    const reportDate = new Date(report.date)
    const groupTitle = reportDate.getFullYear().toString()

    const existingGroup = acc.find((group) => group.title === groupTitle)
    if (existingGroup) {
      existingGroup.data.push(report)
    } else {
      acc.push({ title: groupTitle, data: [report] })
    }
    return acc
  }, [])

  /**
   * Render individual report item
   * @param {Object} item - Report item
   * @param {number} index - Item index
   * @returns {JSX.Element} Report item component
   */
  const renderReportItem = ({ item, index }) => {
    // Calculate daily reports count for monthly reports
    let dailyCount = 0
    if (item.type === 'mensual') {
      const reportDate = new Date(item.date)
      const year = reportDate.getFullYear()
      const month = reportDate.getMonth()

      dailyCount = mockReports.filter((r) => {
        if (r.type !== 'diario') return false
        const d = new Date(r.date)
        return d.getFullYear() === year && d.getMonth() === month
      }).length
    }

    return (
      <TouchableOpacity
        onPress={() => handleReportPress(item)}
        style={[styles.reportButton, index % 2 === 0 && styles.reportButtonAlt]}
      >
        <View style={styles.reportContent}>
          <Text style={styles.reportName}>{item.name}</Text>
          {item.type === 'mensual' && (
            <Text style={styles.reportCount}>{dailyCount} reportes</Text>
          )}
        </View>
        <Text style={styles.arrowIcon}>›</Text>
      </TouchableOpacity>
    )
  }

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
          <ScreenHeader title="Reportes" showBackButton={true} />

          <Text style={styles.countText}>{reportsToShow.length} Reportes</Text>

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
              <Text style={styles.emptyText}>No hay reportes disponibles.</Text>
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
    width: 332,
  },
  countText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.sm,
    color: COLORS.blackText,
    marginBottom: 10,
    opacity: 0.7,
  },
  filtersContainer: {
    display: 'flex',
    flexDirection: 'row',
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
  reportContent: {
    flex: 1,
  },
  reportName: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: COLORS.blackText,
  },
  reportCount: {
    fontFamily: FONTS.light,
    fontSize: FONTS.size.sm,
    color: COLORS.blackText,
    opacity: 0.7,
    marginTop: 4,
  },
  arrowIcon: {
    fontFamily: FONTS.regular,
    fontSize: 24,
    color: COLORS.blackText,
    opacity: 0.5,
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
