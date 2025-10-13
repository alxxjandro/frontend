import { View, Text } from 'react-native'
import UserIcon from '../../components/userIcon'
import { SIZE, COLORS } from '../../styles/globalStyles'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles } from '../../styles/globalStyles'
import CustomButton from '../../components/customButton'
import CustomBottomBar from '../../components/customBottomBar'
import { useRouter } from 'expo-router'

export default function Test() {
  const name = 'Jorge Torres'

  const router = useRouter()

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <View style={globalStyles.body}>
          <View style={{ width: 332 }}>
            <Text
              style={[globalStyles.h1, { paddingVertical: 5, maxWidth: 332 }]}
            >
              Ajustes
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
            }}
          >
            <UserIcon name={name} size={144} />
            <Text style={[globalStyles.h1, { marginVertical: 10 }]}>
              {name}
            </Text>
          </View>

          <View style={{ display: 'flex', gap: 10 }}>
            <Text style={globalStyles.subtitle}>Acciones:</Text>
            <View style={{ display: 'flex', gap: '10' }}>
              <CustomButton
                iconLeft="notifications-outline"
                colorLeft={COLORS.blackText}
                colorRight={COLORS.blackText}
                textColor={COLORS.blackText}
                backgroundColor={COLORS.cardBackgroundOne}
                title="Notificaciones"
                borderRadius={8}
                textSize={SIZE.sm}
                iconRight="chevron-forward"
                expand="right"
                width={332}
              />
              <CustomButton
                iconLeft="moon-outline"
                colorLeft={COLORS.blackText}
                colorRight={COLORS.blackText}
                textColor={COLORS.blackText}
                backgroundColor={COLORS.cardBackgroundOne}
                title="Tema"
                borderRadius={8}
                textSize={SIZE.sm}
                iconRight="chevron-forward"
                expand="right"
                width={332}
              />
              <CustomButton
                iconLeft="repeat"
                colorLeft={COLORS.blackText}
                colorRight={COLORS.blackText}
                textColor={COLORS.blackText}
                backgroundColor={COLORS.cardBackgroundOne}
                title="Cambiar contraseña"
                borderRadius={8}
                textSize={SIZE.sm}
                iconRight="chevron-forward"
                expand="right"
                width={332}
              />
              <CustomButton
                iconLeft="lock-closed-outline"
                colorLeft={COLORS.blackText}
                colorRight={COLORS.blackText}
                textColor={COLORS.blackText}
                backgroundColor={COLORS.cardBackgroundOne}
                title="Cerrar sesión"
                borderRadius={8}
                textSize={SIZE.sm}
                iconRight="chevron-forward"
                expand="right"
                width={332}
                onPress={() => router.navigate('/login')}
              />
              <CustomButton
                iconLeft="warning-outline"
                colorLeft={COLORS.blackText}
                colorRight={COLORS.blackText}
                textColor={COLORS.blackText}
                backgroundColor={COLORS.cardBackgroundOne}
                title="Reportar un problema"
                borderRadius={8}
                textSize={SIZE.sm}
                iconRight="chevron-forward"
                expand="right"
                width={332}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
      <CustomBottomBar activeBtn={'ajustes'} />
    </SafeAreaProvider>
  )
}
