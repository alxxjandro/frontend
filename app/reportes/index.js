import { useEffect, useState } from 'react'
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
import { useLogs } from '../../hooks/useLogs'

export default function ReportesScreen() {
  const router = useRouter()
  const { fetchLogsByYear, fetchReportesByDate, reportes, loading, error } =
    useLogs()

  const [reportType, setReportType] = useState('Todos')
  const [sortOrder, setSortOrder] = useState('Más reciente')
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false)
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [reportCounts, setReportCounts] = useState({})
  const [localError, setLocalError] = useState(null)

  const reportTypeOptions = ['Todos', 'Entradas', 'Salidas']
  const sortOptions = ['Más reciente', 'Más antiguo']

  useEffect(() => {
    fetchLogsByYear()
  }, [])

  useEffect(() => {
    if (reportes && reportes.length > 0) {
      fetchCounts()
    }
  }, [reportes])

  const fetchCounts = async () => {
    if (!reportes || reportes.length === 0) return

    // ✅ OPTIMIZATION: Fetch all counts in parallel
    const promises = []
    const keys = []

    for (const yearData of reportes) {
      for (const month of yearData.months) {
        const numericMonth = parseInt(month)
        if (isNaN(numericMonth)) continue

        const key = `${yearData.year}-${month}`
        keys.push(key)
        promises.push(
          fetchReportesByDate(yearData.year, numericMonth).catch((err) => {
            console.error(`Error fetching ${key}:`, err.message)
            return { success: false, error: err.message }
          })
        )
      }
    }

    // Execute all API calls in parallel
    const results = await Promise.all(promises)

    // Process results
    const counts = {}
    results.forEach((result, index) => {
      const key = keys[index]

      // Support backend count field (optimized) or count array (fallback)
      if (result?.success && typeof result.count === 'number') {
        counts[key] = result.count
      } else if (result?.success && Array.isArray(result.data)) {
        counts[key] = result.data.length
      } else {
        counts[key] = 0
      }
    })

    setReportCounts(counts)
  }

  const handleOutsidePress = () => {
    Keyboard.dismiss()
    setIsTypeDropdownOpen(false)
    setIsSortDropdownOpen(false)
  }

  const groupedData = (reportes || []).map((item) => ({
    title: item.year.toString(),
    data: item.months.map((month) => ({
      name: `Reportes de ${month}`,
      year: item.year,
      month,
    })),
  }))

  const handleReportPress = (item) => {
    const group = `${item.year}-${item.month}`
    router.push(`/reportes/list/${group}`)
  }

  const renderReportItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => handleReportPress(item)}
      style={[
        styles.reportCard,
        index % 2 === 0 ? styles.cardVariant1 : styles.cardVariant2,
      ]}
    >
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.reportTitle}>{item.name}</Text>
        <Text style={styles.reportCount}>
          {reportCounts[`${item.year}-${item.month}`] ?? 0} reportes
        </Text>
      </View>
      <Text style={styles.arrowIcon}>›</Text>
    </TouchableOpacity>
  )

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  )

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            {/* HEADER */}
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <Text style={globalStyles.h1}>Reportes</Text>
                <Text style={styles.countText}>
                  ({groupedData.length} años de reportes)
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

            {/* LISTA */}
            <ScrollView
              style={{ width: 332 }}
              contentContainerStyle={{ paddingBottom: 80 }}
              showsVerticalScrollIndicator={false}
            >
              {loading ? (
                <Text style={styles.emptyText}>Cargando reportes...</Text>
              ) : (
                <>
                  {localError && (
                    <Text
                      style={{
                        color: 'orange',
                        marginBottom: 10,
                        textAlign: 'center',
                      }}
                    >
                      ⚠️ {localError}
                    </Text>
                  )}
                  <SectionList
                    sections={groupedData}
                    keyExtractor={(item, i) => String(i)}
                    renderItem={renderReportItem}
                    renderSectionHeader={renderSectionHeader}
                    ItemSeparatorComponent={() => (
                      <View style={{ height: 8 }} />
                    )}
                    scrollEnabled={false}
                    ListEmptyComponent={
                      <Text style={styles.emptyText}>
                        No hay reportes disponibles.
                      </Text>
                    }
                  />
                </>
              )}
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
