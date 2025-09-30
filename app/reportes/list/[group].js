import React, { useMemo } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SectionList,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { COLORS, FONTS } from '../../../styles/globalStyles'
import ScreenHeader from '../../../components/screenHeader'
import CustomFilter from '../_components/CustomFilter'
import { mockReports } from '../data/mockData'

const Separator = () => <View style={{ height: 5 }} />

// Meses en español
const monthNames = [
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

const Group = () => {
  const router = useRouter()
  const { group } = useLocalSearchParams() // ej. "2023-01"

  // Obtener el nombre del mes para el título
  const groupTitle = useMemo(() => {
    if (!group) return 'Reportes'
    const [year, month] = group.split('-')
    const monthIndex = parseInt(month, 10) - 1
    return `${monthNames[monthIndex]} ${year}`
  }, [group])

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

  const handlePress = (report) => {
    router.push(
      `/reportes/${report.id}?name=${encodeURIComponent(report.name)}`
    )
  }

  const groupedData = reportsToShow.reduce((acc, report) => {
    const reportDate = new Date(report.date)
    const year = reportDate.getFullYear().toString()
    const existingGroup = acc.find((g) => g.title === year)
    if (existingGroup) existingGroup.data.push(report)
    else acc.push({ title: year, data: [report] })
    return acc
  }, [])

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={[styles.button, index % 2 === 0 ? styles.buttonAlt : {}]}
    >
      <Text style={styles.buttonText}>{item.name}</Text>
      <Text style={styles.buttonDate}>{item.date}</Text>
    </TouchableOpacity>
  )

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.headerText}>{title}</Text>
  )

  return (
    <View style={styles.container}>
      <ScreenHeader title={groupTitle} />

      <View style={styles.contentContainer}>
        <CustomFilter
          options1={[
            { label: 'Entrada', value: 'entrada' },
            { label: 'Salida', value: 'salida' },
          ]}
          onSelect1={() => {}}
          defaultText1="Tipo de Reporte"
          options2={[
            { label: 'Más reciente', value: 'desc' },
            { label: 'Más antiguo', value: 'asc' },
          ]}
          onSelect2={() => {}}
          defaultText2="Orden por"
        />

        <SectionList
          sections={groupedData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          style={styles.list}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No hay reportes disponibles para este mes.
            </Text>
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  list: {
    width: '100%',
    marginTop: 10,
  },
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.lg,
    color: COLORS.blackText,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 20,
    textTransform: 'capitalize',
  },
  button: {
    backgroundColor: '#C6C7C7',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonAlt: {
    backgroundColor: '#E6E6E7',
  },
  buttonText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: COLORS.blackText,
  },
  buttonDate: {
    fontFamily: FONTS.light,
    fontSize: FONTS.size.sm,
    color: COLORS.blackText,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontFamily: FONTS.regular,
  },
})

export default Group
