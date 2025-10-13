import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import CustomIcon from '../../components/customIcon'
import CustomDropdown from '../../components/CustomDropdown'
import { globalStyles, COLORS, FONTS } from '../../styles/globalStyles'
import { mockReports } from './data/mockData'

export default function ReportesScreen() {
  const router = useRouter()

  // Estados de filtros
  const [reportType, setReportType] = useState('Todos')
  const [sortOrder, setSortOrder] = useState('Más reciente')
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false)
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)

  const reportTypeOptions = ['Todos', 'Entradas', 'Salidas']
  const sortOptions = ['Más reciente', 'Más antiguo']

  const handleOutsidePress = () => {
    Keyboard.dismiss()
    setIsTypeDropdownOpen(false)
    setIsSortDropdownOpen(false)
  }

  // Filtramos solo reportes mensuales
  const reportsToShow = mockReports.filter((r) => r.type !== 'diario')

  const handleReportPress = (report) => {
    if (report.type === 'mensual') {
      const reportDate = new Date(report.date)
      const group = `${reportDate.getFullYear()}-${String(
        reportDate.getMonth() + 1
      ).padStart(2, '0')}`
      router.push(`/reportes/list/${group}`)
    } else {
      router.push(
        `/reportes/${report.id}?name=${encodeURIComponent(report.name)}`
      )
    }
  }

  // Agrupar por año
  const groupedData = reportsToShow.reduce((acc, report) => {
    const year = new Date(report.date).getFullYear().toString()
    const existingGroup = acc.find((g) => g.title === year)
    if (existingGroup) existingGroup.data.push(report)
    else acc.push({ title: year, data: [report] })
    return acc
  }, [])

  const renderReportItem = ({ item, index }) => {
    let dailyCount = 0
    if (item.type === 'mensual') {
      const d = new Date(item.date)
      const y = d.getFullYear()
      const m = d.getMonth()
      dailyCount = mockReports.filter((r) => {
        if (r.type !== 'diario') return false
        const dr = new Date(r.date)
        return dr.getFullYear() === y && dr.getMonth() === m
      }).length
    }

    return (
      <TouchableOpacity
        onPress={() => handleReportPress(item)}
        style={[
          styles.reportCard,
          index % 2 === 0 ? styles.cardVariant1 : styles.cardVariant2,
        ]}
      >
        <View>
          <Text style={styles.reportTitle}>{item.name}</Text>
          {item.type === 'mensual' && (
            <Text style={styles.reportCount}>{dailyCount} reportes</Text>
          )}
        </View>
        <Text style={styles.arrowIcon}>›</Text>
      </TouchableOpacity>
    )
  }

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  )

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            {/* HEADER (NO SCROLLEA) */}
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <Text style={globalStyles.h1}>Reportes</Text>
                <Text style={styles.countText}>
                  ({reportsToShow.length} reportes)
                </Text>
              </View>
              <CustomIcon
                name="chevron-back"
                size={48}
                iconColor={COLORS.blackText}
                bgColor={COLORS.background}
                onPress={() => router.navigate('/')}
              />
            </View>

            <View style={[styles.filterContainer, { width: 332 }]}>
              <CustomDropdown
                label="Tipo de reporte"
                options={reportTypeOptions}
                value={reportType}
                onSelect={(val) => {
                  setReportType(val)
                  setIsTypeDropdownOpen(false)
                }}
                isOpen={isTypeDropdownOpen}
                setIsOpen={(val) => {
                  setIsTypeDropdownOpen(val)
                  if (val) setIsSortDropdownOpen(false)
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
                  setIsSortDropdownOpen(false)
                }}
                isOpen={isSortDropdownOpen}
                setIsOpen={(val) => {
                  setIsSortDropdownOpen(val)
                  if (val) setIsTypeDropdownOpen(false)
                }}
                bgColor={COLORS.primaryBlue}
                borderColor={COLORS.primaryBlue}
                textColor={COLORS.whiteText}
              />
            </View>

            {/* LISTA SCROLLEABLE */}
            <ScrollView
              style={{ width: 332 }}
              contentContainerStyle={{ paddingBottom: 80 }}
              showsVerticalScrollIndicator={false}
            >
              <SectionList
                sections={groupedData}
                keyExtractor={(item) => item.id}
                renderItem={renderReportItem}
                renderSectionHeader={renderSectionHeader}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                scrollEnabled={false} // evita conflicto dentro del ScrollView
                ListEmptyComponent={
                  <Text style={styles.emptyText}>
                    No hay reportes disponibles.
                  </Text>
                }
              />
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingTop: 10,
    width: 332,
  },
  header: {
    flex: 1,
  },
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
  },
  sectionHeader: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.lg,
    color: COLORS.primaryBlue,
    marginTop: 16,
    marginBottom: 6,
  },
  reportCard: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardVariant1: {
    backgroundColor: COLORS.cardBackgroundOne,
  },
  cardVariant2: {
    backgroundColor: COLORS.cardBackgroundTwo,
  },
  reportTitle: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.md,
    color: COLORS.blackText,
  },
  reportCount: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.sm,
    color: COLORS.blackText,
    opacity: 0.7,
    marginTop: 2,
  },
  arrowIcon: {
    fontFamily: FONTS.regular,
    fontSize: 28,
    color: COLORS.blackText,
    opacity: 0.5,
  },
  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    textAlign: 'center',
    color: COLORS.greyText,
    marginTop: 20,
  },
})
