import { Modal, TouchableOpacity, TouchableWithoutFeedback, View, Text, CheckBox } from 'react-native'
import { useState } from 'react'

export default function OrdenarPor({ visible, onClose }) {
  const [selectedOptions, setSelectedOptions] = useState({
    Nombre: false,
    Cantidad: false,
    Categoria: false,
    FechaEntrada: false,
    FechaSalida: false,
    Caducidad: false
  })

  const toggleOption = (option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }} activeOpacity={1} onPress={onClose}>
        <TouchableWithoutFeedback>
          <View style={{ width: 220, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#00568F', marginBottom: 10 }}>
              Ordenar por
            </Text>

            {['Nombre', 'Cantidad', 'Categoria', 'FechaEntrada', 'FechaSalida', 'Caducidad'].map((option, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <CheckBox value={selectedOptions[option]} onValueChange={() => toggleOption(option)}/>
                <Text style={{ marginLeft: 8, textTransform: 'capitalize' }}>{option}</Text>
              </View>
            ))}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  )
}
