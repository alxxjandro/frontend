import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { globalStyles, COLORS } from '../../../styles/globalStyles'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import CustomIcon from '../../../components/customIcon'
import CustomInput from '../../../components/customInput'
import CustomButton from '../../../components/customButton'
import CustomDropdown from '../../../components/CustomDropdown'

export default function nuevoUsuario() {
  const router = useRouter()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [role, setRole] = useState('')

  const mockRoles = [
    'Encargado de cocina',
    'Encargado general',
    'Encargado de almacen',
  ]

  const handleReturn = () => {
    router.navigate('/usuarios')
  }

  const handleOutsidePress = () => {
    Keyboard.dismiss()
    setIsDropdownOpen(false)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={globalStyles.body}>
            <View style={styles.container}>
              <Text style={[globalStyles.h1, { flex: 1 }]}>Nuevo usuario</Text>
              <CustomIcon
                name="chevron-back"
                size={48}
                iconColor={COLORS.blackText}
                bgColor={COLORS.background}
                onPress={handleReturn}
              />
            </View>

            <View
              style={[
                styles.dropdownFlex,
                { width: 332, display: 'flex', gap: 16 },
              ]}
            >
              <CustomInput
                label="Nombre"
                placeholder="Ingresa el nombre"
                value={newName}
                onChangeText={setNewName}
              />
              <CustomDropdown
                label="Rol"
                options={mockRoles}
                value={role}
                onSelect={setRole}
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
              />
            </View>

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Cancelar"
                onPress={() => router.navigate('/usuarios')}
                outlined={true}
                borderRadius={4}
                backgroundColor={COLORS.primaryBlue}
                textColor={COLORS.primaryBlue}
              />
              <CustomButton
                title="Crear Usuario"
                onPress={() => router.navigate('/usuarios')}
                borderRadius={4}
                backgroundColor={COLORS.primaryBlue}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 332,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 16,
    maxWidth: 332,
  },
  dropdownFlex: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 10,
    maxWidth: 332,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    height: 48,
  },
})
