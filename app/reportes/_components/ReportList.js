import { View, Text, FlatList } from 'react-native'
import { reportesStyles as styles } from '../_styles/reportesStyles'

const DATA = [
  { id: '1', cantidad: '54', producto: '🍎 Manzana', categoria: 'Categoria 1', fecha: '19/04/24' }
]

export default function ReportList() {
  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 && styles.rowAlt]}>
      <Text style={styles.cell}>{item.cantidad}</Text>
      <Text style={styles.cell}>{item.producto}</Text>
      <Text style={styles.cell}>{item.categoria}</Text>
      <Text style={styles.cell}>{item.fecha}</Text>
    </View>
  )

  return (
    <View style={styles.table}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerCell}>Cantidad</Text>
        <Text style={styles.headerCell}>Producto</Text>
        <Text style={styles.headerCell}>Categoría</Text>
        <Text style={styles.headerCell}>Fecha Entrada</Text>
      </View>

      {/* Filas */}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}