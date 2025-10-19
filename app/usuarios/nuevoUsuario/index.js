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

import { useUsuarios } from '../../../hooks/useUsuarios'

export default function nuevoUsuario() {
  const router = useRouter()

  const { saveUsuario } = useUsuarios()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newAP, setNewAP] = useState('')
  const [newAM, setNewAM] = useState('')
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('')

  // Role hierarchy: 3 = highest permissions, 1 = lowest
  const mockRoles = [
    'Encargado general', // Highest permissions
    'Encargado de almacen', // Medium permissions
    'Encargado de cocina', // Lowest permissions
  ]

  const roleMapping = {
    'Encargado general': 3, // Highest permissions
    'Encargado de almacen': 2, // Medium permissions
    'Encargado de cocina': 1, // Lowest permissions
  }

  const handleReturn = () => {
    router.navigate('/usuarios')
  }

  const handleOutsidePress = () => {
    Keyboard.dismiss()
    setIsDropdownOpen(false)
  }

  const handleCreateUser = async () => {
    if (!newName || !newAP || !newAM || !role || !password) {
      alert('Por favor completa todos los campos obligatorios.')
      return
    }

    const body = {
      nombreUsuario: newName,
      apellidoPaterno: newAP,
      apellidoMaterno: newAM,
      permisoUsuario: roleMapping[role] || 0,
      password: password,
    }

    await saveUsuario(body)
    router.navigate('/usuarios')
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
              <CustomInput
                label="Apellido paterno"
                placeholder="Ingresa el apellido paterno"
                value={newAP}
                onChangeText={setNewAP}
              />
              <CustomInput
                label="Apellido materno"
                placeholder="Ingresa el apellido materno"
                value={newAM}
                onChangeText={setNewAM}
              />
              <CustomInput
                label="Contraseña"
                placeholder="Ingresa la contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
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
                onPress={handleReturn}
                outlined={true}
                borderRadius={4}
                backgroundColor={COLORS.primaryBlue}
                textColor={COLORS.primaryBlue}
              />
              <CustomButton
                title="Crear Usuario"
                onPress={handleCreateUser}
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
