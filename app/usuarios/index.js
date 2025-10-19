import { Text, View } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { globalStyles, COLORS } from '../../styles/globalStyles'
import CustomButton from '../../components/customButton'
import CustomBottomBar from '../../components/customBottomBar'
import UserCard from '../../components/userCard'
import { StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useUsuarios } from '../../hooks/useUsuarios'

export default function Usuarios() {
  const router = useRouter()
  const { usuarios, fetchUsuarios, loading, error } = useUsuarios()

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const getRoleName = (permisoUsuario) => {
    switch (permisoUsuario) {
      case 1:
        return 'Encargado general'
      case 2:
        return 'Encargado de almacen'
      case 3:
        return 'Encargado de cocina'
      default:
        return 'Desconocido'
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <View style={[globalStyles.body, styles.container]}>
          <View style={styles.container}>
            <Text
              style={[globalStyles.h1, { paddingVertical: 5, minWidth: 332 }]}
            >
              Usuarios
            </Text>

            <CustomButton
              title="Agregar nuevo usuario"
              onPress={() => router.navigate('/usuarios/nuevoUsuario')}
              iconRight="add"
              width={332}
              borderRadius={4}
              backgroundColor={COLORS.primaryBlue}
            />
          </View>

          <View
            style={{
              width: '100%',
              gap: 12,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {loading && <Text>Cargando usuarios...</Text>}
            {error && <Text style={{ color: 'red' }}>{error}</Text>}

            {Array.isArray(usuarios) && usuarios.length > 0
              ? usuarios.map((user) => (
                  <UserCard
                    key={user.idUsuario} // opcional pero recomendado
                    name={`${user.nombreUsuario} ${user.apellidoPaterno} ${user.apellidoMaterno}`}
                    role={getRoleName(user.permisoUsuario)}
                    onEdit={() =>
                      router.navigate({
                        pathname: '/usuarios/editarUsuario',
                        params: {
                          idUsuario: user.idUsuario,
                          nombreUsuario: user.nombreUsuario,
                          apellidoPaterno: user.apellidoPaterno,
                          apellidoMaterno: user.apellidoMaterno,
                          permisoUsuario: user.permisoUsuario,
                        },
                      })
                    }
                    iconName="pencil"
                    iconColor={COLORS.primaryGreen}
                    bgColor={COLORS.primaryGreen15}
                  />
                ))
              : !loading && <Text>No hay usuarios disponibles</Text>}
          </View>
        </View>
      </SafeAreaView>
      <CustomBottomBar activeBtn={'usuarios'} />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    rowGap: 16,
  },
})
