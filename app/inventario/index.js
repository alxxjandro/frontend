import { View, Text, Button } from 'react-native'
import { useRouter } from 'expo-router'

export default function Inventario() {
  const router = useRouter()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Inventario</Text>
      <Button title="Ir a home" onPress={() => router.push('/')} />
    </View>
  )
}
