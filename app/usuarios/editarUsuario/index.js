import { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import { globalStyles, COLORS } from '../../../styles/globalStyles'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useRouter, useLocalSearchParams } from 'expo-router'
import CustomIcon from '../../../components/customIcon'
import CustomInput from '../../../components/customInput'
import CustomButton from '../../../components/customButton'
import CustomDropdown from '../../../components/CustomDropdown'

import { useUsuarios } from '../../../hooks/useUsuarios'

export default function EditUsuario() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { editUsuario, removeUsuario } = useUsuarios()

  // Inicializamos estados solo una vez
  const [newID] = useState(params.idUsuario || '')
  const [newName, setNewName] = useState(params.nombreUsuario || '')
  const [newAP, setNewAP] = useState(params.apellidoPaterno || '')
  const [newAM, setNewAM] = useState(params.apellidoMaterno || '')
  const [role, setRole] = useState('') // texto del rol
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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

  // Si params.permisoUsuario viene, traducimos a texto
  useEffect(() => {
    if (params.permisoUsuario) {
      const roleText = Object.keys(roleMapping).find(
        (key) => roleMapping[key] === Number(params.permisoUsuario)
      )
      setRole(roleText || '')
    }
  }, [params.permisoUsuario])

  const handleReturn = () => router.navigate('/usuarios')
  const handleOutsidePress = () => Keyboard.dismiss()

  const handleEditUser = async () => {
    if (!newName || !newAP || !newAM || !role) {
      alert('Por favor completa todos los campos obligatorios.')
      return
    }

    const body = {
      nombreUsuario: newName,
      apellidoPaterno: newAP,
      apellidoMaterno: newAM,
      permisoUsuario: roleMapping[role] || 0,
    }
    await editUsuario(newID, body)
    router.navigate('/usuarios')
  }

  const handleDeleteUser = async () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este usuario? (se borraran todos sus datos, ejemplo: entradas, salidas y reportes)',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await removeUsuario(newID)
            router.navigate('/usuarios')
          },
        },
      ]
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={globalStyles.body}>
            <View style={styles.container}>
              <Text style={[globalStyles.h1, { flex: 1 }]}>Editar usuario</Text>
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
                title="Borrar Usuario"
                onPress={handleDeleteUser}
                outlined
                borderRadius={4}
                backgroundColor={COLORS.error}
                textColor={COLORS.error}
              />
              <CustomButton
                title="Editar Usuario"
                onPress={handleEditUser}
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
