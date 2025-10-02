import { Text, View } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { globalStyles, COLORS } from '../../styles/globalStyles'
import CustomButton from '../../components/customButton'
import CustomBottomBar from '../../components/customBottomBar'
import UserCard from '../../components/userCard'
import { StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

export default function Usuarios() {
  const router = useRouter()

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
            <UserCard
              name="Jorge Torres"
              role="Encargado general"
              onEdit={() => {}}
              iconName="pencil"
              iconColor={COLORS.primaryGreen}
              bgColor={COLORS.primaryGreen15}
            />

            <UserCard
              name="María López"
              role="Supervisora"
              onEdit={() => {}}
              iconName="pencil"
              iconColor={COLORS.primaryGreen}
              bgColor={COLORS.primaryGreen15}
            />

            <UserCard
              name="Carlos Ramírez"
              role="Administrador"
              onEdit={() => {}}
              iconName="pencil"
              iconColor={COLORS.primaryGreen}
              bgColor={COLORS.primaryGreen15}
            />
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
