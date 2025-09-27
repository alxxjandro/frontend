import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { Calendar } from 'react-native-calendars';

export default function NuevaSalida() {
  const [fecha, setFecha] = useState('14/09/2025');
  const [productos, setProductos] = useState([]);
  const [open, setOpen] = useState(false);
  const [motivo, setMotivo] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [botonRegistrado, setBotonRegistrado] = useState(false); // Para cambiar color del botón

  const router = useRouter(); // Hook para navegación
  const opcionesMotivo = ['Venta', 'Donación', 'Descarte'];

  const handleRegistrarSalida = () => {
    setBotonRegistrado(true);
    // Redireccionar a la misma ruta "/"
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Encabezado con botón de volver */}
          <View style={styles.header}>
            <Text style={styles.title}>Nueva salida</Text>
            <Link href="/" asChild>
              <TouchableOpacity style={styles.backIcon}>
                <Text style={styles.backIconText}>{'<'}</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Dropdown de motivo */}
          <Text style={styles.label}>Motivo de la salida</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setOpen(!open)}
          >
            <Text style={{ color: motivo ? '#00568F' : '#888' }}>
              {motivo || 'Seleccionar'}
            </Text>
            <Text style={styles.arrow}>{open ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {open && (
            <View style={styles.dropdownList}>
              {opcionesMotivo.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.item}
                  onPress={() => {
                    setMotivo(item);
                    setOpen(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Fecha */}
          <Text style={styles.label}>Fecha de salida</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setDatePickerVisibility(true)}
          >
            <Text>{fecha}</Text>
          </TouchableOpacity>
          {isDatePickerVisible && (
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={(day) => {
                  const formatted =
                    day.day.toString().padStart(2, '0') +
                    '/' +
                    day.month.toString().padStart(2, '0') +
                    '/' +
                    day.year;
                  setFecha(formatted);
                  setDatePickerVisibility(false);
                }}
                markedDates={{
                  [fecha.split('/').reverse().join('-')]: {
                    selected: true,
                    selectedColor: '#007bff',
                  },
                }}
                monthFormat={'MMMM yyyy'}
                firstDay={1}
                theme={{
                  selectedDayBackgroundColor: '#007bff',
                  todayTextColor: '#ff0000',
                  arrowColor: '#007bff',
                  textDayFontWeight: '500',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '600',
                  textDayHeaderFontSize: 14,
                }}
                dayNames={['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']}
                monthNames={[
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
                ]}
              />
              <TouchableOpacity
                onPress={() => setDatePickerVisibility(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Productos */}
          <Text style={styles.sectionTitle}>Productos de la salida</Text>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Esta salida no cuenta con ningún producto...
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setProductos([...productos, 'Producto nuevo'])}
          >
            <Text style={styles.addButtonText}>
              Agregar un producto del inventario +
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Botón fijo en la parte inferior */}
        <View style={styles.fixedBottom}>
          <TouchableOpacity
            style={[
              styles.registerButton,
              botonRegistrado && {
                backgroundColor: '#FECACA',
                borderWidth: 1,
                borderColor: '#B91C1C',
              },
            ]}
            onPress={handleRegistrarSalida}
          >
            <Text
              style={[
                styles.registerButtonText,
                botonRegistrado && { color: '#B91C1C' },
              ]}
            >
              Registrar salida &gt;&gt;
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  fixedBottom: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backIcon: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  backIconText: {
    color: '#000000ff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#00568F',
    fontWeight: 'bold',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginTop: 5,
  },
  arrow: {
    fontSize: 16,
    color: '#555',
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
    borderRadius: 6,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginTop: 5,
  },
  calendarContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cancelButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    padding: 8,
  },
  cancelButtonText: {
    color: '#00568F',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: '600',
    color: '#00568F',
  },
  emptyContainer: {
    backgroundColor: '#E6E6E7',
    borderRadius: 8,
    padding: 40,
    marginTop: 10,
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#525252',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#00568F',
    padding: 12,
    borderRadius: 6,
    marginTop: 15,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 6,
  },
  registerButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

