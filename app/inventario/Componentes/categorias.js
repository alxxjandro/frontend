import { Modal, TouchableOpacity, TouchableWithoutFeedback, View, Text, CheckBox } from 'react-native'
import { useState } from 'react'

export default function Categorias({ visible, onClose }) {
  const [selectedOptions, setSelectedOptions] = useState({
    Categoria1: false,
    Categoria2: false,
    Categoria3: false,
    Categoria4: false,
    Categoria5: false
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
              Categorias
            </Text>

            {['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4', 'Categoria 5'].map((option, index) => (
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
