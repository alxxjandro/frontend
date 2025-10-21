/* eslint-disable */
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
import { globalStyles, COLORS, FONTS } from '../../styles/globalStyles'
import { useLogs } from '../../hooks/useLogs'
import Spinner from '../../components/Spinner'

export default function ReportesScreen() {
  const router = useRouter()
  const { fetchLogsByYear, fetchReportesByDate, reportes, loading } = useLogs()

  const [reportCounts, setReportCounts] = useState({})
  const [localError, setLocalError] = useState(null)

  const monthMap = {
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

    const promises = []
    const keys = []

    for (const yearData of reportes) {
      for (const month of yearData.months) {
        const numericMonth = monthMap[month.toLowerCase()]
        if (!numericMonth) {
          console.warn(`Mes inválido: ${month}`)
          continue
        }

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

    const results = await Promise.all(promises)
    const counts = {}

    results.forEach((result, index) => {
      const key = keys[index]
      if (result?.success && Array.isArray(result.data)) {
        counts[key] = result.data.length
      } else {
        counts[key] = 0
      }
    })

    setReportCounts(counts)
  }

  const handleReportPress = (item) => {
    const group = `${item.year}-${item.month}`
    router.push(`/reportes/list/${group}`)
  }

  const handleOutsidePress = () => {
    Keyboard.dismiss()
  }

  const groupedData = reportes?.map((item) => ({
    title: item.year.toString(),
    data: item.months.map((month) => ({
      name: `Reportes de ${month}`,
      year: item.year,
      month,
    })),
  }))

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
          {reportCounts[`${item.year}-${item.month}`] ?? 0} operaciones
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
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <Text style={globalStyles.h1}>Reportes</Text>
                <Text style={styles.countText}>
                  ({groupedData?.length ?? 0} años disponibles)
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
                    <Text style={styles.errorText}>{localError}</Text>
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
        <Spinner isVisible={loading} />
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
  errorText: {
    color: 'orange',
    marginBottom: 10,
    textAlign: 'center',
  },
})
