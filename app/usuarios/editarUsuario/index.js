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
import Spinner from '../../../components/Spinner'
import Toast from '../../../components/Toast'

import { useUsuarios } from '../../../hooks/useUsuarios'

export default function EditUsuario() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { editUsuario, removeUsuario } = useUsuarios()

  const [newID] = useState(params.idUsuario || '')
  const [newName, setNewName] = useState(params.nombreUsuario || '')
  const [newAP, setNewAP] = useState(params.apellidoPaterno || '')
  const [newAM, setNewAM] = useState(params.apellidoMaterno || '')
  const [role, setRole] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const mockRoles = [
    'Encargado general',
    'Encargado de almacen',
    'Encargado de cocina',
  ]

  const roleMapping = {
    'Encargado general': 3,
    'Encargado de almacen': 2,
    'Encargado de cocina': 1,
  }

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
      Toast.show('Por favor completa todos los campos obligatorios.', 'error')
      return
    }

    const body = {
      nombreUsuario: newName,
      apellidoPaterno: newAP,
      apellidoMaterno: newAM,
      permisoUsuario: roleMapping[role] || 0,
    }

    try {
      setLoading(true)
      await editUsuario(newID, body)
      Toast.show('Usuario editado correctamente', 'success')

      setTimeout(() => {
        router.navigate('/usuarios')
      }, 1500)
    } catch (err) {
      console.error(err)
      Toast.show('Error al editar usuario', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este usuario? (Se borrarán todas sus entradas, salidas y reportes)',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true)
              await removeUsuario(newID)
              Toast.show('Usuario eliminado correctamente', 'success')

              setTimeout(() => {
                router.navigate('/usuarios')
              }, 1500)
            } catch (err) {
              console.error(err)
              Toast.show('Error al eliminar usuario', 'error')
            } finally {
              setLoading(false)
            }
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
                textSize={14}
                borderRadius={4}
                textColor={COLORS.primaryBlue}
              />
              <CustomButton
                title="Editar Usuario"
                onPress={handleEditUser}
                textSize={14}
                borderRadius={4}
                backgroundColor={COLORS.primaryBlue}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>

        <Spinner isVisible={loading} />
        <Toast.Container />
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
