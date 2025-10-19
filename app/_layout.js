import { Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useFonts } from 'expo-font'
import { useAuth } from '../hooks/useAuth'
import { COLORS } from '../styles/globalStyles'

export default function RootLayout() {
  const router = useRouter()
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Italic': require('../assets/fonts/Roboto-Italic.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
  })

  const { loading, isAuthenticated } = useAuth()

  /**
   * Efecto para proteger las rutas cada que cambie auth
   */
  useEffect(() => {
    if (!loading && fontsLoaded) {
      if (!isAuthenticated) router.replace('/login')
      else router.replace('/')
    }
  }, [loading, isAuthenticated, fontsLoaded])

  if (!fontsLoaded || loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.background,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primaryBlue} />
      </View>
    )
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 150,
        gestureEnabled: false,
      }}
    />
  )
}
